from modules.webservices.explorer_workers import WORKERS

class Fetcher():

    def __init__(self, payload, sources, config):
        self.payload = payload
        self.sources = sources
        self.config = config
    
    def thread(self, type, callback):
        result = {}

        for source in self.sources:
                print('\n')
                print('------------------')
                print('[%s > %s]' % (source, type))
                serviceResult = None
                custom = None
                payload = self.payload

                #check if workers of current source is subscribed
                try:
                    if(not WORKERS[source]):
                         print('The %s Worker couldn\'t be found, make sure you\'ve added it to lib/workers')
                         continue    
                    
                    #check if custom arguments
                    try:
                         custom = self.config[type]['custom'][source]
                    except:
                         pass
                    else:
                         payload = custom(payload)

                    serviceResult = callback( WORKERS[source](),  payload)

                except:
                    print('PASS: Couldn\'t get %s from %s' % (type, source))
                finally:
                    if(serviceResult):
                            result[source] = serviceResult
        
        print('\n')
        return result
         
        
    def summary(self):
        return self.thread( 'summary', lambda worker, payload : worker.summary(payload))
    
    def poster(self):
        return self.thread( 'poster', lambda worker, payload : worker.poster(payload))