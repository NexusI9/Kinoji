#fetch data from Wikipedia and TMDB api to fill Database info

from tmdbv3api import TMDb, Movie, Person
import json
import wikipedia as wiki
from utilities.utils import Utils
from utilities.connector import Connector

apiKey = Utils.GET_CONFIG("API_KEY")

tmdb = TMDb()
tmdb.api_key = apiKey

USERNAME = Utils.GET_CONFIG("USERNAME")
HOSTNAME = Utils.GET_CONFIG("HOSTNAME")
PASSWORD = Utils.GET_CONFIG("PASSWORD")
DTBNAME = Utils.GET_CONFIG("DTBNAME")

tmdb.language = 'en'
tmdb.debug = True


class _DIRECTOR:

    def __init__(self):
        self.person = Person()
        return

    def getCountry(self,id):
        details = self.person.details(id)
        return details['place_of_birth']

    def getDate(self, id):
        details = self.person.details(id)
        return {
            "birthday":details['birthday'],
            "deathday":details['deathday']
        }

    def fetch(self,name):

        #get TMDB director info from wiki

        try:
            wiki_url = wiki.page(name,auto_suggest=False).url
        except:
            wiki_url = ''
        try:
            summary = wiki.summary(name,auto_suggest=False)
        except:
            summary = ''


        return {
            "wiki": wiki_url,
            "summary": summary
        }




class MOVIE:

    def __init__(self,dd):
        self.id = dd
        self.director = {"name": None, "poster": None, "id":None }
        self.dop = None
        self.artdir = None
        self.title = None
        self.date = None
        self.summary = None
        self.company = None

    def getCompany(self,details):
        ar = []
        try:
            companies = details.production_companies
        except:
            return ''

        for company in companies:
            ar.append(company['name'])

        return ";".join(ar)

    def getTMDB(self):

        movie = Movie()


        #set basic info (title; poster; summary)
        details = movie.details(self.id)
        self.title = details.title
        self.date = details.release_date
        self.production = self.getCompany(details)
        try:
            self.poster = "https://image.tmdb.org/t/p/w300"+details.poster_path
        except:
            self.poster = "./media/noposter.jpg"
        try:
            self.country = details.production_countries[0]['name']
        except:
            self.country = ""
        try:
            self.summary = details.overview
        except:
            self.summary = ""


        #set crew/ cast info (director; dop...)
        crew = movie.credits(self.id).crew

        if(crew):
            for job in crew:

                if(job["job"] == "Director" ):
                    self.director['name'] = job["name"]
                    self.director['id'] = job['id']
                    self.sources = _DIRECTOR().fetch(self.director['name'])['wiki'] + ';' + "https://www.themoviedb.org/person/" + str(self.director["id"])

                    try:
                        self.director['poster'] = "https://image.tmdb.org/t/p/w300"+job["profile_path"]
                    except:
                        self.director['poster'] = None

                if(job["job"] == "Director of Photography" ):
                    self.dop = job["name"]

                if(job["job"] == "Art Direction" ):
                    self.artdir = job["name"]



        return {
            "movie":{'id':self.id,
                     'title':self.title,
                     'date':self.date,
                     'director':self.director['id'],
                     'dop':self.dop,
                     'artdir':self.artdir,
                     'poster':self.poster,
                     'country':self.country,
                     'summary':self.summary,
                     'production':self.production

                     },

            "director":{ 'name': self.director['name'],
                         'id': self.director['id'],
                         'poster': self.director['poster'],
                         'sources':self.sources,
                         'summary':_DIRECTOR().fetch(self.director['name'])['summary'],
                         'birthday':_DIRECTOR().getDate(self.director['id'])['birthday'],
                         'deathday':_DIRECTOR().getDate(self.director['id'])['deathday'],
                         'country':_DIRECTOR().getCountry(self.director['id'])

                       }
        }
        

class UpdateDatabase:

    def __init__(self):
        self.connector = Connector(HOSTNAME, USERNAME, PASSWORD, DTBNAME)
        print('\n\nMode 2: Update TDMB and Wikipedia database')


    def bruteUpdate(self):
        return

    def fastScan(self):
        return

    def commitJSON(self, data):
        with open(dtbFile,'w') as d:
            json.dump(data,d,indent=3)
            d.close()

    def commitSQL(self, tb, obj):
        print("[...] Committing to Database")
        self.connector.update(table=tb,data=obj)
        print("> DONE !")



    def start(self):

        brute_scan = input('Do you wish to update all entries ? (y/n) \n')
        query = """SELECT * FROM movies WHERE title IS NULL"""

        if(brute_scan == ('y' or 'yes')):
            query = """SELECT * FROM movies"""
        JSON_MOVIES = self.connector.getJSON(query)

        for mv in JSON_MOVIES:
            print("\n\n\n")
            try:
                mv_id = mv["id"]
            except:
                print("Error getting ID")
            else:

               newMovie = MOVIE(mv_id).getTMDB()
               print("------------------------------------------------")
               print("------------------------------------------------")

               print("Updating Movie directory with movie: %s" % (newMovie["movie"]["title"]))
               print(newMovie["movie"])

               self.commitSQL("movies", newMovie["movie"])
               self.commitSQL("directors", newMovie["director"])
