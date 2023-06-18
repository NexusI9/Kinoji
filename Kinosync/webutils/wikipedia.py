import wikipedia as Wiki
from lib.utils import approximate_string_match

class Wikipedia:

    def __init__(self):
        return None

        
    def url(self, name):
         return Wiki.page(name,auto_suggest=False).url
    
    def summary(self, name):
        Wiki.summary(name,auto_suggest=False)
        return name
    
    def poster(self, name):
        src=None
        page= Wiki.WikipediaPage(name)

        if(page):
            print('[Wikipedia > poster]\tFound page')
            images = page.images
            print('[Wikipedia > poster]\tFound %s pictures' % ( len(images) ))

            matched_url = approximate_string_match(images, name)
            if(matched_url):
                 print('[Wikipedia > poster]\tFound url matching %s: \n=> %s' % (name, matched_url) )
                 src=matched_url
            else:
                print('[Wikipedia > poster]\tFAILURE: Couldn\'t find any url that satisfies %s \n Wikipedia page: %s ' % (name, page.url) )

        return src
