import re
from modules.webworkers.lib.prompts import PROMPTS
from modules.webworkers.lib.webdriver import Webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys


class Perplexity:

    def __init__(self):

        self.url = "https://www.perplexity.ai/"
        return None
    

    def query(self, prompt, timeout = 10, responseTimeout=30):
        
        print('Query in perplexity AI')
        self.driver = Webdriver()

        self.driver.get(self.url)
        result=None
        sources=None

        #getting text area
        textarea = self.driver.find_elements_by_CSS("textarea")[0]
        textarea.send_keys(prompt)
        textarea.send_keys(Keys.ENTER)
        
        #wait until bottom bar appear (meaning text got sent to be treated)
        try:
            count = len(self.driver.find_elements_by_CSS(".-ml-sm")) + 1 
            WebDriverWait(self.driver, timeout).until(lambda driver: len(driver.find_elements_by_CSS(".prose")) == 1) #wait until prose (response appear)
        except Exception as er:
            print(er)
        else:
            print('Pass first query step')

        #wait until share and suggestions are done being append in the DOM
        try:
            WebDriverWait(self.driver, responseTimeout).until(
                (lambda driver: len(driver.find_elements_by_CSS(".-ml-sm")) == count and
                EC.visibility_of(driver.find_elements_by_CSS(".-ml-sm")[count-1]))
            )
        except Exception as er:
            print(er) 
        else:
            print('Pass second query step')


        sources= self.driver.find_elements_by_CSS(".mt-xs a")
        sources = map(lambda a : a.get_attribute('href'), sources)

        result = self.driver.find_element_by_CSS(".prose")
        #print(result.text)
        #print(list(sources))
        

        return {
            "content":result.text,
            "sources":list(sources)
            }
    
    def remplacePromptVariables(self, payload, prompt):
        #detect all the {myword} within the prompt and replace it with the corressponding key from the payload

        # Use regular expression to find words between curved brackets
        pattern = r"\{(\w+)\}"
        # Find all matches in the text
        matches = re.findall(pattern, prompt)

        for word in matches:
            if(not payload[word]):
                print('Couldn\'t resolve and replace the key %s' % (word))
                return None
            
            prompt = prompt.replace('{%s}' % (word), payload[word])

        print('Successfuly alterate the prompt following keys: %s' % (' | '.join(matches)))
        return prompt



    def summary(self, payload):

        prompt =  None

        try:
            prompt = payload['prompt']
        except:
            prompt = "BIOGRAPHY"

        if(not PROMPTS[prompt]):
            print('Couldn\'t find any Prompt under the key %s. \n Check the prompts available at lib/prompts' % (prompt))
            return None
    
        newPrompt  = self.remplacePromptVariables(payload, PROMPTS[prompt])
        result = self.query(newPrompt)

        self.driver.quit()

        return result

