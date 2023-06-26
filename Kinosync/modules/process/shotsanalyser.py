
#AI detection and color swatch of shots

import os
import re
from lib.utils import config, clear, beautyprint
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
        return os.path.join(SHOTS_PATH,folder)

    def analyseFolder(self, id, folder):

        print("Scanning folder: %s" % (folder))

        
        fullPath = self.folderToFullpath(folder)

        #list dir and filter pictures
        shots = filter(lambda item: bool(re.search('.(png|webp|jpg|jpeg)', item)), os.listdir(fullPath)) 

        for pic in shots:

            picFullPath = os.path.join(fullPath, pic)                
            subjects = None
            #subjects = Classifier().getSubject(picFullPath)
            colours = Palette().getColours(picFullPath)

            result = {
                "folder": folder,
                "id": id,
                "shot": os.path.splitext(pic)[0],
                "subjects": ';'.join(subjects) if subjects else None,
                "colours": ';'.join(colours) if colours else None
            }

            beautyprint(result)
            self.connector.update("aesthetics",result)

    
    def start(self):
        
        clear()
        idSelection = input("\n\nType an ID to analyze (enter to analyse all registered directories) \n => ")

        folders = self.connector.getJSON("""SELECT folder, id FROM movies""")
        if(len(idSelection)):
            folders = self.connector.getJSON("""SELECT folder, id FROM movies WHERE id = %s""", [idSelection])
       
        if(not len(folders)):
            print('No movie was found please enter a valid ID')
            return self.start()
        else:
            for mv in folders:
                if(os.path.isdir(self.folderToFullpath(mv['folder']))): #check if folder exists on computer
                    self.analyseFolder(mv['id'],mv['folder'])
                else:
                    print("%s directory not found" % (mv['folder']))
                    continue




    
