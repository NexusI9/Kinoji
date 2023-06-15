import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Banner, LabelBar, TabBar } from '@/components/header';
import { Pile, Flow } from '@/components/movie';
import { Poster } from '@/components/people';
import { Card } from '@/components/inputs';
import useAPI from '@/lib/api';
import { container } from '@/lib/variants.js';
import { motion } from 'framer-motion';
import { getDirectorDate } from '@/lib/utilities';
import noposter from '@/assets/noposter.jpg';
import Head from 'next/head';



export default function Collections(props){

  const tabs = Object.keys(props.peoples).map( job => ({job:job, name: job === 'director' ? 'Directors' : job === 'dop' ? 'Directors of Photography' : job === 'artdir' ? 'Art Directors' : ''}) );
  const [people, setPeople] = useState(Object.keys(props.peoples)[0]);


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
        <title>{props.name} on Kinoji</title>
      </Head>

      {props.collection &&
        <>
          { props.movies && props.collection.map( info => <Banner visual={<Pile movies={ props.movies } />} category='collection' key={'banner_'+info.tag} header={info.name} summary={info.summary} source={info.source} spheros={true}/>) }
          { (props.peoples) &&
            <>
              <TabBar tabs={tabs} onChange={ (t) => setPeople(t.job) } name='peoplescollection'/>
                <div className='people-cardlist'>
                { 
                  props.peoples[people].map( ppl => <Poster key={'poster_genre_'+ppl.id} people={ppl} /> )
                }
                </div>
            </>
          }
          {props.movies && <Flow movies={ props.movies }/> }
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