import { Link } from 'react-router-dom';

const Poster = ({movie, size }) => {

  if(!size){ size = ''; }

  return(
        <div className={'movie_poster '+size+' movie_object dynamic'} id={movie.id} style={{opacity:1}}>
            <Link to={`/movies/${movie.id}`}>
              <img alt={movie.title+' poster'}  className='fetch_id scrollTop' data-id={movie.id} src={movie.poster || require('../../assets/noposter.jpg') }/>
              <section className='overlay'></section>
            </Link>
        </div>
  );

}

export default Poster;