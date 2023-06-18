from webservices.webdriver import Driver
from selenium.webdriver.common.by import By


class Mubi:


    def __init__(self):
        return None
    

    def url(self, name):
        return "https://mubi.com/cast/%s" % ( name.replace(' ','-') )


    def poster(self, name):
        src = None
        url = self.url(name)

        print('[Mubi > poster] url: \t%s' % (url))
        Driver.get(url)

        #1 get all img elements
        poster = Driver.find_elements(By.TAG_NAME,'img')
         
        #2 check if src contains cast_member
        if(poster):
            for img in poster:
                imgSrc = img.get_attribute('src')
                if( 'cast_member' in imgSrc ):
                    src = imgSrc
                    break
            if(src):
                print('[Mubi > poster] Found cast_member picture: \n=> %s' % (src))
            else:
                print('[Mubi > poster] Pictures were found, but no cast_member in src.')

        else:
            print('[Mubi > poster] No poster found.')
            
        Driver.quit()

        return src
