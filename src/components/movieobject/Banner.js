//Movie Objects
import Link from 'next/link';
import { DirectorLabel } from '../api';
import { getMovieYear,} from '../../lib/utilities.js';
import { TagLabel, TMDBLink } from '../inputs';
import { Spheros } from '../misc';

import noposter from '@/assets/noposter.jpg';
import { InfoTag } from '../header';


const Banner = ({ movie, summary=true, linked=true, spheros=false, tags=true}) =>{

  const date = getMovieYear(movie) ? ('('+getMovieYear(movie)+')') : '';
  return(

        <div className='movie_banner'>
          {spheros && <Spheros /> }
          <img className='visual' alt={movie.title+' poster'} src={movie.poster || noposter.src }/>
          <section>
            <div className='header'>
            { linked ?
              <Link href={`/movies/${movie.id}`}>
                <h3 className='title'>{movie.title} <span className='date light'>{ date }</span></h3>
              </Link> :
                <h1>{movie.title} <span className='date light'>{date}</span></h1>
            }
            <TMDBLink link={'https://www.themoviedb.org/movie/'+movie.id} />
            </div>
              <DirectorLabel id={movie.director} />
              <InfoTag>director</InfoTag>
            <br></br>
          {summary && <p className='summary'>{movie.summary}</p> }
          { tags && movie.tag && <div className='tagdiv'>{movie.tag.split(';').map( (tag,i) => <TagLabel key={'taglabel'+tag+i} label={tag} discrete={true} /> ) }</div> }
          </section>
        </div>
    );
}

export default Banner;