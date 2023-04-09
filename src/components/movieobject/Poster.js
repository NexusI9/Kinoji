import Link from 'next/link';
import noposter from '../../assets/noposter.jpg';

const Poster = ({movie, size }) => {

  if(!size){ size = ''; }

  return(
        <div className={'movie_poster '+size+' movie_object dynamic'} id={movie.id} style={{opacity:1}}>
            <Link href={`/movies/${movie.id}`}>
              <img alt={movie.title+' poster'} data-id={movie.id} src={movie.poster || noposter.src }/>
              <section className='overlay'></section>
            </Link>
        </div>
  );

}

export default Poster;