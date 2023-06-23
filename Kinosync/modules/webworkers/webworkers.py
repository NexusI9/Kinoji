#importing workers
from modules.webworkers.webworkers_workers import WORKERS

#import default config
from modules.webworkers.webworkers_config import PERSON_CONFIG

#importing analysis tools
from modules.webworkers.subprocess.fetcher import Fetcher



class Webworkers:

      """
      Webworkers uses a config file as well as various workers to fetch data from the web.
      The Workers either use a API or a Web Scrapping approach to get data.
      The Webworkers can either fetch a summary (string) or a poster (URL / BASE64 depending of confing).
      """

      def __init__(self, payload={}, config=PERSON_CONFIG, resultType='BOTH'):
            
            self.payload = payload
            self.config = config
            self.resultType = resultType
            self.workers = WORKERS;
            self.results = {
                  "summary":{},
                  "poster":{}
            }
        
      def process(self):

            #fetch data
            fetcher = Fetcher(self.payload, self.config)

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
                        self.results['poster'] = fetcher.summary()

            
            print(self.results)
            return self.results
      
        

        