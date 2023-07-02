import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from 'framer-motion';


const VALUES = [
    {
        value: "+200",
        content: "movies"
    },
    {
        value: "+11K",
        content: "HD stills"
    },
    {
        value: <svg width="256" height="96" viewBox="0 0 256 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M218.174 0.999909C196.227 0.730099 181.147 14.8232 169.254 26.6408C171.462 31.2366 176.435 41.5073 177.494 43.378C187.125 33.521 199.171 21.1997 212.995 21.1997H213.3C228.048 21.1997 236.064 32.9634 233.829 49.2419C232.258 60.6998 222.097 75.4764 207.053 75.4764C195.069 75.4764 187.915 70.4669 176.291 53.2081C175.357 51.8321 163.473 29.285 162.872 28.3136C152.369 11.2797 139.12 0.999909 119.759 0.999909C93.2698 0.999909 70.4073 20.6061 66.5206 48.9541C62.6249 77.3021 81.1339 95.9999 104.311 95.9999C124.498 95.9999 139.614 84.8028 154.766 69.4237C153.797 67.9847 146.445 56.0051 145.386 54.1794C135.018 64.9448 123.107 75.4944 109.831 75.4944H109.526C95.074 75.4944 85.5951 63.4339 87.8481 49.2599C90.1281 32.6756 101.33 21.2176 116.078 21.2176C132.101 21.2176 139.461 32.6576 147.334 46.193C148.034 47.3982 160.565 68.0926 161.31 69.2258C175.42 90.6217 189.441 95.9999 203.929 95.9999C226.504 95.9999 251.216 78.2105 255.443 47.4432C259.294 19.4009 242.518 1.30569 218.174 0.999909Z" fill="#DBE4F2" />
            <path d="M22.8496 29.2057H38.4003L35.8085 47.5837H53.3619L51.3591 62.1919H33.688L31.0962 80.6877H15.6634L18.3729 62.1919H0.81958L2.82231 47.5837H20.3757L22.8496 29.2057Z" fill="#DBE4F2" />
        </svg>,
        content: "inspiration"
    },
];

export default () => {

    const [display, setDisplay] = useState(false);
    const container = useRef();
    const controls = useAnimationControls();

    useEffect(() => {

        const onScroll = () => {
            
            if(!container.current){return;}
            const { top } = container.current.getBoundingClientRect();

            if(top < window.innerHeight/2){
                setDisplay(true);
                controls.start( i => ({opacity:1, y:0, x:'-0.5em', transition:{duration: 0.6, delay: i/20}}));
            }
        }

        if (container.current && !display) { 
            window.addEventListener('scroll', onScroll); 
            onScroll(); //first check
        }
        if(display){ window.removeEventListener('scroll', onScroll); }


        return () => window.removeEventListener('scroll', onScroll);
    }, [display]);

    return (
        <section ref={container} className='amount-container'>
             {VALUES.map(({ value, content },i) =>
                <motion.h3
                    key={value}
                    initial={{opacity:0, y:200, x:'-0.5em'}}
                    animate={controls}
                    custom={i}
                >
                    {value}
                    <span>{content}</span>
                </motion.h3>
            )}
        </section>
    );
}