

PERSON_CONFIG = {
      "fetching": {
            "workers": ["tmdb","imdb","mubi","wikipedia","asianwiki","perplexity"],
            "custom":{
                  "summary":{},
                  "poster":{
                        "asianwiki": lambda name, job : "%s (%d)" % (name, job)
                  }
            },
      },
      "filtering":{
            "keywords":{
                  "avoid":["football"]
            }
      },
      "fusioning":{
            "methods":{
                  "summary": "SYNTHETISE",
                  "poster": "MANUAL"
            }
      }
}