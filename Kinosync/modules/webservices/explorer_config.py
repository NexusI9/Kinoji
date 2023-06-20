

#Get personnalities info and poster
PERSON_CONFIG = {
      "workers": ["tmdb","imdb","mubi","wikipedia","asianwiki","perplexity"],
      "summary":{
            "method":"SINTHETIZE",
            "prompt": "BIOGRAPHY",
            "keywords":{
                  "avoid":["football"],
                  "include":["cinema"] 
            },
            "custom":{
                  "asianwiki": lambda subject : "%s (%d)" % (subject['name'], subject['job'])
            }
      },
      "poster":{
            "method":"MANUAL",
            "size":"300", 
            "encode":"BASE64"
      }

}



#Get History events info and poster
HISTORY_CONFIG = {
      "type": "SUMMARY",
      "workers": ["wikipedia","perplexity"],
      "summary":{
            "prompt":"HISTORY",
            "method":"SYNTHETISE"
      }
}