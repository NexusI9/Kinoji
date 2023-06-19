import re
import base64
import time
from modules.webservices.lib.prompts import PROMPTS


class Perplexity:

    def __init__(self):
        return None
    
    def remplacePromptVariables(self, subject, prompt):
        # Use regular expression to find words between curved brackets
        pattern = r"\{(\w+)\}"
        # Find all matches in the text
        matches = re.findall(pattern, prompt)

        for word in matches:
            if(not subject[word]):
                print('[Perplexity > Summary > Prompt alterate] Couldn\'t resolve and replace the key %s' % (word))
                return None
            
            prompt.replace('{%s}' % (word), subject[word])

        print('[Perplexity > Summary > Prompt alterate] Successfuly alterate the prompt variables')
        return prompt

    def summary(self, subject, prompt="BIOGRAPHY"):

        result = None

        if(not PROMPTS[prompt]):
            print('[Perplexity > Summary] Couldn\'t find any Prompt under the key %s. \n Check the prompts available at lib/prompts' % (prompt))
            return None
    

        newPrompt  = self.remplacePromptVariables(subject, PROMPTS[prompt])


        return {
            "content":result,
            "sources":""
            }

