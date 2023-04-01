import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Banner, LabelBar } from '../components/header';
import { Pile, Flow, Rubrique } from '../components/movieobject';
import { Card } from '../components/inputs';

import FetchAPI from '../lib/fetchapi';

import { container } from '../lib/variants.js';
import { motion } from 'framer-motion';
import { getDirectorDate } from '../lib/utilities';

import noposter from '../assets/noposter.jpg';


function Collections(){

  const { genre } = useParams();
  const [ infos, setInfos ] = useState([]);
  const [ movies, setMovies ] = useState([]);
  const [ genres, setGenres ] = useState([]);
  const [ directors, setDirectors ] = useState([]);

  const contentType = (type) => {

      if(!type){
        return (<motion.div
          variants={container}
          initial='initial'
          animate='animate'
          exit='exit'
          key='all_rubriques_container'
          className='container'
          >
          <LabelBar label='All genres' />
          <div className='padded' id='all_rubriques'>
          {genres.map( gr => <Rubrique key={gr.name} genre={gr} />)}
          </div>
          </motion.div>
        );
      }else{

        return (<motion.div
          variants={container}
          initial='initial'
          animate='animate'
          exit='exit'
          key='solo_rubrique_container'
          className='container'
          >

           </motion.div>
         );

      }

  }

  useEffect( () => {

    if(genre){

      document.title = `KINO寺 - Collection: ${genre}`;

      FetchAPI.post({type:'getGenre', genre:genre}).then( ({data}) =>  setInfos(data) );
      FetchAPI.post({type:'getMoviesFromGenre', genre:genre, limit:null}).then( ({data}) => setMovies(data) );
      FetchAPI.post({type:'getDirFromGenre', genre:genre}).then( ({data}) =>  { console.log(data); setDirectors(data) } );

    }else{
      document.title = 'KINO寺 Collections';
      FetchAPI.post({type:'getGenre',genre:''}).then( ({data}) =>  setGenres(data) );
    }

  
  },[genre]);


  return( 
    <motion.div
      variants={container}
      initial='initial'
      animate='animate'
      exit='exit'
      key={`${!genre ? 'all' : 'solo'}_rubriques_container`}
      className='container'
    >
      {!genre ?   
        <>
          <LabelBar label='All genres' />
          <div className='padded' id='all_rubriques'>
          {genres.map( gr => <Rubrique key={gr.name} genre={gr} />)}
          </div> 
        </> :
        <>
          { movies && infos && infos.map( info => <Banner visual={<Pile movies={movies} />} category='collection' key={'banner_'+info.tag} header={info.name} summary={info.summary} source={info.source} spheros={true}/>) }
          { directors &&
            <>
              <LabelBar label={'Directors'} hero={false} />
                <div id='director_cardlist'>
                {
                  directors.map( dir => <Card key={'dircard_genre_'+dir.id} label={dir.name} subtext={getDirectorDate(dir) ? '('+getDirectorDate(dir)+')' : ''} visual={<img src={dir.poster || noposter } />} link={'/director/'+dir.id} /> )
                }
                </div>
            </>
          }
          {movies && <Flow movies={movies}/> }
        </>
      }
    </motion.div> );
}


export default Collections;
