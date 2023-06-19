#importing workers
from modules.webservices.lib.workers import WORKERS

#importing analysis tools
from modules.webservices.tools.fetcher import Fetcher

#import default config
from modules.webservices.lib.config import PERSON_CONFIG


class Explorer:

      def __init__(self, subject={}, config=PERSON_CONFIG, resultType='BOTH'):
            
            self.subject = subject
            self.sources = None
            self.config = config
            self.resultType = resultType

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

            resultType = None
            try: 
                  resultType = self.config['result_type']
            except:                                   #get all results
                  self.results['poster'] = fetcher.poster()
                  self.results['summary'] = fetcher.summary()
            else:
                  if(resultType == 'POSTER'):       #get poster only
                        self.results['poster'] = fetcher.poster()
                  elif(resultType == 'SUMMARY'):    #get summary only
                        self.results['poster'] = fetcher.summary()                                                     #get both only

            
            print(self.results)
            return self.results
      
        

        