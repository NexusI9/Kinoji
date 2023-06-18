class Fetcher:

    def __init__(self, person, services):
        self.person = person
        self.services = services

    
    def thread(self, type, callback, services):
        result = {}

        for service in services:
                print('\n')
                servicePoster = None
                try:    
                    servicePoster = callback( self.services[service]() )
                except:
                    print('PASS: Couldn\'t get %s from %s' % (type, service))
                finally:
                    if(servicePoster):
                            result[service] = servicePoster
        
        print('\n')
        return result
         
        
    def summary(self):
        return self.thread( 'summary', lambda e : e.summary(self.person), self.services )
    
    def poster(self):
        return self.thread( 'poster', lambda e : e.poster(self.person), self.services )