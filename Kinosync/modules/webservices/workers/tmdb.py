from modules.webservices.lib.tmdbapi import tmdb
from tmdbv3api import Person

class Tmdb:

    def __init__(self):
        return None
    
    def url(self, id):
        return "https://www.themoviedb.org/person/%s" % (id)

    def summary(self, subject):

        id = subject['id']
        biography = Person().details(id)['biography']
        name = subject['name']

        if(not name or not id):
            print('[TMDB > Summary] Couldn\'t statisfy all the keys from the subject. \n Missing keys: name | id')
            return None

        if(biography):
            print('[TMDB > Summary] Found content for %s' % (name))
        else:
            print('[TMDB > Summary] FAILURE: Couldn\'t find any content for %s' % (name))
        
        return biography

    def poster(self, subject):

        id = subject['id']
        src = Person().details(id)['profile_path']
        if(src):
            src = "https://image.tmdb.org/t/p/w300%s" % (src)
            print('[TMDB > poster]\tProfile_path found: \n=> %s' % (src) )
        else:
            print('[TMDB > poster]\tFAILURE: Couldn\'t find any profile_path')

        return src