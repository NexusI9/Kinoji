from lib.utils import downloadPicture, resizePicture, getFirstItem

class Filter:

    def __init__(self, payload, config):
        self.payload = payload
        self.config = config
        

    def init(self):

        #1. result selection
        for key in self.config.keys():

            currentValue = self.payload[key]
            if(not currentValue):
                continue
            try:
                filterMethod = self.config[key]['filter']
            except:
                filterMethod = 'BY_ORDER'
            finally:
                #replace current key (poster or summary) by first item or array in config
                self.payload[key] = {
                    'BY_ORDER': lambda pl: getFirstItem(pl) #select by order of array (output 1st item of the result)
                }[filterMethod](currentValue)


        #2. download
        for key in self.config.keys():

            currentValue = self.payload[key]
            if(not currentValue):
                continue
            try:
                downloadPath = self.config[key]['download']
            except Exception as er:
                print(er) #no output set
            else:
                self.payload[key] = downloadPicture(currentValue, downloadPath, self.payload['id'])
        
        #3. resize
        for key in self.config.keys():

            currentValue = self.payload[key]
            if(not currentValue):
                continue
            try:
                resizeValue = int(self.config[key]['resize'])
            except Exception as er:
                print(er)
            else:
                self.payload[key] = resizePicture(currentValue, (resizeValue, resizeValue))

        return self.payload


    