class Fetcher:

    def __init__(self, person, services):
        self.person = person
        self.services = services
        
    def summary(self):
        return True
    
    def poster(self):
        posters = {}

        for service in self.services:
                print('\n')
                servicePoster = None
                try:    
                    servicePoster = self.services[service]().poster(self.person)
                except:
                    print('PASS:\tCouldn\'t get poster from %s (method doesn\'t exist?)' % (service))
                    break
                finally:
                    if(servicePoster):
                            posters[service] = servicePoster
        print('\n')
        print(posters)

        #result = base64.b64encode(requests.get(src).content)
        return posters