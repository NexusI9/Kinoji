'''
Detect new movies
Create Thumbnails directory
Add aeshetics tags
'''

from PIL import Image
import os
import re
import shutil
from lib.utils import config
from lib.connector import Connector
from datetime import datetime


SRC_PATH = config("SRC_PATH")
DEST_PATH = config("DEST_PATH")

USERNAME = config("USERNAME")
HOSTNAME = config("HOSTNAME")
PASSWORD = config("PASSWORD")
DTBNAME = config("DTBNAME")

movies = []
thumb = []

class AddMovies:


    def __init__(self):
        print("\n\nMode 1 : Generate thumbnails from Shots and update aesthetic database")
        self.connector = Connector(HOSTNAME,USERNAME,PASSWORD,DTBNAME)

    def commitSQL(self, JSON):
        print("[...] Committing changes to database")
        for movies in JSON:
            self.connector.update(table='movies', data=movies);
        print("> Done !")

    def get_index(file):
        return int(re.findall(r'\d+', file)[-1])
    
    def fetchPictures(self, path):

        shots = [f.replace('.webp', '') for f in os.listdir(path) if
                 f != 'thumbnails' and f != '.' and f != '..' and f != '.DS_Store']

        sorted_shots = sorted(shots, key=self.get_index)
        return ';'.join(sorted_shots)

    def addMovieIdToGenre(self, genre_id, movie_id):
        #Update Genres Id column with current processed movie
        genreMovie = self.connector.execute("""SELECT movies FROM genres WHERE id = %s""", [genre_id])[0][0]

        if (genreMovie):
            genreMovie = genreMovie.split(";")

            alreadyIn = False
            for movie in genreMovie:
                if (movie == id):
                    alreadyIn = True
            if (not alreadyIn):
                genreMovie.append(str(movie_id))

            genreMovie = ';'.join(genreMovie)
        else:
            genreMovie = movie_id


        self.connector.execute("""UPDATE genres SET movies = %s WHERE id = %s""", [genreMovie, genre_id])


    def setManualInfo(self,folder):
        print("------------------------------------------------")
        print("---------- Add new movies to database ----------")
        print("------------------------------------------------")

        JSON = []
        print("Movie : " + folder)

        #set id from folder name
        movie_id = re.findall("(\d+)[^-]*$", folder)
        if(movie_id and movie_id[0]):
            movie_id = movie_id[0]
        else:
            movie_id = input("ID not found, type manually the ID : ")
            return


        movie_tag = input("""\n\nType the movie shots aesthetic (separate with space): \n
       Existing aetshetics: \n
           - Artificial \n
           - Colourful \n
           - Monochrome \n
           - Urban \n
           - Neon \n
           - Figure \n
           - Psychedelic \n
           - Composition \n
           - Naturalistic \n
           - Nature \n
           - Grunge \n
           \n
       => """)

        genres = self.connector.execute("""SELECT id, name FROM genres""")
        #prepare list from database genres
        if genres:
            for g in range(len(genres)):
                genres[g] = str(genres[g][0]) + ' - ' + str(genres[g][1])
            genres = ',\n'.join(genres)

        movie_genre = input( """\n\nType the movie collection (separate with space): \n
        {}
           \n
       => """.format(genres))

        if(movie_genre):
            movie_genre = movie_genre.split(" ")
            for genre_id in movie_genre:
                self.addMovieIdToGenre(genre_id, movie_id)

        JSON.append({
            "folder": folder,
            "id": movie_id,
            "tag": movie_tag.lower().replace(' ',';'),
            "shots": self.fetchPictures(os.path.join(DEST_PATH,folder)),
            "added": datetime.fromtimestamp(os.stat(DEST_PATH+folder).st_birthtime).strftime('%Y-%m-%d %H:%M:%S')

        })


        self.commitSQL(JSON)
        print("\n> DONE !")

    def setShots(self,movie,sortBy=None):
        print(" ")

        def get_creation_time(file):
            file = os.path.join(SRC_PATH,movie,file)
            return os.stat(file).st_birthtime
        
        #retrieve only valid fildes
        srt_array = []
        for f in os.listdir(os.path.join(SRC_PATH,movie)):
            if(f.endswith('png') or f.endswith('jpg') or f.endswith('jpeg')):
                srt_array.append(f)

        if(sortBy != None): #Manual sort
            if(sortBy == 'name'): #sort array of file by name (_0,_1,_2)
                sorted_array = sorted(srt_array)
            elif(sortBy == 'date'): #sort array of file by creation date
                sorted_array = sorted(srt_array, key=get_creation_time)
            elif(sortBy == 'index'):
                sorted_array = sorted(srt_array, key=self.get_index)
        else: #Auto sort
            if( "vlcsnap" in srt_array[0] ):
                sorted_array = sorted(srt_array) #not treated
            else:
                sorted_array = sorted(srt_array, key=self.get_index) #already treated

        for f in range(len(sorted_array)):
            print('%d - %s' % (f, sorted_array[f] ))

        checkOrder = input('Is the order correct ? (y/n)')

        if( checkOrder == 'y' or checkOrder == ''):
            self.createMovieFolder(movie)
            self.createThumbFolder(movie)
            #populate destination
            i = 0
            for pic in sorted_array:
                sanitizedMovie = re.sub("[^A-Za-z0-9 \-]",'', movie)
                newName = ''.join((sanitizedMovie,"_",str(i),".png"))
                newName = newName.replace(' ','_')

                oldFile = os.path.join(SRC_PATH,movie,pic)
                newFile = os.path.join(SRC_PATH,movie,newName)
                stat = os.stat(oldFile)

                os.rename(os.path.join(SRC_PATH,movie,pic), os.path.join(SRC_PATH,movie,newName))
                os.utime(newFile, (stat.st_atime, stat.st_mtime)) #keep meta-data
                
                #move shot to destination directory
                shutil.copy2(os.path.join(SRC_PATH,movie,newName), os.path.join(DEST_PATH,movie,newName))
                
                #convert to webp
                print('...Processing: ' + newName)

                large = Image.open( os.path.join(DEST_PATH,movie,newName) )            
                thumb = Image.open( os.path.join(DEST_PATH,movie,newName) )

                #resize thumbnail
                thumb.thumbnail((235, 235))

                #convert to webp
                webName = newName.replace(".png", "") + ".webp"
                thumb.save(os.path.join(DEST_PATH,movie,"thumbnails", webName), "WEBP")
                large.save(os.path.join(DEST_PATH,movie,webName), "WEBP")

                os.remove( os.path.join(DEST_PATH,movie,newName) )

                i += 1

            print("> DONE !\n\n")
            return True
        else:
            print("Next movie...")
            return False


    def createThumbFolder(self, movie):
        print("[...] Creating thumbnail directory")
        os.mkdir(os.path.join(DEST_PATH,movie,'thumbnails'))

    def createMovieFolder(self, movie):
        print("[...] Creating Movie directory")
        os.mkdir(os.path.join(DEST_PATH,movie))    


    def start(self):
        #fetch both directories (full and thumb)
        movies = []

        for movieDirectory in os.listdir(SRC_PATH):
            if( movieDirectory.startswith('.') == False and os.path.isdir( os.path.join(DEST_PATH,movieDirectory) ) == False ):
                movies.append(movieDirectory)


        if(len(movies) > 0):
            print("------------------------------------------------")
            print("-------------- New Movies detected -------------")
            print("------------------------------------------------")
            print(" ")
            for nm in movies:
                print("             + "+nm)

            
            add = input('\nDo you wish to add those movies? (y/n)')
            if( add == 'y' or add == ''):
                print(" ")
                print("------------------------------------------------")
                print("------- Copying directories to thumbnails ------")
                print("------------------------------------------------")
                print(" ")

                m = 1;
                for nm in movies:
                    print("[%d/%d] %s\n" % (m, len(movies), nm) )
                    self.setShots(nm)
                    self.setManualInfo(nm)
                    m += 1

        else:
            print("------ No New movies detected ------\n\n")
