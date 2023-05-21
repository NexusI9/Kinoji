import { motion } from 'framer-motion';


const Popup = ({content, event, type='top', margin=0}) => {

  const x = event.target.offsetLeft + 40;
  const y = event.target.offsetTop + 2 * event.target.offsetHeight;

  return(
    <motion.div
    initial={{ opacity: 0, x:x, y:y+10 }}
    animate={{opacity:1, x:x, y:y, transition:{ duration: 0.4} }}
    exit={{ opacity: 0, x:x, y:y+10 }}
    className={'popup '+ type}
    >
      <span className='tip'></span>
      <section className='content'>{content}</section>
      <span className='tip'></span>
    </motion.div>
  );


};

export default Popup;
