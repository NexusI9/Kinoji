import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

export default () => {

    const _headline = useSelector(state => state.segment.active?.name);
    const _summary = useSelector(state => state.segment.active?.summary);

    return (
        <motion.div
            className='timeline-segment-headline'
            key={_headline + 'headlineSegment'}
            initial={{opacity:0}}
            animate={{opacity:1, transition:{duration:0.2}}}
            exit={{opacity:0, transition:{duration:0.2}}}
        >
            <h2>{_headline}</h2>
            <p>{_summary}</p>
        </motion.div>);
};