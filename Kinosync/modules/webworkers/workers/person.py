from tmdbv3api import Person as TmdbPerson
from modules.webworkers.webworkers import Webworkers


class Person:

    def __init__(self, personID, job):
        self.id = personID
        self.person = TmdbPerson().details(personID)
        self.name = self.person["name"]
        self.job = job
        return

    def fetch(self):

        #get TMDB director info from webscrappers and TMDB
        fulljob = {
            "dop": "Director of Photography",
            "ardir": "Art Direction",
            "director": "Director"
        }[self.job]

        webresults = Webworkers({"name":self.name, "id":self.id, "job":fulljob or ''}).process()                    

        try:
            sources = ';'.join(webresults['summary']['sources'])
        except:
            sources = None
            pass

        return {'name': self.name,
                'id': self.id,
                'job':self.job,
                'poster': webresults['poster'],
                'sources':sources,
                'summary':webresults['summary']['content'],
                'birthday':self.person['birthday'],
                'deathday':self.person['deathday'],
                'country':self.person['place_of_birth']
            }

