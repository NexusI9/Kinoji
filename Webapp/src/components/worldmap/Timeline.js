import { getMovieYear } from '../../lib/utilities';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { container } from '../../lib/variants';
import Event from './Event';
import Segment from './Segment';
import { ObjectToEvent, group, minMax } from './Timeline.helper';


//CORE
export default ({ country, width }) => {

  const mapElements = (frise) => {
    //map de group into element, returns an array

    const ar = [];
    const EVENT_MAP = {
      segments: ({item,id}) =>
        <Segment 
          key={id} 
          object={item} 
          width={BAR_WIDTH} 
          minmax={minmax} 
        />,

      solo: ({ item, type, id }) => 
        <Event
          key={id}
          date={item.begin ? [item.begin, item.end] : [getMovieYear(item)] }
          object={ ObjectToEvent(item) }
          type={type}
          width={BAR_WIDTH}
          minmax={minmax}
          id={id}
          killswitch={ activePopup === id ? false : true }
        />,

      group: ({ item, type, date, id}) =>  
        <Event
          key={id}
          date={[date]}
          object={ item.objects.map(mv => ObjectToEvent(mv)) }
          type={type}
          width={BAR_WIDTH}
          minmax={minmax}
          id={id}
          killswitch={ activePopup === id ? false : true }
        />
    }
    

    //push elements to array with related key from map
    Object.keys(frise).forEach( key => ({
          segments: () => 
              ar.push(...frise[key].map( (sg,i) => 
                  EVENT_MAP[key]({item:sg, id:'segments'+i}) 
                )),
          group: () => 
              Object.keys( frise[key] ).forEach(gkey => {
                ar.push(...frise[key][gkey].map( (gp, i) => 
                  EVENT_MAP[key]({item: gp, id:JSON.stringify(gp)+i, type:gkey, date:gp.date}) 
                ));
              }),
          solo: () => Object.keys( frise[key] ).forEach(skey => {
              ar.push(...frise[key][skey].map( (gp, i) => 
                EVENT_MAP[key]({item: gp, id:JSON.stringify(gp)+i, type: skey}) 
              ));
          })
    })[key]() || null);

    return ar;
  }

  //states
  const [offset, setOffset] = useState(MARGIN);
  const [frise, setFrise] = useState();
  const [minmax, setMinMax] = useState();
  const [activePopup, setActivePopup] = useState();

  //scroll
  const MARGIN = 200;
  const BAR_WIDTH = window.innerWidth / 100 * width;
  const SCROLL_HEIGHT = window.innerHeight / 200 * 450; //450vh
  const CONTAINER_HEIGHT = window.innerHeight / 200 * 35; //35vh

  function onScroll(e){
    const realHeight = SCROLL_HEIGHT - CONTAINER_HEIGHT;
    const percent = e.target.scrollTop / realHeight;
    const pos = MARGIN + -1 * percent * (BAR_WIDTH/1.2) ;
    setOffset( pos );
  }

  useEffect(() => {

      const { history } = country;
      if(history){
        setFrise(group(history));
        setMinMax(minMax(history));
      }

  },[country]);


  return(
    <>
      {
        frise &&
        <motion.div
          id='timeline_wrapper'
          onScroll={ onScroll }
          variants={ container }
          initial='initial'
          animate='animate'
          exit='exit'
          key='timeline_motion'
        >
            <span style={{position:'relative', top:'0', display: 'block', width:'0.1vw', height:SCROLL_HEIGHT, pointerEvents: 'none' }}></span>
            <div id="chrono_timeline" style={{transform:'translateX('+offset+'px)'}}>
              <span id='chrono_bar'></span>
                { mapElements(frise) }
            </div>
         </motion.div>
      }
    </>
  );
}

