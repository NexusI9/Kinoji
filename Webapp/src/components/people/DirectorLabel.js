import useAPI from '@/lib/api';
import React, { useState, useEffect } from 'react';
import { Popup, Separator } from '../misc';
import { Banner } from '../header';
import { Poster } from '../movie';
import { firstSentenceOf } from '@/lib/utilities';
import Link from 'next/link';

import noposter from '@/assets/noposter.jpg';

export default ({id, popup=true}) => {

    const [ dir, setDir ] = useState([]);
    const [ hover, setHover ] = useState(false);
    const [ pop, setPop ] = useState();

    const onMouseEnter = (e) =>  setHover(e);
    const onMouseLeave = () => setHover();


    useEffect(() => {
      const { post } = useAPI();
      post({type:'getDirectorFromId', id:id}).then( ({data}) => setDir(data) );

      if(hover && dir.length && popup){
          post({type:'getMoviesFromDir', id:id}).then( result => {
          const movies = result.data;
          setPop({
            content:
              <div>
                {dir.map( ({poster, name, summary}) => <React.Fragment key={`directorlabelpopup${name}`}><Banner hero={false} visual={<img src={poster || noposter.src} />} header={name} summary={firstSentenceOf(summary)} spheros={false} /></React.Fragment> )}
                <Separator />
                <h4>Movies { movies ? '('+movies.length+')' : ''}</h4>
                {movies.map(movie => <Poster key={'poster'+movie.id} movie={movie} size='small' />)}
              </div>,
            event:hover
          });

        });
      }else{
        setPop();
      }

      return () => setPop();

    },[id, hover]);

    return (
      <div style={{display:'inline-block'}}  onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave } >
        {dir.map( ({id, name}) => <Link key={`dir${id}`} href={/director/+id} className='link' replace>{name}</Link> ) }
        { pop && <Popup content={pop.content}  event={pop.event} margin={20} /> }
      </div>
  );
}
