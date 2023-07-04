
#AI detection and color swatch of shots

import os
import re
import sys
from lib.utils import config, clear, beautyprint, getDateTime
from modules.process.lib.connector import Connector
from modules.process.lib.palette import Palette
#from modules.process.lib.classifier import Classifier

SHOTS_PATH = config("SHOTS_PATH")
USERNAME = config("USERNAME")
HOSTNAME = config("HOSTNAME")
PASSWORD = config("PASSWORD")
DTBNAME = config("DTBNAME")



class ShotsAnalyser:

    def __init__(self):
        self.connector = Connector(HOSTNAME, USERNAME, PASSWORD, DTBNAME)
        return
    
    def folderToFullpath(self,folder):
        return os.path.join(SHOTS_PATH,folder,'thumbnails')

    def scanFolder(self, id, folder):

        print("Scanning thumbnails folder: %s" % (folder))

        fullPath = self.folderToFullpath(folder)

        #list dir and filter pictures
        shots = filter(lambda item: bool(re.search('.(png|webp|jpg|jpeg)', item)), os.listdir(fullPath)) 

        for pic in shots:

            picFullPath = os.path.join(fullPath, pic)                
            subjects = None
            #subjects = Classifier().getSubject(picFullPath)
            colours = Palette(maxColor=6).getColours(picFullPath)

            result = {
                "folder": folder,
                "id": id,
                "name": os.path.splitext(pic)[0],
                "subjects": ';'.join(subjects) if subjects else None,
                "colours": ';'.join(colours) if colours else None,
                "last_update": getDateTime()
            }

            beautyprint(result)
            self.connector.update("shots",result)

    def analyse(self, id=None):
        print(id)
        folders = self.connector.getJSON("""SELECT folder, id FROM movies""")
        if(id):
            folders = self.connector.getJSON("""SELECT folder, id FROM movies WHERE id = %s""", [id])
       
        if(not len(folders)):
            print('No movie was found please enter a valid ID')
            return self.start()
        else:
            for mv in folders:
                if(os.path.isdir(self.folderToFullpath(mv['folder']))): #check if folder exists on computer
                    self.scanFolder(mv['id'],mv['folder'])
                else:
                    print("%s directory not found" % (mv['folder']))
                    continue
        
    def newMovies(self):
        
        movies = self.connector.getJSON("""SELECT DISTINCT id, folder from movies""")
        
        shotsID = [s[0] for s in self.connector.execute("""SELECT DISTINCT id from shots""")]
        moviesID = [mv['id'] for mv in movies]

        missingID = [id for id in moviesID if id not in shotsID]
        movies = [mv for mv in movies if mv['id'] in missingID]

        if(len(movies)):
            print("Movies yet to be analysed:")
            [print('+ {:10} {:20}'.format(mv['id'], mv['folder'])) for mv in movies]
            userAdd = input("\nScan the above movies? (y/n)\n=> ")
            if(userAdd == 'y' or not len(userAdd)):
                [self.analyse(mv['id']) for mv in movies]
                
        return

    
    def start(self):
        
        clear()
        print("""Do you wish to update: \n
[ 1 ] - Newly added movies \n
[ 2 ] - Specific movie ID\n
[ 3 ] - All the shots (brute update)\n
(0 to quit)\n""")
 
        {
            '0': lambda: sys.exit(),
            '1': lambda: self.newMovies(),
            '2': lambda: self.analyse( input("\nPlease enter movie ID:\n=>") ),
            '3': lambda: self.analyse()
        }[input("=> ")]()
                            
        return




    
