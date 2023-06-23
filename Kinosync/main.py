from modules.process.updateDatabase import UpdateDatabase as Update
from modules.process.addMovies import AddMovies
#from classifier import Classifier
from modules.process.wiper import Wiper
from lib.utils import clear


clear()
print('-------------KINOJI SYNCHER--------------\n\n\n')
print('Choose an option : \n')
print('[ 1 ] - Generate thumbnails from Shots and update aesthetic database\n')
print('[ 2 ] - Update database data for movies and peoples\n')
print('[ 3 ] - Update Image AI recognition database\n')
print('[ 4 ] - Wipe removed movies from databases\n')

mode = input("=> ")

if( mode ==  '1' ):
    AddMovies().start()
if( mode == '2' ):
    Update().start()
if( mode == '3' ):
    print('no AI available')
    #Classifier().start()
if( mode == '4'):
    Wiper().start()

