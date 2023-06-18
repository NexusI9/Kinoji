#fetch data from Wikipedia and TMDB api to fill Database info

from webservices.lib.tmdbapi import tmdb
from lib.connector import Connector
from webservices.api.person import Person
from webservices.api.movie import Movie
from lib.utils import config

USERNAME = config("USERNAME")
HOSTNAME = config("HOSTNAME")
PASSWORD = config("PASSWORD")
DTBNAME = config("DTBNAME")


class UpdateDatabase:

    def __init__(self):
        self.connector = Connector(HOSTNAME, USERNAME, PASSWORD, DTBNAME)
        print('\n\nMode 2: Update TDMB and Wikipedia database')


    def bruteUpdate(self):
        return

    def fastScan(self):
        return

    def commitSQL(self, tb, obj):
        if(not obj or obj == None):
            return
        
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

               movieData = Movie(mv_id).fetch()
               directorData = Person(mv_id, 'director').fetch()
               dopData = Person(mv_id, 'dop').fetch()
               artdirData = Person(mv_id, 'artdir').fetch()

               print("------------------------------------------------")
               print("------------------------------------------------")

               print("Updating Movie directory with movie: %s" % (movieData["title"]))

               self.commitSQL("movies", movieData)
               self.commitSQL("peoples", directorData)
               self.commitSQL("peoples", dopData)
               self.commitSQL("peoples", artdirData)
