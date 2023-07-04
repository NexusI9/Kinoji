import os
from lib.utils import config
from modules.process.lib.connector import Connector
#from modules.process.lib.classifier import Classifier

SHOTS_PATH = config("SHOTS_PATH")
USERNAME = config("USERNAME")
HOSTNAME = config("HOSTNAME")
PASSWORD = config("PASSWORD")
DTBNAME = config("DTBNAME")

class Palette:

    def __init__(self):
        return