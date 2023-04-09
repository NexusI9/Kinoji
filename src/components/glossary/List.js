import { useState, useEffect } from 'react';
import Link from 'next/link';
import useAPI from '../../lib/api';
import { motion } from 'framer-motion';
import { container } from '../../lib/variants';

const List = ({ id, query, value, link ,onEnter }) => {

    const [ list, setList ] = useState([]);
  
    useEffect( () => {
      const {post} = useAPI();
      const alphalist = [];
      const gather = (list, alp) => {
        //sort list alphabetically
  
        for( const i in list ){
  
          if(alp.length === 0){
            alp.push({letter: list[i][value][0], objects: [ list[i] ] });
            list.splice(i,1);
            return gather(list, alp);
          }else{
  
            for( const j in alp){
              if(list[i][value][0] === alp[j].letter){
                alp[j].objects.push( list[i] );
                list.splice(i,1);
                return gather(list, alp);
              }
            }
  
            alp.push({letter: list[i][value][0], objects: [ list[i] ] });
            list.splice(i,1);
            return gather(list, alp);
          }
        }
  
  
        alp.sort(function(a,b){
          if(a.letter > b.letter){ return 1; }
          if(a.letter < b.letter){ return -1; }
          return 0;
        });
  
        return alp;
      }
  
      post({type:query}).then( result => setList(  gather(result.data, alphalist) ) )
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

  
  export default List;