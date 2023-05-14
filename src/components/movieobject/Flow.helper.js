import { getMovieYear } from '../../lib/utilities.js';
import { XMasonry, XBlock } from 'react-xmasonry';
import Poster from './Poster.js';
import Bundle from './Bundle.js';

//elements
const poster = (mvl) => mvl.map( movie => <Poster key={'poster_'+movie.id} movie={movie} />);
const mosa = (mvl) => mvl.map( (movie,index) => <Bundle key={'bundle'+movie.id+index} movie={movie} masonry={ mvl.length > 1 }/>);
const mason = (ar) => ar.map(item => <XBlock key={'xblock'+item.key}>{item}</XBlock>);

//infinit scroll
let cursor = 0;
const step = 4;
const MASONRY_ARRAY = [];

const split = (array) => {
    const old_cursor = cursor;
    cursor += step;
    return array.slice(old_cursor, cursor);
}

 //utilities
export const sortBy = (filter, mvl) => {

    switch(filter){

        case 'year':
        return [...mvl.sort( (a,b) => getMovieYear(a) - getMovieYear(b) ) ];
        break;

        case 'name':

        default:
        return [...mvl.sort( (a,b) => {
            if(a.title[0] < b.title[0]){ return -1; }
            if(a.title[0] > b.title[0]){ return 1; }
            return 0;
        })];

    }
}
  
export const generateContent = ({movie_list, is_mosaic}) => {

    if (movie_list.length === 1){ return( <>{mosa(movie_list)}</> ); } //solo movie
    if( movie_list.length === MASONRY_ARRAY.length && is_mosaic ){ return null; } //end flow
    
    if ( !is_mosaic ){   // poster mode
         cursor = 0;
         MASONRY_ARRAY.length = 0;
         return ( <>{ poster(movie_list) }</> ); 
    } 

    else{ //flow mode
        
        MASONRY_ARRAY.push(...split(movie_list));
        
        return (
        <XMasonry key='xmasonry-movies' maxColumns={2} center={false} responsive={false} targetBlockWidth={window.innerWidth/2} >
            { mason(mosa(MASONRY_ARRAY)) }
        </XMasonry>
        );
 

    }// masonry mode
}

