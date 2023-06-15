import noposter from '@/assets/noposter.jpg';
import Link from 'next/link';

export default ({people}) => (
    <Link className='people-poster' href={`director/${people.id}`}>
        <img src={people.poster || noposter.src} alt={`${people.name} portrait`}/>
    </Link>
)