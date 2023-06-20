import re
import base64
import time
from modules.webservices.lib.prompts import PROMPTS


class Perplexity:

    def __init__(self):
        return None
    
    def remplacePromptVariables(self, payload, prompt):
        # Use regular expression to find words between curved brackets
        pattern = r"\{(\w+)\}"
        # Find all matches in the text
        matches = re.findall(pattern, prompt)

        for word in matches:
            if(not payload[word]):
                print('[Perplexity > Summary > Prompt alterate] Couldn\'t resolve and replace the key %s' % (word))
                return None
            
            prompt.replace('{%s}' % (word), payload[word])

        print('[Perplexity > Summary > Prompt alterate] Successfuly alterate the prompt variables')
        return prompt

    def summary(self, payload):

        result = None

        prompt =  None
        try:
            prompt = payload['prompt']
        except:
            prompt = "BIOGRAPHY"

        if(not PROMPTS[prompt]):
            print('[Perplexity > Summary] Couldn\'t find any Prompt under the key %s. \n Check the prompts available at lib/prompts' % (prompt))
            return None
    

        newPrompt  = self.remplacePromptVariables(payload, PROMPTS[prompt])

        print(newPrompt)

        return {
            "content":result,
            "sources":""
            }

