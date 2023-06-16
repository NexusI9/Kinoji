import { LabelBar } from '@/components/header';
import { Poster, Rubrique} from '@/components/movie';
import { Card } from '@/components/inputs';
import { useState, useEffect, useRef } from 'react';
import useAPI from '@/lib/api';
import { getDirectorDate } from '@/lib/utilities';
import ResultText from './ResultText';
import noposter from '@/assets/noposter.jpg';
import SearchFilter from './SearchFilter';

export default ({query}) => {

    const [ content, setContent ] = useState();
    const rawContent = useRef();

    const onFilterChange = (filter) => {
      if(rawContent.current){
        const filteredContent = {...rawContent.current};

        Object.keys(filter).map( key => {
          if(!filter[key]){
            if(key === 'movies'){ delete filteredContent.movies; }
            if(key === 'personnalities'){ 
              delete filteredContent.dops; 
              delete filteredContent.directors; 
            }
            if(key === 'collections'){ delete filteredContent.genres; }
            if(key === 'aesthetics'){ delete filteredContent.colours; }
          }
        });

        setContent({...filteredContent});
      }
    };

    const categoryMap = {
          movies: (ar) => ar.map( movie => <Poster key={'querySearchmovie'+movie.id} movie={movie}/> ) ,
          personnalities: (ar, title, type) => ( <><h4>{title}</h4>{ar.map(dir => <Card key={'dircard'+dir.id} label={dir.name} subtext={ getDirectorDate(dir) && '('+getDirectorDate(dir)+')' || ''} visual={<img src={dir.poster || noposter.src} />} link={'/'+type+'/'+dir.id}/>)}</> ),
          genres: (ar) => ar.map( genre => <Rubrique key={'rubriquesearch'+genre.name} genre={genre}/> ),
          colours: (ar) => ar.map( colour => <Card key={'colourbox'+colour.family} label={colour.family} link={'/search?colours='+colour.family.toLowerCase()} visual={<span name={colour.family.toLowerCase()} className='ico colours' style={{width:'50px', height:'50px'}}></span>} subtext={'Lookup shots with '+colour.family+' hues'}/>)
    }
  
    useEffect(() => {
      const {post} = useAPI();
      post({type:'getSuggestion',suggestion:query}).then( ({data}) => { 
        setContent(data) 
        rawContent.current = data;
      });
    },[query]);


  
    return(
      <>
      {
        content &&
        <>
        
          <ResultText query={<i className="paper">&ensp;"{query}"&ensp; </i>} total={content.total} />
          <LabelBar label='Search results' underline={false} hyperlink={ <SearchFilter items={content} onChange={onFilterChange} /> }/>
          
          { content.movies?.length && 
                <div style={{display:'inline-block', width:'100%'}}>
                    <LabelBar label='Movies' hero={false}/>
                    <div className='movie-wrapper'>{categoryMap.movies(content.movies)}</div>
                </div> 
                
            }
          { (content.directors?.length || content.dop?.length) &&
            <div id='searchPersonnalities'>
                <LabelBar label={'Personnalities'} hero={false}/>
                <div>{categoryMap.personnalities(content.directors,'Directors','director')}</div>
                {/* <div>{categoryMap.personnalities(content.dops,'Directors of photography','dop')}</div>*/}
            </div>
          }
          { (content.genres || content.colours) &&
            <div>
            {  content.genres && content.genres.length && <div><LabelBar label='Genres' hero={false} />{ categoryMap.genres(content.genres) }</div>  }
            {  content.colours && content.colours.length && <div><LabelBar label='Aesthetics' hero={false} />{ categoryMap.colours(content.colours) }</div> }
          </div>
          }
        </>
      }
      </>
    );
  }
  