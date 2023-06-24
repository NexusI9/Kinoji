from modules.webworkers.webworkers_workers import WORKERS

class Fetcher():

    def __init__(self, payload, config):
        self.payload = payload
        self.config = config
    
    def thread(self, type, callback):
        result = {}

        for source in self.config[type]['workers']:
                print('\n')
                print('------------------')
                print('{:10} {:10}'.format('source', source))
                print('{:10} {:10}'.format('type', type))

                serviceResult = None
                payload = self.payload

                #check if workers of current source is subscribed
                try:
                    if(not WORKERS[source]):
                         print('The %s Worker couldn\'t be found, make sure you\'ve added it to lib/workers')
                         continue    
                    
                    #check if custom arguments
                    try:
                         customCallback = self.config[type]['custom'][source]
                    except:
                         pass
                    else:
                         payload = customCallback(payload)

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