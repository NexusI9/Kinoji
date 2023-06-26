#UTILS

import json
import difflib
import os
import datetime
import requests
from PIL import Image
import hashlib


def config(var):
    temp = None;
    with open('/Users/elkhantour/Sites/Kinoji/Kinosync/config.json', 'r') as config:
        data = json.load(config)
        temp = data[var]
        config.close()
    return temp


def approximate_string_match(urls, key):
    best_match = None
    best_ratio = 0

    for url in urls:
        url_key = url.split('/')[-1].split('.')[0].replace('_', ' ').title()
        similarity_ratio = difflib.SequenceMatcher(None, url_key, key).ratio()

        if similarity_ratio > best_ratio:
            best_ratio = similarity_ratio
            best_match = url

    return best_match


def clear():
    os.system('clear')


def beautyprint(obj):
    for key in obj.keys():
        print('{:<14} {:<40}'.format(key, obj[key] or ''))

def getDateTime():
    # Get the current date and time
    current_datetime = datetime.datetime.now()

    # Format the datetime object as a string in the desired format
    formatted_datetime = current_datetime.strftime('%Y-%m-%d %H:%M:%S')
    return formatted_datetime


def resizePicture(path, maxSize=(300,300) ):

    print(f'Resizing picture to {maxSize[0]}')
    #convert to webp and resize
    image = Image.open(path)
    image.thumbnail(maxSize)
    webName = f'{os.path.splitext(path)[0]}.webp'
    image.save(webName,'WEBP')
    print(f'Picture successfuly saved to: {webName}')
    os.remove( path )
    return webName


def downloadPicture(url, directory, id):
    print(f'Downloading picture at {url}')
    try: 
        # Download the image from the URL
        response = requests.get(url)
        response.raise_for_status()
        
        # Get image extension
        extension = os.path.splitext(url)[1]
        fullpath = os.path.join(directory,f'{id}{extension}')

        # Save the downloaded image to the specified location
        with open(fullpath, 'wb') as file:
            file.write(response.content)

        return fullpath
    except Exception as er:
        print(er)
        return None
    
def getFirstItem(obj):
    return list(obj.values())[0]

def md5(path):
    if(os.path.exists(path)):
        with open(path, 'rb') as file:
            # Read the file in binary mode
            data = file.read()

            # Calculate the MD5 hash
            md5 = hashlib.md5(data).hexdigest()
            return md5
    else:
        return None

