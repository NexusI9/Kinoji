'''
Detect new movies
Create Thumbnails directory
Add aeshetics tags
'''



from PIL import Image
import os
import re
from utilities.utils import Utils
from datetime import datetime
from process.fetchOnlineData import UpdateDatabase as Update
from utilities.connector import Connector


path = Utils.GET_CONFIG("SHOTS_PATH")
dtb_path = Utils.GET_CONFIG("MOVIE_PATH")
movies = []
thumb = []

USERNAME = Utils.GET_CONFIG("USERNAME")
HOSTNAME = Utils.GET_CONFIG("HOSTNAME")
PASSWORD = Utils.GET_CONFIG("PASSWORD")
DTBNAME = Utils.GET_CONFIG("DTBNAME")

class Fetcher:


    def __init__(self):
        print("\n\nMode 1 : Generate thumbnails from Shots and update aesthetic database")
        self.connector = Connector(HOSTNAME,USERNAME,PASSWORD,DTBNAME)

    def commitSQL(self, JSON):
        print("[...] Committing changes to database")
        for movies in JSON:
            self.connector.update(table='movies', data=movies);
        print("> Done !")

    def fetchPictures(self, path):

        shots = [f.replace('.png', '') for f in os.listdir(path) if
                 f != 'thumbnails' and f != '.' and f != '..' and f != '.DS_Store']
        shots.sort()
        return ';'.join(shots)

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
            "shots": self.fetchPictures(os.path.join(path,folder)),
            "added": datetime.fromtimestamp(os.stat(path+folder).st_birthtime).strftime('%Y-%m-%d %H:%M:%S')

        })


        self.commitSQL(JSON)
        print("\n> DONE !")

    def setThumbnails(self,folder):
        print("------------------------------------------------")
        print("-------------- Resizing thumbnails -------------")
        print("------------------------------------------------")
        print(" ")
        print(folder)
        thumbPath = os.path.join(path,folder,"thumbnails")
        fullPath =  os.path.join(path,folder)
        srt_array = []
        for f in os.listdir(fullPath):
            if(f.endswith('png') or f.endswith('jpg') or f.endswith('jpeg')):
                srt_array.append(f)
        sorted_array = sorted(srt_array)

        i = 0
        for pics in sorted_array:
            #rename large shots
            newName = ''.join((folder,"_",str(i),".png")).replace(' ','_')
            os.rename(os.path.join(fullPath,pics), os.path.join(fullPath,newName))
            print("[...] processing : " + newName)
            #resize
            combine = os.path.join(fullPath,newName)
            if(os.path.exists(combine)):
                img = Image.open(combine)
                img.thumbnail((350, 350))
                newpics = newName.replace(".png", "")
                img.save(os.path.join(thumbPath,newpics) + ".jpg", "JPEG")
            else:
                print("couldn't find : %s" % (combine))

            i += 1

        print(" ")
        print(" ")
        print(" ")
        print("> DONE !")

    def createThumbFolder(self,folder):
        print("[...] Creating thumbnail directory : " + folder)
        os.mkdir(os.path.join(path,folder,'thumbnails'))

        print(" ")
        print("> DONE !")


    def start(self):
        #fetch both directories (full and thumb)
        movies = []

        for movieDirectory in os.listdir(path):
            if( movieDirectory.startswith('.') == False and os.path.isdir( os.path.join(path,movieDirectory,'thumbnails') ) == False ):
                movies.append(movieDirectory)


        if(len(movies) > 0):
            print("------------------------------------------------")
            print("-------------- New Movies detected -------------")
            print("------------------------------------------------")
            print(" ")
            for nm in movies:
                print("             —"+nm)



            print(" ")
            print("------------------------------------------------")
            print("------- Copying directories to thumbnails ------")
            print("------------------------------------------------")
            print(" ")
            for nm in movies:
                self.createThumbFolder(nm)
                self.setThumbnails(nm)
                self.setManualInfo(nm)

        else:
            print("------ No New movies detected ------\n\n")
