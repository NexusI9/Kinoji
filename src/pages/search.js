import { useRouter} from 'next/router';
import { LabelBar } from '../components/header';
import { Poster, Rubrique, Flow } from '../components/movieobject';
import { Card, TagLabel, ColourLabel } from '../components/inputs';
import { useState, useEffect } from 'react';
import useAPI from '../lib/api';
import { container } from '../lib/variants';
import { motion } from 'framer-motion';
import { getDirectorDate, paramsToArray } from '../lib/utilities';


const ResultText = ({ query, total}) => (
  <div className="result">
    <p>Results for </p> {query}
    <p> ({total} results)</p>
  </div>

);

const GlobalSearch = ({query}) => {

  const [ content, setContent ] = useState();

  const categoryMap = {
        movies: (ar) => ar.map( movie => <Poster key={'querySearchmovie'+movie.id} movie={movie}/> ) ,
        personnalities: (ar, title, type) => ( <><h3>{title}</h3>{ar.map(dir => <Card key={'dircard'+dir.id} label={dir.name} subtext={'('+getDirectorDate(dir)+')'} visual={<img src={dir.poster} />} link={'/'+type+'/'+dir.id}/>)}</> ),
        genres: (ar) => ar.map( genre => <Rubrique key={'rubriquesearch'+genre.name} genre={genre}/> ),
        colours: (ar) => ar.map( colour => <Card key={'colourbox'+colour.family} label={colour.family} link={'/search?colours='+colour.family.toLowerCase()} visual={<span name={colour.family.toLowerCase()} className='ico colours' style={{width:'50px', height:'50px'}}></span>} subtext={'Lookup shots with '+colour.family+' hues'}/>)
  }

  useEffect(() => {
    const {post} = useAPI();
    post({type:'getSuggestion',suggestion:query}).then(result => setContent(result.data) );

  },[query]);

  return(
    <>
    {
      content ?
      <>
        <ResultText query={<i className="paper">&ensp;"{query}"&ensp; </i>} total={content.total} />
        { content.movies.length > 0 ? <div style={{display:'inline-block', width:'100%'}}><LabelBar label='Movies' /><div className='padded'>{categoryMap.movies(content.movies)}</div></div> : <></> }
        { content.directors.length || content.dops.length > 0 ?
          <div id='searchPersonnalities'>
          <LabelBar label={'Personnalities'} />
            <div className='padded'>{categoryMap.personnalities(content.directors,'Directors','director')}</div>
            <div className='padded'>{categoryMap.personnalities(content.dops,'Directors of photography','dop')}</div>
          </div> : <></>
        }
        <div id='searchsplit'>
          { content.genres.length > 0 ?  <div><LabelBar label='Genres' />{ categoryMap.genres(content.genres) }</div> : <></> }
          { content.colours.length > 0 ?  <div><LabelBar label='Aesthetics' />{categoryMap.colours(content.colours) }</div> : <></> }
        </div>
      </> : <></>
    }
    </>
  );
}

const TagSearch = ({tags, colours, subjects}) => {

  const [ movies, setMovies ] = useState([]);

  useEffect(() => {
      const {post} = useAPI();
      if( (tags && !colours) || (tags && colours) ){ post({type:'getMoviesFromTags', tags:paramsToArray(tags)}).then( results => setMovies(results.data) ); }
      else if(colours && !tags){ post({type:'getMoviesFromColours', colours:paramsToArray(colours)}).then( results => setMovies(results.data) ); }

  },[tags, colours]);

  return(
    <>
      {
        movies ?
        <>
          <ResultText query={
            <> &emsp; { tags && paramsToArray(tags).map(tag => <TagLabel key={'taglabel'+tag} label={tag} />) } &emsp;
              { colours && paramsToArray(colours).map(colour => <ColourLabel key={'colourlabel'+colour} label={colour}/>) }
            </>
          }
            total={movies.length}
          />
          <Flow movies={movies} />
        </> : <></>
      }

    </>
  );
}


function Search(){

  const router = useRouter();
  const params = router.query;
  const [ queries, setQueries ] = useState();

  useEffect( () => {
    if( params ){
      const { query, tags, colours, subjects } = params;
      document.title = "KINO寺 - Search" + (query ? ': \"'+ query + "\"" : '');
      setQueries(params);
      console.log(params);
    }

  },[ params ]);

  return(
    <motion.div
      variants={container}
      initial='initial'
      animate='animate'
      exit='exit'
      id='search_container'
    >
      { queries && queries.query && <GlobalSearch query={queries.query} /> }
      { queries &&
        (queries.tags || 
        queries.colours || 
        queries.subjects) && 
        !queries.query && 
        <TagSearch tags={queries.tags} colours={queries.colours}  subjects={queries.subjects} />
      }
    </motion.div>
  );
}

export default Search;
