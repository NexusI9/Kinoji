#UTILS

import json

class Utils:

    def __init__():
        return

    def CONFIG(var):
        temp = None;
        with open('/Users/elkhantour/Sites/Kinoji/Kinosync/config.json', 'r') as config:
            data = json.load(config)
            temp = data[var]
            config.close()
        return temp
