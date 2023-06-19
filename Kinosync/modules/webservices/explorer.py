#importing workers
from modules.webservices.explorer_workers import WORKERS

#import default config
from modules.webservices.explorer_config import PERSON_CONFIG

#importing analysis tools
from modules.webservices.tools.fetcher import Fetcher



class Explorer:

      """
      Explorer use a config file as well as various workers to fetch data from the web.
      The Workers either use a API or a Web Scrapping approach to get data.
      The Explorer can either fetch a summary (string) or a poster.
      """

      def __init__(self, subject={}, config=PERSON_CONFIG, resultType='BOTH'):
            
            self.subject = subject
            self.sources = None
            self.config = config
            self.resultType = resultType

            try:
                  self.sources = config['workers']
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
                  resultType = self.config['type']
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
      
        

        