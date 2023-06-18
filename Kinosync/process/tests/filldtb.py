
from lib.connector import Connector
from lib.utils import config
import json

USERNAME = config("USERNAME")
HOSTNAME = config("HOSTNAME")
PASSWORD = config("PASSWORD")
DTBNAME = config("DTBNAME")

connection = Connector(HOSTNAME,USERNAME,PASSWORD,DTBNAME)
path = "../data/webcolors.json"

def set_group():
    with open(path,'r') as file:
        data = json.load(file)
        count = 0
        for color in data['colors']:
            print('\n\n')
            obj = {
                'name':color['name'],
                'hex':color['hex'],
                'rgb': str(json.dumps(color['rgb'])),
                'family': ''
            }
            for group in data['group']:
                if(count >= group['interval'][0] and count <= group['interval'][1] ):
                    obj['family'] = str(group['name'])


            print(obj)
            connection.update('colors', obj)
            count+=1

        file.close()


def fillGroup():
    with open(path,'r') as file:
        data = json.load(file)
        new_json = []
        count = 0
        for color in data['colors']:
            colorObj = {
                'name':color['name'],
                'hex': color['hex'],
                'rgb': color['rgb'],
                'family':''
            }
            for group in data['group']:
                if (count >= group['interval'][0] and count <= group['interval'][1]):
                    colorObj['family'] = group['name']

            new_json.append(colorObj)
            count+=1

    with open(path,'w') as file:
        json.dump(new_json, file, ensure_ascii=False, indent=4)
        file.close()


fillGroup()