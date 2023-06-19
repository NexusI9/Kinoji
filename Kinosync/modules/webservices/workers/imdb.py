from tmdbv3api import Person
from modules.webservices.lib.tmdbapi import tmdb
from modules.webservices.lib.webdriver import Webdriver
from lib.utils import approximate_string_match

class Imdb:

    def __init__(self):
        return None

    def imdbID(self, id):
        return Person().details(id)['imdb_id']
    
    def url(self, id):
        return "https://www.imdb.com/name/%s" % (id)
    
    def summary(self, subject):

        id = subject['id']
        name = subject['name']
        summary = None


        if(not name or not id):
            print('[TMDB > Summary] Couldn\'t statisfy all the keys from the subject. \n Required keys: name | id')
            return None

        imdbID = self.imdbID(id)
        url = "%s/bio/" % (self.url(imdbID))
        
        if(imdbID):
            print('[IMDB > summary] URL: %s' % (url))

            driver = Webdriver()
            driver.get(url)
            #1. get UL elements
            containers = driver.find_elements_by_tagName('div') 

            #2. get element with attribute data-testid
            for div in containers:
                testid = div.get_attribute('data-testid')
                if(testid and 'mini_bio' in testid and div.text):
                        #3. get text of div
                        print('[IMDB > Summary] Found content for %s' % (name))
                        summary = div.text

            driver.quit()
        else:
            print('[IMDB > poster] FAILURE: Couldn\'t find any imdb_id for %s' % (name))

        return {
            "content": summary,
            "sources":[url]
        }
    
    def poster(self,person):


        name=person['name']
        id=person['id']
        imdbID = self.imdbID(id)
        src=None

        if(imdbID):
            print('[IMDB > poster]\tFound imdb_id: %s' % (imdbID))

            url = self.url(imdbID)
            print('[IMDB > poster] URL: %s' % (url))
            driver = Webdriver()

            driver.get( url )
            images = driver.find_elements_by_tagName('img')

            if(images):
                print('[IMDB > poster]\tFound %s img elements in the page' % (len(images)))
                arrayImg = []
                for img in images:
                    arrayImg.append({"alt":img.get_attribute('alt'), "src":img.get_attribute('src')})
                
                altOnly = map(lambda ar : ar['alt'], arrayImg)
                match_key = approximate_string_match(altOnly, name)
                if(match_key):
                    match_img = filter( lambda ar : ar['alt'] == match_key, arrayImg )
                    src = list(match_img)[0]['src']
                    print('[IMDB > poster]\tFound a src with the alt attribute close to %s: \n=> %s' % (name,src))
                else:
                    print('[IMDB > poster]\tFAILURE: Couldn\'t find any similar alt attribute to %s' % (name))

            else:
                print('[IMDB > poster]\tFAILURE: Couldn\'t find any img elements in the page')

        else:
            print('[IMDB > poster] FAILURE: Couldn\'t find any imdb_id for %s' % (name))

        driver.quit()

        return src