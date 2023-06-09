import { BigThumbnail } from '@/components/movie';
import { TagLabel, ColourLabel } from '@/components/inputs';
import { useState, useEffect, useRef } from 'react';
import { paramsToArray } from '@/lib/utilities';
import ResultText from './ResultText';
import { scrollReachBottom } from '@/lib/utilities';
import { loadShots } from './ShotSearch.helper';


/*<ResultText
  query={
    <>
      &emsp;
      {tags && paramsToArray(tags).map(tag => <TagLabel key={'taglabel' + tag} label={tag} />)}
      &emsp;
      {colours && paramsToArray(colours).map(colour => <ColourLabel key={'colourlabel' + colour} label={colour} />)}
    </>
  }
  total={shots.length}
/>*/
export default ({ shotsList, tags, colours, subjects, step = 10 }) => {

  const [shots, setShots] = useState([]);
  const [load, setLoad] = useState(false);
  const [start, setStart] = useState(step);


  useEffect(() => {
    const onScroll = () => (scrollReachBottom() && !load) && setLoad(true);
    window.addEventListener('scroll', onScroll);
    setLoad(true);
    setShots([]);
    setStart(step);
    return () => window.removeEventListener('scroll', onScroll);
  }, [colours, tags, subjects]);



  useEffect(() => {

    if (load) {
      loadShots({
        colours: colours,
        tags: tags,
        stop: start
      }).then(shots => {
        console.log(shots);
        setShots(shots);
        setLoad(false);
        setStart(start + step);
      });
    }

  }, [load, tags, colours]);

  return (
    <div className='shot-gallery'>
      {shots?.map(shot => <BigThumbnail key={shot.fullpath} {...shot} />)}
    </div>
  );
}
