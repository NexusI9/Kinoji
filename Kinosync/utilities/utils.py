#UTILS

import json

class Utils:

    def __init__():
        return

    def GET_CONFIG(var):
        temp = None;
        with open('./config.json', 'r') as config:
            data = json.load(config)
            temp = data[var]
            config.close()
        return temp
