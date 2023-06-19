from modules.process.updatedatabase import UpdateDatabase as Update
from modules.process.addmovies import AddMovies
#from classifier import Classifier
from modules.process.wiper import Wiper
from modules.webservices.explorer import Explorer



Explorer({"name":"Kuang-Hui Liu", "id":2693161, "job":"director"}).process()


"""
print('-------------KINOJI SYNCHER--------------\n\n\n')
print('Choose an option : \n')
print('[ 1 ] - Generate thumbnails from Shots and update aesthetic database\n')
print('[ 2 ] - Update TDMB and Wikipedia database info (for movie & director)\n')
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
"""
