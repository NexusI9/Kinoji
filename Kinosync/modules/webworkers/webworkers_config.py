
PERSON_CONFIG = {
      "summary":{
            "workers": ["perplexity"],
            "filter":"BY_ORDER",
            "prompt": "BIOGRAPHY",
            "custom":{
                  "perplexity": lambda payload: {**payload,  "prompt":'BIOGRAPHY'}
            }
      },
      "poster":{
            "workers": ["tmdb","mubi","imdb","wikipedia","asianwiki"],
            "filter":"BY_ORDER",
            "size":"300", 
            "output":"DOWNLOAD"
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