from process.updateDatabase import UpdateDatabase as Update
from process.addMovies import Fetcher
#from classifier import Classifier
from process.wiper import Wiper
from webutils.webscrapper import Webscrapper



Webscrapper("Wong Kar-Wai", 12453, 'director').poster()


"""
print('-------------KINOJI SYNCHER--------------\n\n\n')
print('Choose an option : \n')
print('[ 1 ] - Generate thumbnails from Shots and update aesthetic database\n')
print('[ 2 ] - Update TDMB and Wikipedia database info (for movie & director)\n')
print('[ 3 ] - Update Image AI recognition database\n')
print('[ 4 ] - Wipe removed movies from databases\n')

mode = input("=> ")

if( mode ==  '1' ):
    Fetcher().start()
if( mode == '2' ):
    Update().start()
if( mode == '3' ):
    print('no AI available')
    #Classifier().start()
if( mode == '4'):
    Wiper().start()
"""
