
from webutils.webdriver import Driver
from selenium.webdriver.common.by import By


class AsianWiki:

    def __init__(self):
        return None;

    def url(self,name):
        return "https://asianwiki.com/%s" % (name.replace(' ','_'))
    
    def poster(self, name):

        url = self.url(name)
        print('[AsianWiki > poster]\tURL: \t%s' % (url))
        Driver.get( url )

        #1 get element by class thumbimage (direct target)
        poster = Driver.find_element(By.CLASS_NAME, "thumbimage")
        src = None

        if(poster):
            src = poster.get_attribute('src')
            print('[AsianWiki > poster]\tPicture found: \n=> %s' % (src))
        else:
            print('[AsianWiki > poster]\tFAILURE: No poster found.')
        
        Driver.quit()

        return src