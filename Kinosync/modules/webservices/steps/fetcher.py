from modules.webservices.lib.workers import WORKERS

class Fetcher():

    def __init__(self, subject, sources, config):
        self.subject = subject
        self.sources = sources
        self.config = config
    
    def thread(self, type, callback):
        result = {}

        for source in self.sources:
                print('\n')
                serviceResult = None
                try:
                    if(not WORKERS[source]):
                         print('The %s Worker couldn\'t be found')
                         continue    
                    
                    serviceResult = callback( WORKERS[source]() )
                except:
                    print('PASS: Couldn\'t get %s from %s' % (type, source))
                finally:
                    if(serviceResult):
                            result[source] = serviceResult
        
        print('\n')
        return result
         
        
    def summary(self):
        return self.thread( 'summary', lambda e : e.summary(self.subject))
    
    def poster(self):
        return self.thread( 'poster', lambda e : e.poster(self.subject))