from modules.process.updateDatabase import UpdateDatabase
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

mode = {
    '1': lambda: AddMovies().start(),
    '2': lambda: UpdateDatabase().start(),
    '3': lambda: print('no AI available yet (coming soon...)'),
    '4': lambda: Wiper().start()
}[input("=> ")]()



