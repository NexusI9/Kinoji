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


export default function Collections(props){

  const router = useRouter()
  const { collection } = router.query;
  const [ infos, setInfos ] = useState([]);
  const [ movies, setMovies ] = useState([]);
  const [ directors, setDirectors ] = useState([]);
 
  console.log(props.peoples);

  /*seEffect( () => {

    if(collection){
      const {post} = useAPI();
      post({type:'getGenre', genre:collection}).then( ({data}) =>  setInfos(data) );
      post({type:'getMoviesFromGenre', genre:collection, limit:null}).then( ({data}) => setMovies(data) );
      post({type:'getDirFromGenre', genre:collection}).then( ({data}) =>  { 
        setDirectors(data) 
      });
    }

  
  },[collection]);*/


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
        <title>{(props.name || collection)} on Kinoji</title>
      </Head>

      {collection &&
        <>
          { props.movies && props.collection.map( info => <Banner visual={<Pile movies={ props.movies } />} category='collection' key={'banner_'+info.tag} header={info.name} summary={info.summary} source={info.source} spheros={true}/>) }
          { (props.directors || directors) &&
            <>
              <LabelBar label={'Directors'} hero={false} />
                <div id='director_cardlist'>
                { 
                  (props.directors || directors).map( dir => <Card key={'dircard_genre_'+dir.id} label={dir.name} subtext={getDirectorDate(dir) ? '('+getDirectorDate(dir)+')' : ''} visual={<img src={dir.poster || noposter.src } />} link={'/director/'+dir.id} /> )
                }
                </div>
            </>
          }
          {movies && <Flow movies={ (props.movies || movies) }/> }
        </>
      }
    </motion.div> );
}



//Generates `/movies/1` and `/movies/2`
export async function getStaticPaths() {
  const collections = await useAPI().fetch({type:'getGenre', genre:''}); 

  return {
    paths: collections.map( ({name}) => ({ params: { collection: name.toString() } }) ),
    fallback: false, // can also be true or 'blocking'
  }
}
// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({params}) {

  const collection = await useAPI().fetch({type:'getGenre', genre: params.collection});
  const movies =  await useAPI().fetch({type: 'getMoviesFromGenre', genre: params.collection, limit:null});
  const peoples =  await useAPI().fetch({type: 'getPeoplesFromGenre', genre: params.collection});

  const { name } = collection[0];

  return {
    props: {
      collection: collection,
      name: name,
      peoples: peoples,
      movies: movies
    } // Passed to the page component as props
  }
}