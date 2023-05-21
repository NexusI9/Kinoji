from utilities.connector import Connector
from utilities.utils import Utils
import os
import shutil

USERNAME = Utils.GET_CONFIG("USERNAME")
HOSTNAME = Utils.GET_CONFIG("HOSTNAME")
PASSWORD = Utils.GET_CONFIG("PASSWORD")
DTBNAME = Utils.GET_CONFIG("DTBNAME")

shots_path = Utils.GET_CONFIG("SHOTS_PATH")

class Wiper:

    def __init__(self):
        self.connector = Connector(HOSTNAME,USERNAME,PASSWORD,DTBNAME)
        return

    def cleanList(self,list):
        temp = []
        for folder in list:
            temp.append(folder['folder'])
        return temp

    def exists(self, folder):
        if os.path.exists( shots_path + '/full/' + folder ):
            return True
        return False

    def deleterFromDrive(self,folder):
        print('[...] Removing %s from hardrive' % (folder))
        try:
            shutil.rmtree(shots_path + '/full/' + folder)
            shutil.rmtree(shots_path + '/thumb/' + folder)
        except:
            print('Couldn\'t remove folders (perhaps already removed ?)')
            return
        else:
            print('> Done !\n\n')

    def movieInfo(self, folder):

        try:
            getMovieId = self.connector.getJSON("""SELECT id FROM movies WHERE folder = %s""", (folder,))[0]['id']
            getDirID = self.connector.getJSON("""SELECT director FROM movies WHERE folder = %s""", (folder,))[0]['director']
        except:
            print("Couldn't retrieve movie and director ID")
            getMovieId = input('TMDB Movie ID: ')
            getDirID = input('TMDB Director ID: ')

        return {
            "movie_id":getMovieId,
            "director_id":getDirID
        }

    def deleteFromMovies(self,folder):
        print('[-] Cleaning movies tables')
        self.connector.execute("""DELETE FROM movies where folder = %s""", (folder,))
        print('> Done !\n\n')

    def deleteFromDirector(self,DirId):
        print('[-] Cleaning director tables')
        print('Director ID : %s' % (DirId,))
        #get if director has other movies in movies tables
        dirMovies = self.connector.execute("""SELECT COUNT(*) FROM movies where director = %s""", (DirId,))
        if(len(dirMovies) > 0):
            dirMovies = dirMovies[0][0]

        if(dirMovies == 0):
            print("The director has NO other movies in the database: removing \n")
            self.connector.execute("""DELETE FROM directors WHERE id = %s""", (DirId,))
        else:
            print("The director has other movies existing in the databases: no removal \n")

        print('> Done !\n\n')
        return

    def deleteFromAesthetic(self,MovieId):
        print('[-] Cleaning aesthetics tables')
        self.connector.execute("""DELETE FROM aesthetics WHERE id = %s""", (MovieId,))
        print('> Done !\n\n')
        return

    def start(self):

        folder = input('Which folder do you wish to erase ? \n=> ')
        if self.exists(folder):
            info = self.movieInfo(folder)

            print('-----------------------------------\n')
            print('[...] Cleaning up hardrive')
            self.deleterFromDrive(folder)
            print('\n[...] Cleaning up database')
            self.deleteFromMovies(folder)
            self.deleteFromDirector(info['director_id'])
            self.deleteFromAesthetic(info['movie_id'])

        else:
            print("ERROR: folder doesn't exists, check for typo...")
            self.start()