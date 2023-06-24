from tmdbv3api import Person as TmdbPerson
from modules.webworkers.webworkers import Webworkers
from lib.utils import beautyprint, getDateTime



class Person:

    def __init__(self, personID, job):
        self.id = personID
        self.person = TmdbPerson().details(personID)
        self.name = self.person["name"]
        self.job = job
        return

    def fetch(self):

        #get TMDB director info from webscrappers and TMDB
        try:
            fulljob = {
                "dop": "Director of Photography",
                "artdir": "Art Direction",
                "director": "Director"
            }[self.job]
        except:
            fulljob = ''

        webresults = Webworkers({"name":self.name, "id":self.id, "job":fulljob}).process()                    

        try:
            summary = webresults['summary']['content']
        except:
            summary = None

        try:
            sources = ';'.join(webresults['summary']['sources'])
        except:
            sources = None
        
        try:
            poster = webresults['poster']
            if(poster):
                poster = f'/assets/posters/peoples/{self.id}.webp'
        except:
            poster = None

        return {'name': self.name,
                'id': self.id,
                'job':self.job,
                'poster':poster,
                'sources':sources,
                'summary':summary,
                'birthday':self.person['birthday'],
                'deathday':self.person['deathday'],
                'country':self.person['place_of_birth'],
                'last_update': getDateTime()
            }

