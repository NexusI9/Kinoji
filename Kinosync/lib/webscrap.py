
from tmdbv3api import TMDb, Person
from utils import Utils
from webscrapper.perplexity import Perplexity
from webscrapper.asianwiki import AsianWiki
from webscrapper.wikipedia import Wikipedia
from webscrapper.mubi import Mubi


apiKey = Utils.CONFIG("API_KEY")
tmdb = TMDb()
tmdb.api_key = apiKey
tmdb.language = 'en'
tmdb.debug = True


SOURCES = {
      "wikipedia":{},
      "tmdb":{
            "details": lambda id : Person().details(id),
            "summary": lambda id : Person().details(id)['biography'],
            "url": lambda id: "https://www.themoviedb.org/person/%s" % (id),
            "poster": lambda job: "https://image.tmdb.org/t/p/w300%s" % (job["profile_path"])
      },
      "imdb":{
            "id": lambda id: Person().details(id)["imdb_id"],
            "summary": lambda : True,
            "url": lambda : "https://www.imdb.com/name/%s" % (Person().details(id)["imdb_id"]),
            "poster": lambda : True,
      },
      "mubi":{
            "summary": lambda : True,
            "url": lambda : True,
            "poster": lambda : True,
      },
      "perplexity":{
           "summary": lambda name, job : Perplexity().summary(name, job)
      },


}


class Webscrapper:

      def __init__(self, name='', id='', job='', custom={}):
            self.name = name
            self.id = id
            self.job = job
            self.custom = custom
            return None
        
      def summary(self):
            return True
        
      def poster(self):

            #Mubi().poster(self.custom['mubi']['name'] or self.name)
            #AsianWiki().poster(self.custom['asianwiki']['name'] or self.name)
            #Wikipedia().poster(self.name)


            #result = base64.b64encode(requests.get(src).content)
            return True
      
      def dates(self):
            return True
        

Webscrapper("Wong Kar-Wai", 12453, 'director').poster()