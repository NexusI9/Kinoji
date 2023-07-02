import { useEffect, useState, useRef } from 'react';
import { ArrowLabel } from '../inputs';
import { Mosaic, Banner } from '../movie';
import { LabelBar } from '../header';
import useAPI from '@/lib/api';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
    container: {
        initial: {},
        animate: { transition: { staggerChildren: 0.3, duration: 0.4 } },
        exit: { transition: { staggerChildren: 0.3, duration: 0.4 } }
    },
    card: {
        initial: { y: 100, opacity: 0 },
        animate: (custom) => ({ y: 0, opacity: 1, transition: { delay: custom / 4, duration: 0.5, type: 'spring', stiffness: 100, damping: 20 } }),
        exit: (custom) => ({ y: -100, opacity: 0, transition: { duration: 0.3, type: 'spring', stiffness: 100, damping: 20 } })
    }
}

export default ({ number = 3, speed = 5000 }) => {

    const [movies, setMovies] = useState();
    const [active, setActive] = useState(false);
    const [roll, setRoll] = useState(0);
    const [numberMovies, setNumberMovies]= useState(3);
    const step = useRef(0);
    const container = useRef();
    const interval = useRef();

    useEffect(() => {
        setNumberMovies( window.matchMedia('(min-width:800px').matches ? 3 : 1)
    },[]);
    useEffect(() => {

        const onScroll = () => {
            if (!container.current) { return; }
            const { top, bottom } = container.current.getBoundingClientRect();

            if (top < window.innerHeight && bottom > 0) { setActive(true); }
            else { setActive(false); }
        };

        clearInterval(interval.current);

        const { post } = useAPI();
        post({ type: 'GET_RANDOM_MOVIES', limit: number * 2 }).then(result => {
            const { data } = result;
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

    useEffect(() => {

        if (active) {
            clearInterval(interval.current);
            interval.current = setInterval(() => {
                step.current++;
                setRoll(step.current);
            }, speed);
        } else {
            step.current = 0;
            clearInterval(interval.current);
        }

    }, [active]);

    return (
        <section className='highlight_container container' ref={container}>
            <svg width="1440" height="386" viewBox="0 0 1440 386" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M713.5 1.5C392.091 1.5 116.627 149.699 0.437859 360.382L-0.437805 359.899C115.97 148.821 391.823 0.5 713.5 0.5C1047.85 0.5 1332.7 160.741 1440.45 385.142L1439.55 385.575C1332.01 161.611 1047.58 1.5 713.5 1.5Z" fill="url(#paint0_linear_1427_3637)" />
                <defs>
                    <linearGradient id="paint0_linear_1427_3637" x1="713.5" y1="1" x2="713.5" y2="584" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#3C4658" />
                        <stop offset="1" stopColor="#133C6C" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            <h2 className='big'>Discover</h2>
            <h4>Explore countless movies and atmospheres from Kinoji's movies library</h4>
            <div className='highlight_wrapper'>
                {[...Array(numberMovies)].map((_, index) =>
                    <div key={`cell+${index}`} className='highlight_cell'>
                        <AnimatePresence>
                            {
                                movies && movies[index].map((movie, id) => (id + roll) % 2 == 0 &&
                                    <motion.div
                                        key={'highlight' + index + '_' + id}
                                        className='highlight'
                                        custom={index}
                                        variants={variants.card}
                                    >
                                        <Banner movie={movie} summary={false} peopleTag={false}/>
                                        <LabelBar hero={false} label='Preview' hyperlink={<ArrowLabel label='see the shots' link={`/movies/${movie.id}`} />} />
                                        <Mosaic movie={movie} random={true} limit={index % 2 ? 12 : 9} />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
}