from lib.tmdbapi import tmdb
from tmdbv3api import Person



class Tmdb:

    def __init__(self):
        return None
    

    def url(self, id):
        return "https://www.themoviedb.org/person/%s" % (id)

    def summary(self, id):
        return id

    def poster(self, id):

        src = Person().details(id)['profile_path']
        if(src):
            src = "https://image.tmdb.org/t/p/w300%s" % (src)
            print('[TMDB > poster]\tProfile_path found: \n=> %s' % (src) )
        else:
            print('[TMDB > poster]\tFAILURE: Couldn\'t find any profile_path')

        return src