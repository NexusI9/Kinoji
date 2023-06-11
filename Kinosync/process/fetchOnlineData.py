#fetch data from Wikipedia and TMDB api to fill Database info

from tmdbv3api import TMDb
from lib.utils import Utils
from lib.connector import Connector
from lib.person import PERSON
from lib.movie import MOVIE

apiKey = Utils.GET_CONFIG("API_KEY")

tmdb = TMDb()
tmdb.api_key = apiKey
tmdb.language = 'en'
tmdb.debug = True

USERNAME = Utils.GET_CONFIG("USERNAME")
HOSTNAME = Utils.GET_CONFIG("HOSTNAME")
PASSWORD = Utils.GET_CONFIG("PASSWORD")
DTBNAME = Utils.GET_CONFIG("DTBNAME")


class UpdateDatabase:

    def __init__(self):
        self.connector = Connector(HOSTNAME, USERNAME, PASSWORD, DTBNAME)
        print('\n\nMode 2: Update TDMB and Wikipedia database')


    def bruteUpdate(self):
        return

    def fastScan(self):
        return

    def commitSQL(self, tb, obj):
        print("[...] Committing to Database")
        self.connector.update(table=tb,data=obj)
        print("> DONE !")



    def start(self):

        brute_scan = input('Do you wish to update all entries ? (y/n) \n')
        query = """SELECT * FROM movies WHERE title IS NULL"""

        if(brute_scan == ('y' or 'yes' or '')):
            query = """SELECT * FROM movies"""
        
        JSON_MOVIES = self.connector.getJSON(query)

        for mv in JSON_MOVIES:
            print("\n\n\n")
            try:
                mv_id = mv["id"]
            except:
                print("Error getting ID")
            else:

               movieData = MOVIE(mv_id).fetch()
               directorData = PERSON(mv_id, 'director').fetch()
               dopData = PERSON(mv_id, 'dop').fetch()
               artdirData = PERSON(mv_id, 'artdir').fetch()

               print("------------------------------------------------")
               print("------------------------------------------------")

               print("Updating Movie directory with movie: %s" % (movieData["title"]))

               self.commitSQL("movies", movieData)
               self.commitSQL("peoples", directorData)
               self.commitSQL("peoples", dopData)
               self.commitSQL("peoples", artdirData)
