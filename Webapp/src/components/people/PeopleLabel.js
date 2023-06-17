import useAPI from '@/lib/api';
import { Fragment, useState, useEffect } from 'react';
import { Popup } from '../misc';

import { Banner, InfoTag } from '../header';
import { Poster } from '../movie';
import { firstSentenceOf, jobFullName } from '@/lib/utilities';
import Link from 'next/link';

import noposter from '@/assets/noposter.jpg';

export default ({ id, popup = true }) => {

  const [dir, setDir] = useState([]);
  const [hover, setHover] = useState(false);
  const [pop, setPop] = useState();

  const onMouseEnter = (e) => setHover(e);
  const onMouseLeave = () => setHover();


  useEffect(() => {
    const { post } = useAPI();
    post({ type: 'GET_PEOPLE_FROM_ID', id: id }).then(({ data }) => setDir(data));

    if (hover && dir.length && popup) {
      post({ type: 'GET_MOVIES_FROM_PEOPLE', id: id }).then(result => {
        const movies = result.data;
        setPop({
          content:
            <>
              {dir.map(({ poster, name, summary }) =>
                <Fragment key={`directorlabelpopup${name}`}>
                  <Banner
                    hero={false}
                    visual={<img src={poster || noposter.src} />}
                    header={name}
                    summary={firstSentenceOf(summary)}
                    spheros={false} />
                </Fragment>
              )}
              <hr/>
              <h4>Movies {movies?.length && <span className='amount-pill'>{movies.length}</span>}</h4>
              <div className='default-grid'>
                {movies.map(movie => <Poster key={'poster' + movie.id} movie={movie} size='small' />)}
              </div>
            </>,
          event: hover
        });

      });
    } else {
      setPop();
    }

    return () => setPop();

  }, [id, hover]);

  return (
    <div style={{ display: 'inline-block' }} >
      {dir.map(({ id, name }) => <Link  onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} key={`dir${id}`} href={`/people/${id}`} className='link' replace>{name}</Link>)}
      <InfoTag>{jobFullName(dir.map( ({job}) => job ))}</InfoTag>
      {pop && <Popup content={pop.content} event={pop.event} margin={20} />}
    </div>
  );
}
