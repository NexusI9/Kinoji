from lib.utils import config


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
            "resize":"300", 
            "download": config('PEOPLES_POSTERS_PATH')
      }
}




#Get History events info and poster
HISTORY_CONFIG = {
      "summary":{
            "workers": ["wikipedia","perplexity"],
            "prompt":"HISTORY",
            "filter":"SYNTHETISE",
            "custom":{
                "perplexity": lambda payload : {**payload, "prompt":"HISTORY"}
            }
      }
}