import FetchAPI from '../../lib/fetchapi';
import { useState, useEffect } from 'react';
import { Popup, Separator } from '../misc';
import { Banner } from '../header';
import { Poster } from '../movieobject';
import { firstSentenceOf } from '../../lib/utilities';
import { Link } from 'react-router-dom';

const DirectorLabel = ({id, popup=true}) => {

    const [ dir, setDir ] = useState(null);
    const [ hover, setHover ] = useState(false);
    const [ pop, setPop ] = useState();

    const onMouseEnter = (e) =>  setHover(e);
    const onMouseLeave = () => setHover();


    useEffect(() => {

      FetchAPI.post({type:'getDirectorFromId', id:id}).then( result => { return setDir(result.data); });

      if(hover && dir && popup){
        FetchAPI.post({type:'getMoviesFromDir', id:id}).then( result => {
          const movies = result.data;
          setPop({
            content:
              <div>
                <Banner hero={false} visual={<img src={dir.poster || require('../../assets/noposter.jpg')} />} header={dir.name} summary={firstSentenceOf(dir.summary)} spheros={false} />
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
        <Link to={/director/+id} className='underline link' replace>{ dir ? dir.name : ''}</Link>
        { pop ? <Popup content={pop.content}  event={pop.event} margin={20} /> : <></> }
      </div>
  );
}


export default DirectorLabel;