from tmdbv3api import Movie

class Movie:

    def __init__(self,dd):
        self.id = dd
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

        movie = Movie()


        #set basic info (title; poster; summary)
        details = movie.details(self.id)
        self.title = details.title
        self.date = details.release_date
        self.production = self.getCompany(details)
        try:
            self.poster = "https://image.tmdb.org/t/p/w300"+details.poster_path
        except:
            self.poster = None
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
                'production':self.production
            }
 