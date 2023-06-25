import { useState } from 'react';
import { Banner, TabBar } from '@/components/header';
import { Pile, Flow } from '@/components/movie';
import { Poster } from '@/components/people';
import useAPI from '@/lib/api';
import { container } from '@/lib/variants.js';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';



export default function Collections(props) {

  const tabs = Object.keys(props.peoples).map( (job,i) => ({ 
    job: job, 
    name: job === 'director' ? 'Directors' : 
          job === 'dop' ? 'Directors of Photography' : 
          job === 'artdir' ? 'Art Directors' : '',
    defaultChecked: !(!!i)
  }));
  const [people, setPeople] = useState(Object.keys(props.peoples)[0]);


  return (
    <motion.div
      variants={container}
      initial='initial'
      animate='animate'
      exit='exit'
      key='solo_rubriques_container'
      className='container'
    >
      <Head>
        <title>{` ${props.name} summary and movies | Kinoji`}</title>
      </Head>

      {props.collection &&
        <>
          {props.movies && props.collection.map(info =>
            <Banner
              visual={<Pile movies={props.movies} />}
              category='collection'
              key={'banner_' + info.tag}
              header={info.name}
              summary={info.summary}
              sources={info.sources}
              spheros={true} />
          )}
          {(props.peoples) &&
            <>
              <TabBar tabs={tabs} onChange={(t) => setPeople(t.job)} name='peoplescollection' />
              <div className='people-cardlist default-grid' >
                <AnimatePresence mode='wait'>
                  {
                    props.peoples[people].map((ppl, id) => <Poster key={'poster_genre_' + ppl.id} people={ppl} delay={id / 30} />)
                  }
                </AnimatePresence>
              </div>
            </>
          }
          {props.movies && <Flow movies={props.movies} />}
        </>
      }
    </motion.div>);
}



//Generates `/movies/1` and `/movies/2`
export async function getStaticPaths() {
  const collections = await useAPI().fetch({ type: 'GET_COLLECTION', genre: '' });

  return {
    paths: collections.map(({ name }) => ({ params: { collection: name.toString() } })),
    fallback: false, // can also be true or 'blocking'
  }
}
// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {

  const collection = await useAPI().fetch({ type: 'GET_COLLECTION', genre: params.collection });
  const movies = await useAPI().fetch({ type: 'GET_MOVIES_FROM_COLLECTION', genre: params.collection, limit: null });
  const peoples = await useAPI().fetch({ type: 'GET_PEOPLES_FROM_COLLECTION', genre: params.collection });

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