import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Thumbnail, Banner } from '../components/movieobject';
import { getMovieYear } from '../lib/utilities';
import { DirectorLabel } from '../components/api';

import { motion, AnimatePresence } from 'framer-motion';

import FetchAPI from '../lib/fetchapi';

import { sortThumbnails } from '../lib/utilities';
import { SquareButton, TMDBLink } from '../components/inputs';

import { image } from '../lib/variants';


const Thumbnails = ({movie}) => {

    let shots = movie.shots.split(';');
    shots = sortThumbnails(shots);

    return(
      <section id="thumbFrame">
      { shots.map( thumb => <Thumbnail key={thumb} movie={movie} shot={thumb} replace={true}/> ) }
      <span className="deg"></span>
      </section>
    );

}

const Header = ({ movie }) => {

  const nav = useNavigate();

  return (
    <section className='header'>

        <Banner movie={movie} summary={false} tags={false}/>
        {/* <section className='subtext'>
          <h2 id="title_full"><Link to={`/movie/${movie.id}`}>{movie.title}</Link><span className='light'>{ getMovieYear(movie) ? ` (${getMovieYear(movie)})` : '' }</span></h2>
          <TMDBLink link={'https://www.themoviedb.org/movie/'+movie.id}/>
          <small className='discrete'>{ movie.production ? movie.production.split(';').splice(0,3).join(' / ') : '' }</small>
          </section>
          <section className='label'><DirectorLabel id={movie.director}/> <p>&ensp;(Director)</p></section>
        */}

        <Link to={`/movies/${movie.id}`} id='quitFullView' className='squareButton close'><span></span></Link>
    </section>)
}



function FullView(){

  const { id, shot } = useParams();

  const [movie, setMovie] = useState([]);
  const location = useLocation();


  useEffect(() => {
    FetchAPI.post({type:'getMovieFromId', id:id}).then(result => {
      setMovie(result.data);
      document.title = 'KINO寺 - Viewer: '+ result.data[0].title || '';
    });
  },[id]);


  return (
    <>
      {
        movie.map( mv =>
          <div key={mv.id} id='fullview'>
            <Header movie={mv} />
            <section id="fullFrame">
                <AnimatePresence exitBeforeEnter>
                  <motion.img
                      key={shot}
                      variants={image}
                      initial='initial'
                      animate='animate'
                      exit='exit'
                      alt='full frame'
                      id="main_frame"
                      src={process.env.PUBLIC_URL+"/assets/movies/"+mv.folder+"/"+shot+".png"}
                  />
                </AnimatePresence>
            </section>
            <Thumbnails movie={mv} />
          </div>
        )
      }
    </>
  );

}


export default FullView;
