
#imporing Scrappers based fetcher
from webservices.scrapper.perplexity import Perplexity
from webservices.scrapper.asianwiki import AsianWiki
from webservices.scrapper.imdb import Imdb
from webservices.scrapper.mubi import Mubi
#impporting Api based fetcher
from webservices.api.wikipedia import Wikipedia
from webservices.api.tmdb import Tmdb



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
        