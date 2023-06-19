

#Get personnalities info and poster
PERSON_CONFIG = {
      "workers": ["tmdb","imdb","mubi","wikipedia","asianwiki","perplexity"],
      "prompt": "BIOGRAPHY_PROMPT",
      "custom":{
            "summary":{},
            "poster":{
                  "asianwiki": lambda name, job : "%s (%d)" % (name, job)
            }
      },
      "keywords":["football"],
      "resize":"300",
      "methods":{
            "summary": "SYNTHETISE",
            "poster": "MANUAL"
      }
}



#Get History events info and poster
HISTORY_CONFIG = {
      "type": "SUMMARY",
      "workers": ["wikipedia","perplexity"],
      "prompt":"BIOGRAPHY_PROMPT",
      "methods":{
            "summary": "SYNTHETISE",
      }
}