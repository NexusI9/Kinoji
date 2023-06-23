from modules.webworkers.lib.tmdbapi import tmdb
from tmdbv3api import Person

class Tmdb:

    def __init__(self):
        return None
    
    def url(self, id):
        return "https://www.themoviedb.org/person/%s" % (id)

    def summary(self, payload):

        id = payload['id']
        biography = Person().details(id)['biography']
        name = payload['name']

        if(not name or not id):
            print('Couldn\'t statisfy all the keys from the payload. \n Missing keys: name | id')
            return None

        if(biography):
            print('Found content for %s' % (name))
        else:
            print('FAILURE: Couldn\'t find any content for %s' % (name))
        
        return {
            "content":biography, 
            "sources":[self.url(id)]
            }

    def poster(self, payload):

        id = payload['id']
        src = Person().details(id)['profile_path']
        if(src):
            src = "https://image.tmdb.org/t/p/w300%s" % (src)
            print('[TMDB > poster]\tProfile_path found: \n=> %s' % (src) )
        else:
            print('[TMDB > poster]\tFAILURE: Couldn\'t find any profile_path')

        return src