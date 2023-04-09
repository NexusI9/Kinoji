import useAPI from "../../lib/api";
import { useState, useEffect, useRef } from 'react';
import { ArrowLabel } from "../inputs";
import { DirectorLabel } from "../api";
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";

const variants = {
    content:{
        initial:{opacity:0},
        animate:{opacity:1, transition:{duration: 0.3}},
        exit:{opacity:0, transition:{duration: 0.2}}
    }
}

const ShotSlider = ({number=6}) => {

    const [currentShot, setShot] = useState();
    const shots = useRef();
    const index = useRef(0); 
    const timeout = useRef();


    const paginate = (direction) => {
        clearTimeout(timeout.current);
        switch(direction){
            case 'next':
                if(index.current == number-1 ){ index.current = 0; }
                if(index.current+1 < number){ index.current++; }
            break;

            case 'prev':
                if(index.current == 1 ){ index.current = number-1; }
                if(index.current-1 > 0){ index.current--; }
            break;
        }

        setShot( shots.current[index.current] );

    }

    useEffect(() => {
        const { post } = useAPI();
        post({type:'getRandomShots', limit:number}).then( result => {
            shots.current = result.data;
            setShot( shots.current[index.current] ) 
        });
        
        clearTimeout(timeout.current);

        return () => {
            clearTimeout(timeout.current);
        }

        
    },[number]);

    useEffect(() => {
        timeout.current = setTimeout( () => paginate('next'), 4000); 

        return() => {
            clearTimeout(timeout.current);
        }
    }, [currentShot]);



    return(
     <div id='shotSlider'>
        {
            currentShot && <>
                <AnimatePresence mode='wait'>
                    <motion.img 
                        src={currentShot.path} 
                        key={currentShot.path}
                        variants={variants.content}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        />
                </AnimatePresence>
                <section>
                    <div className="container">
                        <div className="shotslider-navigation">
                            <p>Your daily shots</p>
                            <div className= "shotslider-navigation-arrows">
                                <svg onClick={ () => paginate('prev') } width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.3 4.27537L6.80001 7.77537L10.3 11.2754L9.60001 12.6754L4.70001 7.77537L9.60001 2.87537L10.3 4.27537Z" />
                                </svg>
                                <svg onClick={ () => paginate('next') }  width="7" height="11" viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.499974 9.27541L3.99998 5.77542L0.499975 2.27542L1.19998 0.875416L6.09998 5.77542L1.19997 10.6754L0.499974 9.27541Z" />
                                </svg>
                            </div>
                        </div>
                        <motion.div 
                            className="shotslider-info"
                            variants={variants.content}
                            key={currentShot.path+'info'}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                        >
                            <section>
                                <h4><Link href={`/movies/${currentShot.movie.id}`}>{ currentShot.movie.title }</Link> <span className="light"> ({currentShot.movie.date?.split('-')[0]})</span></h4>
                                <div><DirectorLabel id={currentShot.movie.director} popup={false} /> (director) </div>
                            </section>
                            <ArrowLabel link={`/movies/${currentShot.movie.id}`} label='see the shots'/>
                        </motion.div>
                    </div>
                </section>
            </>
        }
     </div>
     );


}


export default ShotSlider;