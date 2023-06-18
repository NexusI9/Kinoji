from tmdbv3api import Movie
from tmdbv3api import Person as tmdbPerson
import wikipedia as wiki


class Person:

    def __init__(self, movieId, job):
        self.person = tmdbPerson()
        self.movieId = movieId
        self.job = job
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

    def fetch(self):

        #get TMDB director info from wiki

        #set crew/ cast info (director; dop...)
        crew = Movie().credits(self.movieId).crew

        if(crew):
            for job in crew:

                if( (job["job"] == "Director" and self.job=='director') or 
                    (job["job"] == "Director of Photography" and self.job == 'dop' ) or 
                    (job["job"] == "Art Direction" and self.job == 'artdir') ):
                    
                    self.name = job["name"]
                    self.id = job['id']

                    try:
                        self.poster = "https://image.tmdb.org/t/p/w300"+job["profile_path"]
                    except:
                        self.poster = None
                    

                    try:
                        wiki_url = wiki.page(self.name,auto_suggest=False).url
                    except:
                        wiki_url = ''
                    try:
                        summary = wiki.summary(self.name,auto_suggest=False)
                    except:
                        summary = ''

                    
                    self.sources = ";".join([wiki_url, "https://www.themoviedb.org/person/" + str(self.id)])



                    return {'name': self.name,
                            'id': self.id,
                            'job':self.job,
                            'poster': self.poster,
                            'sources':self.sources,
                            'summary':summary,
                            'birthday':self.getDate(self.id)['birthday'],
                            'deathday':self.getDate(self.id)['deathday'],
                            'country':self.getCountry(self.id),
                            "summary": summary
                        }

