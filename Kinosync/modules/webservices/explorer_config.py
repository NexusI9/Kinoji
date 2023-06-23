#Get personnalities info and poster
#["tmdb","mubi","imdb","wikipedia","asianwiki","perplexity"]
PERSON_CONFIG = {
      "summary":{
            "workers": ["perplexity"],
            "method":"SINTHETIZE",
            "prompt": "BIOGRAPHY",
            "keywords":{
                  "avoid":["football"],
                  "include":["cinema"] 
            },
            "custom":{
                  "perplexity": lambda payload: {**payload,  "prompt":'BIOGRAPHY'}
            }
      },
      "poster":{
            "workers": ["tmdb","mubi","imdb","wikipedia","asianwiki"],
            "method":"MANUAL",
            "size":"300", 
            "encode":"BASE64"
      }

}



#Get History events info and poster
HISTORY_CONFIG = {
      "type": "SUMMARY",
      "summary":{
            "workers": ["wikipedia","perplexity"],
            "prompt":"HISTORY",
            "method":"SYNTHETISE",
            "custom":{
                "perplexity": lambda payload : {**payload, "prompt":"HISTORY"}
            }
      }
}