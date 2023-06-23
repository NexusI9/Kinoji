from tmdbv3api import Movie
from tmdbv3api import Person as tmdbPerson
from modules.webworkers.webworkers import Webworkers


class Person:

    def __init__(self, personID, job):
        self.id = personID
        self.person = tmdbPerson().details(personID)
        self.name = self.person["name"]
        self.job = job
        return

    def getDate(self, id):
        details = self.person.details(id)
        return {
            "birthday":details['birthday'],
            "deathday":details['deathday']
        }

    def fetch(self):

        #get TMDB director info from webscrappers and TMDB
        fulljob = 'Director'

        if(self.job == 'director'):
            fulljob = 'Director'
        elif(self.job == 'dop'):
            fulljob = 'Director of Photography'
        elif(self.job == 'artdir'):
            fulljob = 'Art Direction'

            webresults = Webworkers({"name":self.name, "id":self.id, "job":fulljob}).process()                    
            sources = None
            try:
                sources = ';'.join(webresults['summary']['sources'])
            except:
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

