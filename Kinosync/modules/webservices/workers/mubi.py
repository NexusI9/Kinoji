from modules.webservices.lib.webdriver import Webdriver

class Mubi:


    def __init__(self):
        return None
    

    def url(self, name):
        return "https://mubi.com/cast/%s" % ( name.replace(' ','-') )


    def poster(self, payload):

        driver = Webdriver()

        src = None
        name = payload['name']

        if(not name):
            print('Couldn\'t statisfy all the keys from the payload. \n Required key: name')
            return None
        
        url = self.url(name)

        print('URL: %s' % (url))
        driver.get(url)

        #1 get all img elements
        poster = driver.find_elements_by_tagName('img')
         
        #2 check if src contains cast_member
        if(poster):
            for img in poster:
                imgSrc = img.get_attribute('src')
                if( 'cast_member' in imgSrc ):
                    src = imgSrc
                    break
            if(src):
                print('Found cast_member picture: \n=> %s' % (src))
            else:
                print('Pictures were found, but no cast_member in src.')

        else:
            print('No poster found.')
            
        driver.quit()

        return src
