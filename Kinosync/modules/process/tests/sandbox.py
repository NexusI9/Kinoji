import os
from datetime import datetime
from lib.utils import config, downloadPicture, resizePicture, md5, getDateTime
from modules.process.lib.connector import Connector
import re
import shutil

from modules.webworkers.workers.perplexity import Perplexity

from modules.process.lib.spotlight import Spotlight


SHOTS_PATH = config("SHOTS_PATH")
USERNAME = config("USERNAME")
HOSTNAME = config("HOSTNAME")
PASSWORD = config("PASSWORD")
DTBNAME = config("DTBNAME")

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


def pushNewMovies(path, moviename):
    shots = [ f.replace('.webp','') for f in os.listdir(path) if f != 'thumbnails' and f != '.' and f != '..' and f != '.DS_Store']
    shots.sort()

    movie_id = re.findall("(\d+)[^-]*$", moviename)[0];

    def get_index(file):
        return int(re.findall(r'\d+', file)[-1])
    
    def get_id(obj):
        return obj['id'];

    sorted_shots = sorted(shots, key=get_index)
    idList = list(map(get_id, connector.getJSON("""SELECT id FROM movies""")))
    exists = False;

    for id in idList:
        if(int(id) == int(movie_id)):
            exists = True

    if(not exists):
        json = {
            'folder':moviename,
            'id': movie_id,
            'shots':';'.join(sorted_shots),
            'added': datetime.fromtimestamp(os.stat(SHOTS_PATH+moviename).st_birthtime).strftime('%Y-%m-%d %H:%M:%S')
        }

        print(json)
        connector.update(table='movies', data=json);

#go through the SHOTS_PATHS directory
def traverseDirectory():
    if (os.path.isdir(SHOTS_PATH)):
        for directory in os.listdir(SHOTS_PATH):
            fullpath = os.path.join(SHOTS_PATH, directory)
            if(os.path.isdir(fullpath)):
                pushNewMovies(fullpath, directory)
                print('\n\n')
    else:
        print('no root')

#download movie posters and resize them
def downloadMoviePosters():

    movies = connector.getJSON("""SELECT poster, id from movies""")
    print(list(movies))

    for mv in movies:
        if(mv['poster']):
            id= mv['id']
            dlPic = downloadPicture(mv['poster'], config('MOVIES_POSTERS_PATH'), id )
            resizePicture(dlPic, (300,300))
            connector.update('movies', {"id":id, "poster": f"/assets/posters/movies/{id}.webp" })

#check for mubi no portrait through MD5 analysis
def moveMubiNoPortrait():

    ids = connector.getJSON("""SELECT id from peoples""")

    for id in ids:
        id = id['id']
        fullpath = os.path.join(config('PEOPLES_POSTERS_PATH'),f"{id}.webp")

        fileMd5 = md5(fullpath)
        if(fileMd5 and fileMd5 == "9a4e8ab1486bf2f2c95486046778c99e"):

            # Specify the destination directory path on the desktop
            destination_dir = os.path.expanduser('~/Desktop/' + 'blank')

            # Create the destination directory if it doesn't exist
            if not os.path.exists(destination_dir):
                os.makedirs(destination_dir)

            shutil.move(fullpath, destination_dir)
            connector.update('peoples', {'id':id, 'poster':None})

#fetch history summary from perplexity ai   
def history():
    events = connector.getJSON("""SELECT * FROM history WHERE summary is NULL""")
    
    
    for ev in events:
        summary = Perplexity().summary({
            'prompt':'HISTORY',
            'event':ev['name'],
            'country':ev['country'],
            'begin':str(ev['begin'])
        })

        print(summary)

        connector.update('history',{
            **ev,
            'summary':summary['content'],
            'sources':";".join(summary['sources']),
            'last_update':getDateTime()
        })


    return  


#fetch collection summary from perplexity ai   
def collection():
    collection = connector.getJSON("""SELECT * FROM collections WHERE summary IS NULL""")
    
    
    for ev in collection:
        summary = Perplexity().summary({
            'prompt':'COLLECTION',
            'collection':ev['name']
        })

        print(summary)

        connector.update('collections',{
            **ev,
            'summary':summary['content'],
            'sources':";".join(summary['sources']),
            'last_update':getDateTime()
        })


    return  


#remove the unwated pattern generated by perplexity " 1 2 3 ."
def cleanSummary():  

    events = connector.getJSON("""SELECT * FROM history""")
    
    for ev in events:
        if(ev['summary']):
            summary = re.sub(r'(\n\d|\n\.)','',ev['summary']) + '.'
            summary = re.sub(r'(\.+)','.',ev['summary'])

            connector.update('peoples',{
                **ev,
                'summary':summary,
                'last_update':getDateTime()
            })    
    
    return            



def Sandbox():
    
    sp = Spotlight();
    root = '/Users/elkhantour/Sites/Kinoji/Webapp/public/assets/movies/2001 Space Odyssey-62/thumbnails/'
    for file in os.listdir(root):
        fullpath = f'/Users/elkhantour/Sites/Kinoji/Webapp/public/assets/movies/2001 Space Odyssey-62/thumbnails/{file}'
        print('{:20} {:>5}'.format(file, sp.contrast(fullpath)));

    return
