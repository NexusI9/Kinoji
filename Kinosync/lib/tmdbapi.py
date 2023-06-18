from tmdbv3api import TMDb
from lib.utils import config

apiKey = config("API_KEY")

tmdb = TMDb()
tmdb.api_key = apiKey
tmdb.language = 'en'
tmdb.debug = True