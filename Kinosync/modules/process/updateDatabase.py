#fetch data from Wikipedia and TMDB api to fill Database info
from modules.process.lib.connector import Connector

from modules.webworkers.lib.tmdbapi import tmdb
from modules.webworkers.workers.person import Person
from modules.webworkers.workers.movie import Movie

import sys
from lib.utils import config, clear, beautyprint

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
            beautyprint(mv)

            try:
                movieID = mv["id"]
            except:
                print("Error getting ID")
            else:

                #retrieving movie data
                print('Retrieving movie data...')
                movieData = Movie(movieID).fetch()
                print("Updating %s" % (movieData["title"]))
                #self.connector.commit("peoples", movieData)
                beautyprint(movieData)

                #retrieving peoples data
                peoples = ['director','dop','artdir']
                for job in peoples:
                    peopleID = movieData[job]
                    if(peopleID):
                        print('\nRetrieving %s data...' % (job))
                        peopleData = Person(peopleID, job).fetch()
                        #self.connector.commit("peoples", peopleData)
                        if(peopleData):
                            beautyprint(peopleData)
                        else:
                            print('Could not find data for %s (id: %s)' % (job % peopleID))
                
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
        id = input('Type de the tmdb ID of the movie you wish to fetch:\n=> ')
        people = self.connector.getJSON("""SELECT * FROM peoples WHERE id = %s """, [id])

        if(len(people) == 0):
            print('No people with id %s found in the database' % (id))
            return
        else:
            pplData = Person(people[0]['id'], people[0]['job']).fetch()
            if pplData:
                beautyprint(pplData)
                #self.connector.commit('peoples', pplData)
            else:
                print('Could not find any data for people %s' % (people[0]['id']))
            return 
    

    def bruteUpdate(self):
        movieList = self.connector.getJSON("""SELECT * FROM movies""")
        self.fetchDataOfMovies(movieList)
        return


    def start(self):

        clear()
        print("""\nHow do you want to fetch web data: \n
    [ 1 ] - Fetch newly added movies\n
    [ 2 ] - Fetch specific movie\n
    [ 3 ] - Fetch specific people\n
    [ 4 ] - Brute fetch all movies (global update)\n
    (0 to exit)\n""")        

        {
            '0': sys.exit,
            '1': self.newMovies,  #fetch new movies
            '2': self.movie,      #fetch specific movie (by TMDB id)
            '3': self.people,     #fetch specific people (by TMDB id)
            '4': self.bruteUpdate #fetch all movies and peoples
        }[input("=> ")]()


        
       