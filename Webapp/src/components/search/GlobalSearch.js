import { LabelBar } from '@/components/header';
import { Rubrique } from '@/components/movie';
import { Poster as MoviePoster } from '@/components/movie';
import { Poster as PeoplePoster } from '@/components/people';
import { Card } from '@/components/inputs';
import { useState, useEffect, useRef } from 'react';
import useAPI from '@/lib/api';
import ResultText from './ResultText';
import { TabBar } from '@/components/header';
import { useRouter } from 'next/router';
import { jobFullName } from '@/lib/utilities';

const PEOPLES_JOB = ['director','dop','artdir'];

export default ({ query }) => {

  const router = useRouter();

  const CATEGORY_MAP = {
    movies: (ar) => ar.map(movie => <MoviePoster key={'querySearchmovie' + movie.id} movie={movie} />),
    peoples: (ar, title) => (<><h4>{title}</h4><div className='people-cardlist default-grid'>{ar.map(ppl => <PeoplePoster key={'dircard' + ppl.id} people={ppl} />)}</div></>),
    collections: (ar) => ar.map(genre => <Rubrique key={'rubriquesearch' + genre.name} genre={genre} direction={'horizontal'} />),
    colours: (ar) => ar.map(colour => <Card key={'colourbox' + colour.family} label={colour.family} link={'/search?colours=' + colour.family.toLowerCase()} visual={<span name={colour.family.toLowerCase()} className='ico colours' style={{ width: '50px', height: '50px' }}></span>} subtext={'Lookup shots with ' + colour.family + ' hues'} />)
  }

  const [content, setContent] = useState();
  const [result, setResult] = useState();
  const [type, setType] = useState();
  const rawContent = useRef();


  useEffect(() => {
    const { post } = useAPI();

    setType();
    setResult();

    post({ type: 'GET_SUGGESTION', suggestion: query }).then(({ data }) => {
      rawContent.current = data;
      setResult(data);
    });
  }, [query]);


  useEffect(() => {


    if (!result) { return; }

    if (type) {
      //update query url
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          type: type
        }
      });
    }

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
          <div className='search-personnalities'>
            {PEOPLES_JOB.map( job => {
              const peoplesOfJob = result.peoples.filter(ppl => job === ppl.job);
              return peoplesOfJob.length ? <div>{CATEGORY_MAP[type](peoplesOfJob, jobFullName(job))}</div> : null;
            })}
          </div>
        );
        break;

      case 'collections':
        setContent(<div className='search-collections'>{CATEGORY_MAP[type](result[type])}</div>)
        break;

      case 'colours':
        setContent(<div>{CATEGORY_MAP[type](result[type])}</div>)
        break;

      default:
        let defaultType = CATEGORY_MAP[0];
        for (let category of Object.keys(CATEGORY_MAP)) {
          if (result[category].length) {
            defaultType = category;
            break;
          }
        }

        setType(defaultType);
    }

  }, [type, result]);



  return (
    <>
      {
        (content && result && type) &&
        <>
          <ResultText query={<i className="paper">&ensp;"{query}"&ensp; </i>} total={content.total} />
          <LabelBar label='Search results' underline={false} />
          <TabBar tabs={
            Object.keys(CATEGORY_MAP).map(ctg => {
              const active = result[ctg].length;
              return ({
                name: ctg,
                active: !!active,
                defaultChecked: ctg === type
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
