import { motion } from "framer-motion";
import noposter from '@/assets/noposter.jpg';
import { PeopleLabel } from "../people";
import Link from "next/link";

export default (shot) => (
        <motion.div 
            className="big-thumbnail"
            initial={{opacity:0}}
            animate={{opacity:1, transition:{duration:1}}}
            >
            <Link href={`/movies/${shot.id}/shot/${shot.name}`}><img src={shot.fullpath}/></Link>
            { shot.movie && <div className="big-thumbnail-movie">
                <img src={shot.movie.poster || noposter.src} /> 
                <div>
                    <h4><Link href={`/movies/${shot.movie.id}`}>{shot.movie.title} ({shot.movie.date.split('-')[0]})</Link></h4>
                    <PeopleLabel id={shot.movie.director}/>
                </div>
            </div>}
        </motion.div>
);