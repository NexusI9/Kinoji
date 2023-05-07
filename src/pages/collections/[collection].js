import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Banner, LabelBar } from '@/components/header';
import { Pile, Flow } from '@/components/movieobject';
import { Card } from '@/components/inputs';
import useAPI from '@/lib/api';
import { container } from '@/lib/variants.js';
import { motion } from 'framer-motion';
import { getDirectorDate } from '@/lib/utilities';
import noposter from '@/assets/noposter.jpg';
import Head from 'next/head';


export default function Collections(){

  const router = useRouter()
  const { collection } = router.query;
  const [ infos, setInfos ] = useState([]);
  const [ movies, setMovies ] = useState([]);
  const [ directors, setDirectors ] = useState([]);


  useEffect( () => {

    if(collection){
      const {post} = useAPI();
      post({type:'getGenre', genre:collection}).then( ({data}) =>  setInfos(data) );
      post({type:'getMoviesFromGenre', genre:collection, limit:null}).then( ({data}) => setMovies(data) );
      post({type:'getDirFromGenre', genre:collection}).then( ({data}) =>  setDirectors(data) );
    }

  
  },[collection]);


  return( 
    <motion.div
      variants={container}
      initial='initial'
      animate='animate'
      exit='exit'
      key='solo_rubriques_container'
      className='container'
    >
      <Head>
        <title>KINO寺 Collection { collection && ": "+collection }</title>
      </Head>
      {collection &&
        <>
          { movies && infos && infos.map( info => <Banner visual={<Pile movies={movies} />} category='collection' key={'banner_'+info.tag} header={info.name} summary={info.summary} source={info.source} spheros={true}/>) }
          { directors &&
            <>
              <LabelBar label={'Directors'} hero={false} />
                <div id='director_cardlist'>
                {
                  directors.map( dir => <Card key={'dircard_genre_'+dir.id} label={dir.name} subtext={getDirectorDate(dir) ? '('+getDirectorDate(dir)+')' : ''} visual={<img src={dir.poster || noposter.src } />} link={'/director/'+dir.id} /> )
                }
                </div>
            </>
          }
          {movies && <Flow movies={movies}/> }
        </>
      }
    </motion.div> );
}

