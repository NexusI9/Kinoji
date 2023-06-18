import wikipedia as Wiki
import difflib


class Wikipedia:

    def __init__(self):
        return None
    
    def approximate_string_match(self, urls, key):
        best_match = None
        best_ratio = 0

        for url in urls:
            url_key = url.split('/')[-1].split('.')[0].replace('_', ' ').title()
            similarity_ratio = difflib.SequenceMatcher(None, url_key, key).ratio()

            if similarity_ratio > best_ratio:
                best_ratio = similarity_ratio
                best_match = url

        return best_match
        
    def url(self, name):
         return Wiki.page(name,auto_suggest=False).url
    
    def summary(self, name):
        Wiki.summary(name,auto_suggest=False)
        return name
    
    def poster(self, name):
        src=None
        page= Wiki.WikipediaPage(name)

        if(page):
            print('[Wikipedia > poster] found page')
            images = page.images
            print('[Wikipedia > poster] found %s pictures' % ( len(images) ))

            matched_url = self.approximate_string_match(images, name)
            if(matched_url):
                 print('[Wikipedia > poster] Found url matching %s: \n=> %s' % (name, matched_url) )
                 src=matched_url
            else:
                print('[Wikipedia > poster] Couldn\'t find any url that satisfies %s \n Wikipedia page: %s ' % (name, page.url) )

        return src
