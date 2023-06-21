#Get personnalities info and poster
PERSON_CONFIG = {
      "workers": ["perplexity"],
      "summary":{
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
            "method":"SYNTHETISE",
            "custom":{
                "perplexity": lambda payload : {**payload, "prompt":"HISTORY"}
            }
      }
}