import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { container } from '@/lib/variants';
import { generateFrise, group, minMax, checkActiveSegment } from './Timeline.helper';


//CORE
export default ({ country, width }) => {


  //states
  const [offset, setOffset] = useState(MARGIN);
  const [frise, setFrise] = useState();
  const [minmax, setMinMax] = useState();
  const segments = useSelector( state => state.segment.array );
  const dispatch = useDispatch();

  //scroll
  const MARGIN = 200;
  const BAR_WIDTH = window.innerWidth / 100 * width;
  const SCROLL_HEIGHT = window.innerHeight / 200 * 450; //450vh
  const CONTAINER_HEIGHT = window.innerHeight / 200 * 35; //35vh

  function onScroll(e) {

    //translate vertical scroll to horizontal
    const realHeight = SCROLL_HEIGHT - CONTAINER_HEIGHT;
    const percent = e.target.scrollTop / realHeight;
    const pos = MARGIN + -1 * percent * (BAR_WIDTH / 1.2);
    
    dispatch({type:'SET_ACTIVE_SEGMENT', segment: checkActiveSegment(segments) });

    setOffset(pos);
  }

  useEffect(() => {

    const { history } = country;
    if (history) {
      setFrise(group(history));
      setMinMax(minMax(history));
    }

  }, [country]);


  return (
    <>
      {
        frise &&
        <motion.div
          id='timeline_wrapper'
          onScroll={onScroll}
          variants={container}
          initial='initial'
          animate='animate'
          exit='exit'
          key='timeline_motion'
        >
          <span style={{ position: 'relative', top: '0', display: 'block', width: '0.1vw', height: SCROLL_HEIGHT, pointerEvents: 'none' }}></span>
          <div id="chrono_timeline" style={{ transform: 'translateX(' + offset + 'px)' }}>
            <span id='chrono_bar'></span>
            {generateFrise(frise, minmax, BAR_WIDTH)}
          </div>
        </motion.div>
      }
    </>
  );
}

