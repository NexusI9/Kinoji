import os
from datetime import datetime
from utilities.utils import Utils
from utilities.connector import Connector
import re


DEST_PATH = Utils.GET_CONFIG("DEST_PATH")
USERNAME = Utils.GET_CONFIG("USERNAME")
HOSTNAME = Utils.GET_CONFIG("HOSTNAME")
PASSWORD = Utils.GET_CONFIG("PASSWORD")
DTBNAME = Utils.GET_CONFIG("DTBNAME")

connector = Connector(HOSTNAME,USERNAME,PASSWORD,DTBNAME)

#add creation date to movie table
def setCreationDate(path, moviename):

    date = datetime.fromtimestamp(os.stat(path).st_birthtime).strftime('%Y-%m-%d %H:%M:%S')

    json = {
        'folder':moviename,
        'added':date
    }

    connector.update(table='movies', data=json)
    return date

#add shots to movies shot column
def fetchPictures(path, moviename):
    shots = [ f.replace('.webp','') for f in os.listdir(path) if f != 'thumbnails' and f != '.' and f != '..' and f != '.DS_Store']
    shots.sort()

    def get_index(file):
        return int(re.findall(r'\d+', file)[-1])
    
    sorted_shots = sorted(shots, key=get_index)
    
    json = {
        'folder':moviename,
        'shots':';'.join(sorted_shots)
    }

    #print(json)
    connector.update(table='movies', data=json);

def collectIDToGenre(path, moviename):

    movieTag = connector.execute("""SELECT genre FROM movies WHERE folder = %s""", [moviename] )[0]
    movieId = connector.execute("""SELECT id FROM movies WHERE folder = %s""", [moviename] )[0]

    genreTag = connector.execute("""SELECT tag from genres""")


    for tag in movieTag:
        for genre in genreTag:
            if( tag in genre ):
                genreMovie = connector.execute("""SELECT movies FROM genres WHERE tag = %s""",[tag])[0][0]
                if(genreMovie):
                    genreMovie = genreMovie.split(";")

                    alreadyIn = False
                    for movie in genreMovie:
                        if(movie == movieId):
                            alreadyIn = True
                    if(not alreadyIn):
                        genreMovie.append(str(movieId[0]))

                    genreMovie = ';'.join(genreMovie)
                else:
                    genreMovie = movieId[0]


                print(genreMovie)
                connector.execute("""UPDATE genres SET movies = %s WHERE tag = %s""", [genreMovie,tag])

    return ''


if (os.path.isdir(DEST_PATH)):
    for directory in os.listdir(DEST_PATH):
        fullpath = os.path.join(DEST_PATH, directory)
        if(os.path.isdir(fullpath)):
            fetchPictures(fullpath , directory)
            print('\n\n')
else:
    print('no root')