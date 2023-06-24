import { useState, useEffect, useRef } from 'react';
import { ReadMore } from '../inputs';
import { motion } from 'framer-motion';

export default ({paragraph, height=200, footer}) => {

    const ref = useRef(null);
    const [ hidden, setHidden ] = useState(false);
    const [ bigSummary, setBigSummary ] = useState(false);
    const [ initHeight, setInitHeight ] = useState();
  
    const onClick = (e) => setHidden(e === 'hidden');
  
    useEffect(() => {
      if(ref && ref.current.offsetHeight > height + 20){
        setHidden(true);
        setBigSummary(true);
        setInitHeight(ref.current.offsetHeight + 10);
      }
    }, [ref]);
  
    return (
      <div className='expandable'>
        <motion.div
          initial={{height: hidden ? height : initHeight }}
          animate={{height: hidden ? height : initHeight}}
          transition={{duration: 0.3, type:'tween', ease:'circOut'}}
          ref={ref}>
          <p>{paragraph}</p>
          {footer && footer}
          </motion.div>
        { bigSummary ? <>
            <ReadMore onClick={onClick}/>
          </>:<></>}
      </div>
    );
  
  }