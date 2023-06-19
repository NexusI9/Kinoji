#importing workers
from modules.webservices.lib.workers import WORKERS

#importing analysis tools
from modules.webservices.steps.fetcher import Fetcher

#import default config
from modules.webservices.lib.config import PERSON_CONFIG



class Explorer:

      def __init__(self, subject={}, config=PERSON_CONFIG):
            
            self.subject = subject
            self.sources = None
            self.config = config

            try:
                  self.sources = config['fetching']['workers']
            except:
                  self.sources = WORKERS.keys()
            
            self.workers = WORKERS;

            self.results = {
                  "summary":{},
                  "poster":{}
            }
        
      def process(self):

            #fetch data
            fetcher = Fetcher(self.subject, self.sources, self.config)

            #self.results['poster'] = fetcher.poster()
            self.results['summary'] = fetcher.summary()
            
            print(self.results)
            return self.results
      
        

        