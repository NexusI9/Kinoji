
import { useState, useEffect } from 'react';
import { Button } from '../inputs';
import { Link } from 'next/link';
import { motion } from 'framer-motion';
import { container } from '../../lib/variants';
import qs from 'query-string';

export default ({results, titles}) => {

    const [ count, setCount ] = useState(0);
  
    const resultsToUrl = ({ tagChain, colourChain }) => {
  
      const req = {};
  
      if(tagChain.length > 0 ){ req.tags = tagChain; }
      if(colourChain.length > 0 ){ req.colours = colourChain; }
  
      return '?'+qs.stringify(req,{arrayFormat:'separator', arrayFormatSeparator:'+', strict:false})+'&mosaic=1';
    }
  
    useEffect(() =>{
  
      if(results.total > count){ setTimeout(() => setCount(count+1),10); }
  
      if(results.total < count){ setTimeout(() => setCount(count-1), 10); }
  
    },[results,count]);
  
    return(
      <div id='counter'>
  
            <section>
              <h1>{count}</h1>
              <div className='resultText'>
                <h3>movies found </h3>
                {results.colours && results.colours.length > 0 ? <motion.p variants={container} initial='initial' animate='animate' exit='exit' key='shotsresult'>({results.colours.length} shots)</motion.p> : <></> }
              </div>
            </section>
  
            <section>
            {
              count > 0 ?
                <motion.div
                key='listTitlesSearch'
                variants={container}
                initial='initial'
                animate='animate'
                exit='exit'
                >
                  <motion.ul key='listTitles'
                  variants={container}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  >
  
                  { titles && titles.map( title => <li key={'li'+title}>{title}</li> ) }
                  </motion.ul>
                  <Link href={'/search'+resultsToUrl(results)}><Button label='See all' icon={<span className='ico search'></span>}/></Link>
                </motion.div>
              :
              <motion.p
                  key={'descChooseTag'}
                  variants={container}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  className="discrete">Find shots with specific moods and colors by choosing between the tags on the left</motion.p>
            }
            </section>
  
      </div>
    );
  }