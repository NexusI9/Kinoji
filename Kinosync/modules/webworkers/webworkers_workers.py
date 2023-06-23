#imporing Scrappers based fetcher
from modules.webworkers.workers.perplexity import Perplexity
from modules.webworkers.workers.asianwiki import AsianWiki
from modules.webworkers.workers.imdb import Imdb
from modules.webworkers.workers.mubi import Mubi

#importing Api based fetcher
from modules.webworkers.workers.wikipedia import Wikipedia
from modules.webworkers.workers.tmdb import Tmdb

WORKERS = {
    "perplexity": Perplexity,
    "asianwiki": AsianWiki,
    "imdb": Imdb,
    "mubi": Mubi,
    "wikipedia":Wikipedia,
    "tmdb": Tmdb
}