class Fetcher():

    def __init__(self, subject, services, sources):
        self.subject = subject
        self.sources = sources
        self.services = services
    
    def thread(self, type, callback, sources):
        result = {}

        for source in sources:
                print('\n')
                serviceResult = None
                try:    
                    serviceResult = callback( self.services[source]() )
                except:
                    print('PASS: Couldn\'t get %s from %s' % (type, source))
                finally:
                    if(serviceResult):
                            result[source] = serviceResult
        
        print('\n')
        return result
         
        
    def summary(self):
        return self.thread( 'summary', lambda e : e.summary(self.subject), self.sources )
    
    def poster(self):
        return self.thread( 'poster', lambda e : e.poster(self.subject), self.sources )