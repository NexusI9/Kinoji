import wikipedia as Wiki
from lib.utils import approximate_string_match

class Wikipedia:

    def __init__(self):
        return None

        
    def url(self, name):
         return Wiki.page(name,auto_suggest=False).url
    
    def summary(self, person):
        
        name = person['name']
        summary = Wiki.summary(name,auto_suggest=False)

        if(not name):
            print('[TMDB > Summary] Couldn\'t statisfy all the keys from the subject. \n Required keys: name')
            return None

        if(summary):
            print('[Wikipedia > Summary] Found content for %s' % (name))
        else:
            print('[Wikipedia > Summary] FAILURE: Couldn\'t find any content for %s' % (name))
        
        return {
            "content":summary,
            "sources":[self.url(name)]
        }
    
    def poster(self, person):
        src=None
        name = person['name']
        page= Wiki.WikipediaPage(name)

        if(page):
            print('[Wikipedia > poster] Found page')
            images = page.images
            print('[Wikipedia > poster] Found %s pictures' % ( len(images) ))

            matched_url = approximate_string_match(images, name)
            if(matched_url):
                 print('[Wikipedia > poster] Found url matching %s: \n=> %s' % (name, matched_url) )
                 src=matched_url
            else:
                print('[Wikipedia > poster] FAILURE: Couldn\'t find any url that satisfies %s \n Wikipedia page: %s ' % (name, page.url) )

        return src
