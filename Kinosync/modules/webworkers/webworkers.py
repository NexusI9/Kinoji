#importing workers
from modules.webworkers.webworkers_workers import WORKERS

#import default config
from modules.webworkers.webworkers_config import PERSON_CONFIG

#importing analysis tools
from modules.webworkers.subprocess.fetcher import Fetcher
from modules.webworkers.subprocess.filter import Filter



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
            self.results = {**self.payload}
        
      def process(self):

            #1. fetch data
            fetcher = Fetcher(self.payload, self.config)
      
            for key in self.config:
                  try:
                        self.results[key] = {
                              'poster': fetcher.poster,
                              'summary': fetcher.summary
                              }[key]()
                  except:
                        continue

            print('Fetching done')
            
            #2. filter and convert overall data
            self.results = Filter(self.results, self.config).init()

            return self.results
      
        

        