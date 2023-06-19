#imporing Scrappers based fetcher
from modules.webservices.workers.perplexity import Perplexity
from modules.webservices.workers.asianwiki import AsianWiki
from modules.webservices.workers.imdb import Imdb
from modules.webservices.workers.mubi import Mubi

#importing Api based fetcher
from modules.webservices.workers.wikipedia import Wikipedia
from modules.webservices.workers.tmdb import Tmdb


WORKERS = {
      "tmdb": Tmdb,
      "imdb": Imdb,
      "mubi": Mubi,
      "wikipedia": Wikipedia,
      "asianwiki": AsianWiki,
      "perplexity": Perplexity
}