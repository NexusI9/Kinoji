from modules.webservices.lib.webdriver import Webdriver


class AsianWiki:

    def __init__(self):
        return None;

    def url(self,name):
        return "https://asianwiki.com/%s" % (name.replace(' ','_'))
    
    def poster(self, payload):

        driver = Webdriver()

        src = None
        name = payload['name']
        url = self.url(name)

        if(not name):
            print('[TMDB > Summary] Couldn\'t statisfy all the keys from the payload. \n Required key: name')
            return None

        print('[AsianWiki > poster] URL: %s' % (url))
        driver.get(url)  

        #1 get element by class thumbimage (direct target)
        poster = driver.find_element_by_className("thumbimage")
        
        if(poster):
            src = poster.get_attribute('src')
            print('[AsianWiki > poster] Picture found: \n=> %s' % (src))
        else:
            print('[AsianWiki > poster] FAILURE: No poster found.')

        driver.quit()

        return src