#imporing Scrappers based fetcher
from webservices.scrapper.perplexity import Perplexity
from webservices.scrapper.asianwiki import AsianWiki
from webservices.scrapper.imdb import Imdb
from webservices.scrapper.mubi import Mubi

#importing Api based fetcher
from webservices.api.wikipedia import Wikipedia
from webservices.api.tmdb import Tmdb

#importing analysis tools
from webservices.steps.fetcher import Fetcher


CONFIG = {
      "fetching": {
            "services":{
                  "tmdb": Tmdb,
                  "imdb": Imdb,
                  "mubi": Mubi,
                  "wikipedia": Wikipedia,
                  "asianwiki": AsianWiki,
                  "perplexity": Perplexity
            },
            "custom":{
                  "summary":{},
                  "poster":{
                        "asianwiki": lambda name, job : "%s (%d)" % (name, job)
                  }
            },
      },
      "filtering":{
            "keywords":{
                  "avoid":["football"]
            }
      },
      "fusioning":{
            "methods":{
                  "summary": "SYNTHETISE",
                  "poster": "MANUAL"
            }
      }
}

class Explorer:

      def __init__(self, person):
            self.person = person
            
            self.services = CONFIG['fetching']['services']

            self.results = {
                  "summary":{},
                  "poster":{}
            }
        
      def process(self):

            #fetch data
            fetcher = Fetcher(self.person, self.services)

            #self.results['poster'] = fetcher.poster()
            self.results['summary'] = fetcher.summary()
            
            print(self.results)
            return self.results
      
        

        