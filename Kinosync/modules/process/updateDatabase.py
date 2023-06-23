#fetch data from Wikipedia and TMDB api to fill Database info
from modules.process.lib.connector import Connector

from modules.webworkers.lib.tmdbapi import tmdb
from modules.webworkers.workers.person import Person
from modules.webworkers.workers.movie import Movie

from lib.utils import config
from lib.utils import clear

USERNAME = config("USERNAME")
HOSTNAME = config("HOSTNAME")
PASSWORD = config("PASSWORD")
DTBNAME = config("DTBNAME")


class UpdateDatabase:

    def __init__(self):
        self.connector = Connector(HOSTNAME, USERNAME, PASSWORD, DTBNAME)
        print('\n\nMode 2: Update TDMB and Wikipedia database')

    def fetchDataOfMovies(self, moviesList):

        print(moviesList)
        for mv in moviesList:
            print("\n\n\n")
            print("----------------")
            for key in mv.keys():
                print('{:<14} {:<40}'.format(key, mv[key]))

            try:
                movieID = mv["id"]
            except:
                print("Error getting ID")
            else:

                #retrieving movie data
                print('Retrieving movie data...')
                movieData = Movie(movieID).fetch()

                #retrieving peoples data
                peoples = ['director','dop','artdir']
                for job in peoples:
                    if(movieData[job]):
                        print('Retrieving %s data...' % (job))
                        peopleData = Person(movieData, job).fetch()
                        self.commitSQL("peoples", peopleData)


                print("------------------------------------------------")
                print("------------------------------------------------")

                print("Updating %s" % (movieData["title"]))
                self.commitSQL("peoples", movieData)



        return


    def newMovies(self):
        movieList = self.connector.getJSON("""SELECT * FROM movies WHERE title IS NULL""")
        self.fetchDataOfMovies(movieList)
        return
    
    def movie(self):
        id = input('Type de the tmdb ID of the movie you wish to fetch:\n=> ')
        movie = self.connector.getJSON("""SELECT * from movies where id = %s """, [id])

        if(len(movie) == 0):
            print('No movie with id %s found in the database' % (id))
            return self.movie()
        else:
            return self.fetchDataOfMovies(movie)
    
    def people(self):
        return

    def bruteUpdate(self):
        movieList = self.connector.getJSON("""SELECT * FROM movies""")
        self.fetchDataOfMovies(movieList)
        return



    def commitSQL(self, tb, obj):
        if(not obj or obj == None):
            return
        
        print("[...] Committing to Database")
        self.connector.update(table=tb,data=obj)
        print("> DONE !")



    def start(self):

        clear()
        print("""How do you want to fetch web data: \n
        [ 1 ] - Fetch newly added movies\n
        [ 2 ] - Fetch specific movie\n
        [ 3 ] - Fetch specific people\n
        [ 4 ] - Brute fetch all movies (global update)""")
        
        fetchMethod = input("""=> """)
        

        if(fetchMethod == '1'):
            return self.newMovies() #fetch new movies
        elif(fetchMethod == '2'):
            return self.movie() #fetch specific movie (by TMDB id)
        elif(fetchMethod == '3'):
            return self.people() #fetch specific people (by TMDB id)
        elif(fetchMethod == '4'):
            return self.bruteUpdate() #fetch all movies and peoples
        else:
            print('%s is not a valid input, please enter a valid number' % (fetchMethod))
            return self.start()
        
       