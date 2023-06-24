import requests
from PIL import Image
import os

class Filter:

    def __init__(self, payload, config):
        self.payload = payload
        self.config = config

    def getFirstItem(self,obj):
        print(obj)
        return list(obj.values())[0]
    
    def resizePicture(self, path, maxSize=(300,300) ):

        print(f'Resizing picture to {maxSize[0]}')
        #convert to webp and resize
        image = Image.open(path)
        image.thumbnail(maxSize, Image.Resampling.LANCZOS)
        webName = f'{os.path.splitext(path)[0]}.webp'
        image.save(webName,'WEBP')
        print(f'Picture successfuly saved to: {webName}')
        os.remove( path )
        print(webName)
        return webName


    def downloadPicture(self, url, directory, id):
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
        else:
            return fullpath
        

    def init(self):

        #1. result selection
        for key in self.config.keys():
            
            currentValue = self.payload[key]
            try:
                filterMethod = self.config[key]['filter']
            except:
                filterMethod = 'BY_ORDER'
            finally:
                #replace current key (poster or summary) by first item or array in config
                self.payload[key] = {
                    'BY_ORDER': lambda pl: self.getFirstItem(pl) #select by order of array (output 1st item of the result)
                }[filterMethod](currentValue)


        #2. download
        for key in self.config.keys():

            currentValue = self.payload[key]
            try:
                downloadPath = self.config[key]['download']
            except Exception as er:
                print(er) #no output set
            else:
                self.payload[key] = self.downloadPicture(currentValue, downloadPath, self.payload['id'])
        
        #3. resize
        for key in self.config.keys():

            currentValue = self.payload[key]
            try:
                resizeValue = int(self.config[key]['resize'])
            except Exception as er:
                print(er)
            else:
                self.payload[key] = self.resizePicture(currentValue, (resizeValue, resizeValue))

        return self.payload


    