import { Flow } from '@/components/movieobject';
import { TagLabel, ColourLabel } from '@/components/inputs';
import { useState, useEffect } from 'react';
import useAPI from '@/lib/api';
import { paramsToArray } from '@/lib/utilities';
import ResultText from './ResultText';

export default ({tags, colours, subjects}) => {

    const [ movies, setMovies ] = useState([]);
  
    useEffect(() => {
        const {post} = useAPI();
        const promiseArray = [];
        
        if(tags){
          promiseArray.push( post({type:'getMoviesFromTags', tags:paramsToArray(tags)}).then( ({data}) => ({tags:data || []}) ) );
        }
        if(colours){
          promiseArray.push(  post({type:'getMoviesFromColours', colours:paramsToArray(colours)}).then( ({data}) => ({colours:data || []}) ) );
        }

        Promise.all(promiseArray).then( result => {
           result = {...result[0], ...result[1]};
           const { tags, colours } = result;

           if( tags?.length && colours?.length ){
              //get union of two arrays and replace shots of colours
              const filteredArray = [];
              tags.forEach( tagMovie => {
                colours.forEach( colourMovie => { 
                  if( colourMovie.id === tagMovie.id ){ 
                    tagMovie.shots = colourMovie.shots; //replace with filtered shots from colours
                    filteredArray.push( tagMovie ); //push to filtered array
                  } 
                });
              });
             setMovies(filteredArray);
           }
           else if( tags?.length ){ return setMovies(tags); }
           else if( colours?.length ){ return setMovies(colours); } 
        });

  
    },[tags, colours]);
  
    return(
      <>
        {
          movies &&
          <>
            <ResultText query={
              <> 
                &emsp; 
                { tags && paramsToArray(tags).map(tag => <TagLabel key={'taglabel'+tag} label={tag} />) } 
                &emsp;
                { colours && paramsToArray(colours).map(colour => <ColourLabel key={'colourlabel'+colour} label={colour}/>) }
              </>
            }
            total={movies.length}
            />
            <Flow movies={movies} />
          </>
        }
  
      </>
    );
  }
