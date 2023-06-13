from perplexity_api import PerplexityAPI, TimeoutException
import openai
import re
import base64
import time
ppl = PerplexityAPI()

openai.api_key = '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'


BIOGRAPHY_PROMPT = """
    Write BEGIN and do a line break.
    Then write a mid-length paragraph about the {job} {director}. 
    Use a formal and neutral tone. The paragraph should suit an audience well educated about cinema and can include technical terms as well as in-depth insights.
    For every foreign movie titles, foreign people names, foreign cities names such as chinese, japanese, arabic, hebrew or russian names, city, title: write the original name in its original language in parenthesis next to it. 
    As instance Wong Kar-Wai is a chinese name translated in english, so you should write next to it the original name (王家衛).
    
    This short paragraph should include each of the following list items:
    - the person name.
    - the person nationality.
    - the person date of birth.
    - the person education background.
    - the person inspiration and mentor.
    - a short description of the person career path.
    - the person major collaboration with other directors, artists or actors.
    - the main characteristics of the person movies.
    - what the person is known for.
    - the person contribution to the cinema industry.

    The paragraph can also eventually include the following information if they are relevent. If the following information are not relevent, then do not include it:
    - if there are notable controversy include it too, else don't write anything about the controversy.
    - if the person is dead: the person date and location of death.

    Finally, it's mandatory to include at the end of the paragraph FROM followed by a line break and write down without formatting every URLs from which you picked those information. The URLS should imperatively be encoded in base64. Do not write them in a list, all the URL should be written without formatting, they should be written on one line and be separated by a semi-colon.
    Do a line break and write END
"""

def perplex(name, job):

    print("\nSearching for %s..." % (name) )
    newPrompt  = BIOGRAPHY_PROMPT.replace('{job}',job).replace('{name}',name)
    result = None

    try:
        result = ppl.query(newPrompt, follow_up=True)
    except TimeoutException:
        print("Query timed out for %s" % (name) )
    except:
        print("Error while processing %s" % (name) )
        print('Waiting 30 seconds before retrying...')
        time.sleep(30)
        perplex(name, job)

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


def openAI(name, job):
    newPrompt  = BIOGRAPHY_PROMPT.replace('{job}',job).replace('{name}',name)
    response = openai.Completion.create(
      engine="davinci-instruct-beta-v3",
      prompt=newPrompt,
      temperature=0.7,
      max_tokens=100,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0
    )

    return response['choices'][0]['text']

print( openAI('Wong Kar-Wai', 'director') )