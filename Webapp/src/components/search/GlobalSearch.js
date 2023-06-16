import { LabelBar } from '@/components/header';
import { Rubrique } from '@/components/movie';
import { Poster as MoviePoster } from '@/components/movie';
import { Poster as PeoplePoster } from '@/components/people';
import { Card } from '@/components/inputs';
import { useState, useEffect, useRef } from 'react';
import useAPI from '@/lib/api';
import ResultText from './ResultText';
import SearchFilter from './SearchFilter';
import { TabBar } from '@/components/header';

export default ({ query }) => {

  const CATEGORY_MAP = {
    movies: (ar) => ar.map(movie => <MoviePoster key={'querySearchmovie' + movie.id} movie={movie} />),
    peoples: (ar, title, type) => (<><h4>{title}</h4><div className='people-cardlist default-grid'>{ar.map(ppl => <PeoplePoster key={'dircard' + ppl.id} people={ppl} />)}</div></>),
    collections: (ar) => ar.map(genre => <Rubrique key={'rubriquesearch' + genre.name} genre={genre} />),
    colours: (ar) => ar.map(colour => <Card key={'colourbox' + colour.family} label={colour.family} link={'/search?colours=' + colour.family.toLowerCase()} visual={<span name={colour.family.toLowerCase()} className='ico colours' style={{ width: '50px', height: '50px' }}></span>} subtext={'Lookup shots with ' + colour.family + ' hues'} />)
  }

  const [content, setContent] = useState();
  const [result, setResult] = useState();
  const [type, setType] = useState(Object.keys(CATEGORY_MAP)[0]);
  const rawContent = useRef();


  const onFilterChange = (filter) => {
    if (rawContent.current) {
      const filteredContent = { ...rawContent.current };

      Object.keys(filter).map(key => {
        if (!filter[key]) {
          if (key === 'movies') { delete filteredContent.movies; }
          if (key === 'peoples') {
            delete filteredContent.dops;
            delete filteredContent.directors;
          }
          if (key === 'collections') { delete filteredContent.collections; }
          if (key === 'aesthetics') { delete filteredContent.colours; }
        }
      });

      setContent({ ...filteredContent });
    }
  };


  useEffect(() => {
    const { post } = useAPI();
    post({ type: 'getSuggestion', suggestion: query }).then(({ data }) => {
      rawContent.current = data;
      setResult(data);
    });
  }, [query]);

  useEffect(() => {

    if(!result){ return; }

    switch (type) {

      case 'movies':
        setContent(
          <div style={{ display: 'inline-block', width: '100%' }}>
            <div className='movie-wrapper default-grid'>{CATEGORY_MAP[type](result[type])}</div>
          </div>
        );
        break;

      case 'peoples':
        setContent(
          <div id='searchPersonnalities'>
            <div>{CATEGORY_MAP[type](result.directors, 'Directors', 'director')}</div>
            {/*<div>{CATEGORY_MAP.peoples(content.dops,'Directors of photography','dop')}</div>
              <div>{CATEGORY_MAP.peoples(content.dops,'Directors of photography','artdir')}</div>*/}
          </div>
        );
        break;

      case 'collections':
        setContent(<div>{CATEGORY_MAP[type](content[type])}</div>)
      break;

      case 'colours':
        setContent(<div>{CATEGORY_MAP[type](content[type])}</div>)
      break;
        


    }

  }, [type, result]);



  return (
    <>
      {
        content &&
        <>
          <ResultText query={<i className="paper">&ensp;"{query}"&ensp; </i>} total={content.total} />
          <LabelBar label='Search results' underline={false} />
          <TabBar tabs={ Object.keys(CATEGORY_MAP).map(ctg => ({ name: ctg }))} name='globalSearch' onChange={ ({name}) => setType(name) }/>
          {content}
        </>
      }
    </>
  );
}
