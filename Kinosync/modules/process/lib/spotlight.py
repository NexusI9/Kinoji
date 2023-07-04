import os
from lib.utils import config, resizePicture
import numpy as np
import cv2
from PIL import Image
from modules.process.lib.connector import Connector

SHOTS_PATH = config("SHOTS_PATH")
USERNAME = config("USERNAME")
HOSTNAME = config("HOSTNAME")
PASSWORD = config("PASSWORD")
DTBNAME = config("DTBNAME")

class Spotlight:

    """
    Analyse and output contrast ratio and vibrance of a given file using OpenCV and NumPy
    """

    def __init__(self):
        return
    
    def contrast(self, path):

        return None
    
    def vibrance(self, path):

        picture = cv2.imread(path)
        # split the image into its respective RGB components
        (B, G, R) = cv2.split(picture.astype("float"))
        # compute rg = R - G
        rg = np.absolute(R - G)
        # compute yb = 0.5 * (R + G) - B
        yb = np.absolute(0.5 * (R + G) - B)
        # compute the mean and standard deviation of both `rg` and `yb`
        (rbMean, rbStd) = (np.mean(rg), np.std(rg))
        (ybMean, ybStd) = (np.mean(yb), np.std(yb))
        # combine the mean and standard deviations
        stdRoot = np.sqrt((rbStd ** 2) + (ybStd ** 2))
        meanRoot = np.sqrt((rbMean ** 2) + (ybMean ** 2))
        # derive the "colorfulness" metric and return it
        return round( (stdRoot + (0.3 * meanRoot)) / 100, 2)