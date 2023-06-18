
from tmdbv3api import TMDb, Person
from webutils.perplexity import Perplexity
from webutils.asianwiki import AsianWiki
from webutils.wikipedia import Wikipedia
from webutils.tmdb import Tmdb
from webutils.imdb import Imdb
from webutils.mubi import Mubi


SOURCES = {
      "wikipedia":{},
      "tmdb":{},
      "imdb":{
            "summary": lambda : True
      },
      "mubi":{
            "summary": lambda : True
      },
      "perplexity":{
            "summary": lambda : True
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
            #Imdb().poster(self.name, self.id)

            #result = base64.b64encode(requests.get(src).content)
            return True
      
      def dates(self):
            return True
        