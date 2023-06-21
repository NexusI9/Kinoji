import wikipedia as Wiki
from lib.utils import approximate_string_match

class Wikipedia:

    def __init__(self):
        return None

        
    def url(self, name):
         return Wiki.page(name,auto_suggest=False).url
    
    def summary(self, payload):
        
        name = payload['name']
        summary = Wiki.summary(name,auto_suggest=False)

        if(not name):
            print('Couldn\'t statisfy all the keys from the payload. \n Required keys: name')
            return None

        if(summary):
            print('Found content for %s' % (name))
        else:
            print('FAILURE: Couldn\'t find any content for %s' % (name))
        
        return {
            "content":summary,
            "sources":[self.url(name)]
        }
    
    def poster(self, payload):
        src=None
        name = payload['name']
        page= Wiki.WikipediaPage(name)

        if(page):
            print('Found page')
            images = page.images
            print('Found %s pictures' % ( len(images) ))

            matched_url = approximate_string_match(images, name)
            if(matched_url):
                 print('Found url matching %s: \n=> %s' % (name, matched_url) )
                 src=matched_url
            else:
                print('FAILURE: Couldn\'t find any url that satisfies %s \n Wikipedia page: %s ' % (name, page.url) )

        return src
