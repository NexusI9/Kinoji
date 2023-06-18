import re
import base64
import time
from webservices.lib.prompts import BIOGRAPHY_PROMPT


class Perplexity:

    def __init__(self):
        return None

    def summary(self, person):

        name = person['name']
        job = person['job']
        
        print("\nSearching for %s..." % (name) )
        newPrompt  = BIOGRAPHY_PROMPT.replace('{job}',job).replace('{name}',name)
        result = None

        try:
            result = ppl.query(newPrompt, follow_up=True)
        except:
            print("Error while processing %s" % (name) )
            print('Waiting 30 seconds before retrying...')
            time.sleep(30)
 

        if(result):
            paragraph = re.search('(?<=BEGIN)(.*?)(?=FROM)',result, flags=re.S)
            print("\n\n PARAGRAPH:")
            print(paragraph.group())
            return
            sources = re.search('(?<=FROM:)(.*?)(?=END)',result, flags=re.S)
            print(sources)
            if(sources):
                sources = sources.group().split(";")
                print("\n\n SOURCES:")
                print(sources)
                for s in range(len(sources)):
                    sources[s] = base64.b64decode( sources[s] )
                
                ';'.join(sources)
                print(sources)

