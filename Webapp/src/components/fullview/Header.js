import { useRouter } from 'next/router';
import Link from 'next/link';
import { Banner } from '../movie';

export default ({ movie }) => {

    const router = useRouter();
  
    return (
      <section className='header'>
  
          <Banner movie={movie} summary={false} tags={false}/>
          {/* <section className='subtext'>
            <h2 id="title_full"><Link to={`/movie/${movie.id}`}>{movie.title}</Link><span className='light'>{ getMovieYear(movie) ? ` (${getMovieYear(movie)})` : '' }</span></h2>
            <TMDBLink link={'https://www.themoviedb.org/movie/'+movie.id}/>
            <small className='discrete'>{ movie.production ? movie.production.split(';').splice(0,3).join(' / ') : '' }</small>
            </section>
            <section className='label'><PeopleLabel id={movie.director}/> <p>&ensp;(Director)</p></section>
          */}
  
          <div onClick={ () => router.back() } id='quitFullView' className='squareButton close'><span></span></div>
      </section>)
  }