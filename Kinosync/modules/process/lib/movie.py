from tmdbv3api import Movie as TmdbMovie
from lib.utils import config, getDateTime, downloadPicture, resizePicture

class Movie:

    """
    Gather information about the movie based of TMDB api and return a dictionnary with the information
    """

    def __init__(self,tmdbID):
        self.id = tmdbID
        self.director = None
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

    def fetch(self):

        movie = TmdbMovie()
        
        #set basic info (title; poster; summary)
        details = movie.details(self.id)
        self.title = details.title
        self.date = details.release_date
        self.production = self.getCompany(details)
        self.poster = None
        self.summary = ""
        self.country = ""

        try:
            posterUrl = "https://image.tmdb.org/t/p/w300"+details.poster_path
            dlPic = downloadPicture(posterUrl, config('MOVIES_POSTERS_PATH'), self.id )
            resizePicture(dlPic, (300,300))
            self.poster = f"/assets/posters/movies/{self.id}.webp"
        except:
            pass
        try:
            self.country = details.production_countries[0]['name']
        except:
            pass
        try:
            self.summary = details.overview
        except:
            pass

        #set crew/ cast info from movie credits (director; dop...)
        crew = movie.credits(self.id).crew
        if(crew):
            for job in crew:

                if(job["job"] == "Director" ):
                    self.director = job['id']

                if(job["job"] == "Director of Photography" ):
                    self.dop = job["id"]

                if(job["job"] == "Art Direction" ):
                    self.artdir = job["id"]

        return {'id':self.id,
                'title':self.title,
                'date':self.date,
                'director':self.director,
                'dop':self.dop,
                'artdir':self.artdir,
                'poster':self.poster,
                'country':self.country,
                'summary':self.summary,
                'production':self.production,
                'last_update':getDateTime()
            }
 