import { useEffect, useState } from "react"
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/router';

export const BurgerMenu = ({ onClick = _ => 0 }) => {
    const { pathname } = useRouter()
    const [open, setOpen] = useState(false);
    const handleOnClick = () => {
        onClick(!open);
        setOpen(!open);
    };

    useEffect( () => { setOpen(false) },[pathname])    

    return (
        <div className={`burger-menu ${open ? 'active' : ''}`} onClick={handleOnClick}>
            <div className='list'>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className='cross'>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export const Panel = () => {

    const MotionLink = motion(Link);

    const menuItems = [
        { name: 'Movies', href: '/movies' },
        { name: 'Collections', href: '/collections' }
    ];

    return (
        <motion.div
            className="menu-panel"
            initial={{ y: '-100%' }}
            animate={{ y: 0, transition: { duration: 0.3 } }}
            exit={{ y: "-100%", transition: { duration: 0.3 } }}
        >
            {menuItems.map(({ name, href }, i) =>
                <MotionLink
                    href={href}
                    initial={{ y: '-50%', opacity:0 }}
                    animate={{ y: 0, opacity:1, transition: { duration: 0.3, delay:0.2+i/10 } }}
                    exit={{ y: "-50%", opacity:0, transition: { duration: 0.3 } }}
                >{name}</MotionLink>
            )}
        </motion.div>
    );
}