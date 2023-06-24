import sys
from modules.process.updateDatabase import UpdateDatabase
from modules.process.addMovies import AddMovies
#from classifier import Classifier
from modules.process.wiper import Wiper
from modules.process.tests.moduledtb import Sandbox
from lib.utils import clear



clear()
print("""-------------KINOJI SYNCHER--------------\n\n\n
Choose an option : \n
    [ 1 ] - Generate thumbnails from Shots and update aesthetic database\n
    [ 2 ] - Update database data for movies and peoples\n
    [ 3 ] - Update Image AI recognition database\n
    [ 4 ] - Wipe removed movies from databases\n
    [ 5 ] - Start Sandbox Script\n
    (0 to exit) \n""")

{
    '0': sys.exit,
    '1': lambda: AddMovies().start(),
    '2': lambda: UpdateDatabase().start(),
    '3': lambda: print('no AI available yet (coming soon...)'),
    '4': lambda: Wiper().start(),
    '5': lambda: Sandbox()
}[input("=> ")]()



