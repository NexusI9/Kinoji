import { useEffect, useState, useRef } from 'react';
import { ArrowLabel } from '../inputs';
import { Mosaic, Banner } from '../movie';
import { LabelBar } from '../header';
import useAPI from '../../lib/api';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
    container:{
        initial:{},
        animate:{transition:{staggerChildren:0.3, duration:0.4}},
        exit:{transition:{staggerChildren:0.3, duration: 0.4}}
    },
    card:{
        initial:{y:100, opacity:0},
        animate: (custom) => ({y:0, opacity:1, transition:{delay: custom/4, duration: 0.5, type:'spring', stiffness: 100, damping:20}}),
        exit: (custom) => ({y:-100, opacity:0, transition:{duration:0.3, type:'spring', stiffness: 100, damping:20}})
    }
}

export default ({number=3, speed=5000}) => {

    const [ movies, setMovies ] = useState();
    const [ active, setActive ] = useState(false);
    const [ roll, setRoll ] = useState(0);
    const step = useRef(0);
    const container = useRef();
    const interval = useRef();
  
    useEffect(() => {   
        
        const onScroll = () => {
            if(!container.current){ return; }
            const { top, bottom } = container.current.getBoundingClientRect();

            if( top < window.innerHeight && bottom > 0 ){ setActive(true); }
            else{ setActive(false); }
        };

        clearInterval(interval.current);

        const {post} = useAPI();
        post({type:'getRandomMovies', limit:number*2}).then( result => {
            const {data} = result;
            const splitted = [];
            const chunkSize = 2;

            for (let i = 0; i < data.length; i += chunkSize) {
                const chunk = data.slice(i, i + chunkSize);
                splitted.push(chunk);
            }
            setMovies(splitted);
        });

         window.addEventListener('scroll', onScroll);

         return () => {
            clearInterval(interval.current);
            window.removeEventListener('scroll', onScroll);
         }

    }, [number]);

    useEffect(()=>{

        if(active){ 
            clearInterval(interval.current);
            interval.current = setInterval( () => { 
                step.current++;
                setRoll( step.current );
            }, speed);
        }else{
            step.current=0;
            clearInterval(interval.current);
        }

     },[active]);
  
    return(
        <div className='highlight_container container' ref={container}>

            <h2 className='big'>Discover</h2>
            <h4>Explore countless movies and atmospheres from Kinoji's movies library</h4>
            <div className='highlight_wrapper'>
                { [...Array(3)].map( (_,index) => 
                    <div key={`cell+${index}`} className='highlight_cell'>
                         <AnimatePresence>
                            {
                                movies && movies[index].map( (movie,id) => (id+roll)%2 == 0 && 
                                        <motion.div 
                                            key={'highlight'+index+'_'+id}  
                                            className='highlight'
                                            custom={index}
                                            variants={variants.card}
                                            >
                                            <Banner movie={movie} summary={false}/>
                                            <LabelBar hero={false} label='Preview' hyperlink={  <ArrowLabel label='see the shots' link={`/movies/${movie.id}`} /> }/>
                                            <Mosaic movie={movie} random={true} limit={index%2 ? 12 : 9} />
                                        </motion.div>
                                ) 
                            }
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
  }