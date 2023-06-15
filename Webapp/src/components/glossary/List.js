import { useState, useEffect } from 'react';
import Link from 'next/link';
import useAPI from '../../lib/api';
import { motion } from 'framer-motion';
import { container } from '../../lib/variants';
import { gather } from './List.helper';

export default ({ id, query, value, link ,onEnter }) => {

    const [ list, setList ] = useState([]);
  
    useEffect( () => {

      if(!value){ return; }
      const {post} = useAPI();
      const alphalist = [];
      
      post({type:query}).then( result => setList(  gather(result.data, alphalist, value)) );
    },[query, value]);
  
    return (
      <motion.div id={'list_'+id} className='alphaList'
        key={'list_'+id}
        variants={container}
        initial='initial'
        animate='animate'
        exit='exit'
        >
      {
        list.map( item =>
            <div key={'alpha_'+item.letter}>
                <h1>{item.letter}</h1>
                <ul>
                {
                  item.objects.map((obj,i) => <Link key={'subitem_'+id+'_'+i} href={link(obj)}><li><p className='queries' onMouseEnter={ () => onEnter(obj) } >{obj[value]}</p></li></Link>)
                }
                </ul>
              </div>
          )
      }
      </motion.div>
  
    );
  
  }
