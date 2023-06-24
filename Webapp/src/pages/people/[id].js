import useAPI from '@/lib/api';
import { Banner } from '@/components/header';
import { Flow } from '@/components/movie';
import { container } from '@/lib/variants.js';
import { motion } from 'framer-motion';
import { jobFullName } from '@/lib/utilities';
import noposter from '@/assets/noposter.jpg';
import Head from 'next/head';

function People(props){

return(
  <div className='container'>
    <Head>
      <title>{ props.people[0].name } on Kinoji</title>
    </Head>
  {
    props.people.map( infos => <Banner
        key={'director_banner_'+infos.id}
        visual={<img alt={'poster_banner_'+infos.name} src={infos.poster || noposter.src } /> }
        category={ jobFullName(infos.job) }
        header={infos.name}
        summary={infos.summary || ''}
        sources={infos.source}
        spheros={true}
      />)
  }
    <motion.div
      variants={container}
      initial='initial'
      animate='animate'
      exit='exit'
      style={{marginTop:'5%'}}
    >
    <Flow movies={ props.movies } />
    </motion.div>
  </div>
  );
}

export default People;


// Generates `/movies/1` and `/movies/2`
export async function getStaticPaths() {
  const peoples = await useAPI().fetch('GET_ALL_PEOPLES');
  
  return {
    paths: peoples.map( ({id}) => ({ params: { id: id.toString() } }) ),
    fallback: false, // can also be true or 'blocking'
  }
}
// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({params}) {
  const people = await useAPI().fetch({type:'GET_PEOPLE_FROM_ID', id:params.id});
  const peopleMovie = await useAPI().fetch({type:'GET_MOVIES_FROM_PEOPLE', id:params.id});

  return {
    props: {
      people:people,
      movies:peopleMovie
    } // Passed to the page component as props
  }
}