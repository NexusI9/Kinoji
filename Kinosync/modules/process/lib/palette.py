from colorthief import ColorThief
import webcolors
import os
from lib.utils import config, clear
from modules.process.lib.connector import Connector

SHOTS_PATH = config("SHOTS_PATH")
USERNAME = config("USERNAME")
HOSTNAME = config("HOSTNAME")
PASSWORD = config("PASSWORD")
DTBNAME = config("DTBNAME")

class Palette:

    """
    Get prmiary colors of a given picture using the ColorThief library
    """

    def __init__(self, maxColor=2):
        self.maxColor = maxColor
        self.connector = Connector(HOSTNAME, USERNAME, PASSWORD, DTBNAME)

    def closestColour(self, requested_colour):
        min_colours = {}
        for key, name in webcolors.CSS3_HEX_TO_NAMES.items():
            r_c, g_c, b_c = webcolors.hex_to_rgb(key)
            rd = (r_c - requested_colour[0]) ** 2
            gd = (g_c - requested_colour[1]) ** 2
            bd = (b_c - requested_colour[2]) ** 2
            min_colours[(rd + gd + bd)] = name
        return min_colours[min(min_colours.keys())]

    def getColourName(self, requested_colour):
        try:
            closest_name = webcolors.rgb_to_name(requested_colour)
        except ValueError:
            closest_name = self.closestColour(requested_colour)
        return closest_name
    
    def getFamilyOf(self, color):
        family = self.connector.execute("""SELECT family FROM colors WHERE LOWER(name) = %s""", [ color.lower() ])
        return color if not family else family[0][0]

    def getColours(self, picture, debug=False):
        color_array = []
        palette = ColorThief(picture).get_palette(color_count=self.maxColor)
        for rgb in palette:

            #1. get real color name
            realColor = self.getColourName(rgb)

            #2. get simplified version
            simplifiedColor = self.getFamilyOf(realColor)
            
            #3. append to array for upcoming filter with unique value
            color_array.append(simplifiedColor)
            
            if debug:
                print('{:<30} {:>20} {:>20}'.format(os.path.basename(picture), realColor, simplifiedColor) ) 
            
            
        #remove doublon
        color_array = list( dict.fromkeys(color_array) )
        return color_array
