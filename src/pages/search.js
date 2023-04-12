import { useRouter} from 'next/router';
import { useState, useEffect } from 'react';
import { container } from '../lib/variants';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { GlobalSearch, TagSearch } from '@/components/search';


export default function Search(){

  const router = useRouter();
  const params = router.query;
  const [ queries, setQueries ] = useState();

  useEffect( () => {
    if( params ){
      setQueries(params);
    }

  },[ params ]);

  return(
    <motion.div
      variants={container}
      initial='initial'
      animate='animate'
      exit='exit'
      id='search_container'
      className='container'
    >
      <Head>
        <title>KINOJI search { queries && queries.query && "\""+queries.query+"\""}</title>
      </Head>
      { queries && queries.query && <GlobalSearch query={queries.query} /> }
      { queries &&
        (queries.tags || 
        queries.colours || 
        queries.subjects) && 
        !queries.query && 
        <TagSearch tags={queries.tags} colours={queries.colours}  subjects={queries.subjects} />
      }
    </motion.div>
  );
}

