#AI detection and color swatch of shots


import os
import json
from utilities.utils import Utils
from imageai.Classification import ImageClassification
from colorthief import ColorThief
import ssl
import webcolors
from utilities.connector import Connector

ssl._create_default_https_context = ssl._create_unverified_context
model_path = Utils.GET_CONFIG("MODEL_PATH")
shots_path = Utils.GET_CONFIG("SHOTS_PATH")
movie_dtb = Utils.GET_CONFIG("MOVIE_PATH")
color_path = Utils.GET_CONFIG("COLOR_PATH")


USERNAME = Utils.GET_CONFIG("USERNAME")
HOSTNAME = Utils.GET_CONFIG("HOSTNAME")
PASSWORD = Utils.GET_CONFIG("PASSWORD")
DTBNAME = Utils.GET_CONFIG("DTBNAME")

class Palette:

    def __init__(self,file):
        self.picture = file
        self.maxColor = 2

    def closest_colour(self, requested_colour):
        min_colours = {}
        for key, name in webcolors.CSS3_HEX_TO_NAMES.items():
            r_c, g_c, b_c = webcolors.hex_to_rgb(key)
            rd = (r_c - requested_colour[0]) ** 2
            gd = (g_c - requested_colour[1]) ** 2
            bd = (b_c - requested_colour[2]) ** 2
            min_colours[(rd + gd + bd)] = name
        return min_colours[min(min_colours.keys())]

    def get_colour_name(self, requested_colour):
        try:
            closest_name = actual_name = webcolors.rgb_to_name(requested_colour)
        except ValueError:
            closest_name = self.closest_colour(requested_colour)
        return closest_name

    def simplified(self,color):
        with open(color_path, 'r') as c:
            data = json.load(c)
            for json_color in data:
                if( json_color['name'].lower() == color.lower()):
                    return json_color['family']
            c.close()
        return color



    def getColor(self):
        color_array = []
        color_thief = ColorThief(self.picture)
        palette = color_thief.get_palette(color_count=self.maxColor)
        for rgb in palette:

            color_array.append( self.simplified( self.get_colour_name(rgb) ) )

        #remove doublon
        color_array = list( dict.fromkeys(color_array) )
        print(color_array)
        return color_array



class Classifier:

    def __init__(self):
        print("\n\nMode 3: Update Image AI recognition database")
        self.threshold = 10
        self.connector = Connector(HOSTNAME, USERNAME, PASSWORD, DTBNAME)


    def jsonColorDtb(self,path):
        with open(path,'r') as f:
            return json.load(f)
            f.close()

    def setModel(self,modelPath):
        self.prediction = ImageClassification()
        self.prediction.setModelTypeAsDenseNet121()
        self.prediction.setModelPath(modelPath)
        self.prediction.loadModel()


    def analyze(self, file):
        print("[...] Scanning : "+file)

        shot_json = {
            "subjects": [],
            "colours":[]
        }


        #GET IMAGE RECOGNITION
        prediction, proba =  self.prediction.classifyImage(file, result_count=5 )
        for eachPrediction, eachProba in zip(prediction, proba):
            if(eachProba > self.threshold):
                print("[+] ",eachPrediction ," : ", eachProba)
                shot_json["subjects"].append( eachPrediction )


        #GET IMAGE PALETTE
        shot_json["colours"] = Palette(file).getColor()

        shot_json['colours'] = ';'.join(shot_json['colours'])
        shot_json['subjects'] = ';'.join(shot_json['subjects'])

        print("________________________________________")
        print("________________________________________")
        return shot_json


    def folderToFullpath(self,folder):
        return os.path.join(shots_path,folder)

    def getID(self,folder):
        query = """select id from movies where folder = \"%s\";""" % (folder)
        ex = self.connector.execute(query)
        return ex if len(ex) > 0 else False

    #json utilities (useless)
    def addOrUpdate(self,obj):

        #update existing id
        for i in range(len(self.JSON)):
            if(self.JSON[i]["id"] == obj["id"]):
                self.JSON[i]["shots"] = obj["shots"]
                return 0

        #else append new one
        self.JSON.append(obj)

    def alreadyFetched(self,path):
        check = """select path from aesthetics where path = \"%s\" ;""" % (path)
        if (len(self.connector.execute(check)) > 0):
            return True
        return False

    def localToSite(self,path):
        return path.replace("/Users/elkhantour/Sites/Kinoji",".")

    def fetchFolder(self, folder):

        print("Scanning folder: %s" % (folder))

        full_path = self.folderToFullpath(folder)
        shots = os.listdir( full_path )
        id = [i[0] for i in self.getID(folder)][0]
        print(id)
        for pic in shots:

            pic_full_path = os.path.join(full_path, pic)
            pic_json = {
            "folder": folder,
            "id": id,
            "shots":pic.replace('.png',''),
            "subjects":"",
            "colours":"",
            }

            if( self.rescan == "n" and self.alreadyFetched(pic_json['path']) ):
                print(pic_full_path + " => already analyzed")
            else:
                if(pic.endswith(".png") or pic.endswith(".jpg")):
                    getSubject = self.analyze(pic_full_path)
                    pic_json["subjects"] = getSubject['subjects']
                    pic_json["colours"] = getSubject['colours']
                    self.connector.update("aesthetics",pic_json)

        print("----------------------------\n\n")

    def start(self):


        self.setModel(model_path)
        folder_selection = input("\n\nType a folder to analyze ( '*' to analyse all the directory ) \n => ")
        self.rescan = input('\nDo you wish to rescan every shots ? (y/n) \n => ')
        if(folder_selection == "*"):
            movie_folder = os.listdir(shots_path)
            for movie in movie_folder:
                if(os.path.isdir(self.folderToFullpath(movie)) and self.getID(movie)):
                     self.fetchFolder(movie)
                else:
                    print("[X] "+movie+" not found")

        else:
            #check if folder exists in movie database to fetch movie ID
            for title in os.listdir(shots_path):
                if(title == folder_selection and self.getID(folder_selection)):
                    self.fetchFolder(folder_selection)
                    break
            else:
                print("ERROR: Folder not found.")
                self.start()

