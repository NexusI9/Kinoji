import { LabelBar } from '@/components/header';
import { Rubrique } from '@/components/movie';
import { Poster as MoviePoster } from '@/components/movie';
import { Poster as PeoplePoster } from '@/components/people';
import { jobFullName } from '@/lib/utilities';
import { Card } from '@/components/inputs';
import { useState, useEffect, useRef } from 'react';
import useAPI from '@/lib/api';
import ResultText from './ResultText';
import { TabBar } from '@/components/header';
import { useRouter } from 'next/router';

export default ({ query }) => {

  const router = useRouter();

  const CATEGORY_MAP = {
    movies: (ar) => ar.map(movie => <MoviePoster key={'querySearchmovie' + movie.id} movie={movie} />),
    peoples: (ar, title) => (<><h4>{title}</h4><div className='people-cardlist default-grid'>{ar.map(ppl => <PeoplePoster key={'dircard' + ppl.id} people={ppl} />)}</div></>),
    collections: (ar) => ar.map(genre => <Rubrique key={'rubriquesearch' + genre.name} genre={genre} />),
    colours: (ar) => ar.map(colour => <Card key={'colourbox' + colour.family} label={colour.family} link={'/search?colours=' + colour.family.toLowerCase()} visual={<span name={colour.family.toLowerCase()} className='ico colours' style={{ width: '50px', height: '50px' }}></span>} subtext={'Lookup shots with ' + colour.family + ' hues'} />)
  }

  const [content, setContent] = useState();
  const [result, setResult] = useState();
  const [type, setType] = useState(router.query.type || Object.keys(CATEGORY_MAP)[0]);
  const rawContent = useRef();


  useEffect(() => {
    const { post } = useAPI();
    post({ type: 'getSuggestion', suggestion: query }).then(({ data }) => {
      rawContent.current = data;
      setResult(data);
    });
  }, [query]);

  useEffect(() => {

    if (!result) { return; }

    //update query url
    router.push({
      pathname:router.pathname,
      query:{
        ...router.query,
        type:type
      }
    });

    //set content
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
          <div id='search-personnalities'>
            { result.directors.length ? <div>{CATEGORY_MAP[type](result.directors, 'Directors')}</div> : <></>}
            { result.dops.length ? <div>{CATEGORY_MAP[type](result.dops, 'Directors of photography')}</div> : <></>}
            { result.artdirs.length ? <div>{CATEGORY_MAP[type](result.artdirs, 'Art Director')}</div> : <></>}
          </div>
        );
        break;

      case 'collections':
        setContent(<div>{CATEGORY_MAP[type](result[type])}</div>)
        break;

      case 'colours':
        setContent(<div>{CATEGORY_MAP[type](result[type])}</div>)
        break;



    }

  }, [type, result]);



  return (
    <>
      {
        content && result &&
        <>
          <ResultText query={<i className="paper">&ensp;"{query}"&ensp; </i>} total={content.total} />
          <LabelBar label='Search results' underline={false} />
          <TabBar tabs={
            Object.keys(CATEGORY_MAP).map(ctg => {
              const active = (ctg !== 'peoples') ? result[ctg].length : [...result['dops'],...result['directors'], ...result['artdirs']].length; //combine peoples length
              return({
                name:ctg,
                active:!!active
              });
            })
          }
            name='globalSearch'
            onChange={({ name }) => setType(name)
            } />
          {content}
        </>
      }
    </>
  );
}
