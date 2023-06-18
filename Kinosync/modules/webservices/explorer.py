#imporing Scrappers based fetcher
from modules.webservices.workers.perplexity import Perplexity
from modules.webservices.workers.asianwiki import AsianWiki
from modules.webservices.workers.imdb import Imdb
from modules.webservices.workers.mubi import Mubi

#importing Api based fetcher
from modules.webservices.workers.wikipedia import Wikipedia
from modules.webservices.workers.tmdb import Tmdb

#importing analysis tools
from modules.webservices.steps.fetcher import Fetcher

from modules.webservices.lib.config import PERSON_CONFIG

SERVICES = {
      "tmdb": Tmdb,
      "imdb": Imdb,
      "mubi": Mubi,
      "wikipedia": Wikipedia,
      "asianwiki": AsianWiki,
      "perplexity": Perplexity
      }

class Explorer:

      def __init__(self, subject={}, config=PERSON_CONFIG):
            
            self.subject = subject
            self.sources = config['fetching']['sources']
            
            self.services = SERVICES;

            self.results = {
                  "summary":{},
                  "poster":{}
            }
        
      def process(self):

            #fetch data
            fetcher = Fetcher(self.subject, self.services, self.sources)

            #self.results['poster'] = fetcher.poster()
            self.results['summary'] = fetcher.summary()
            
            print(self.results)
            return self.results
      
        

        