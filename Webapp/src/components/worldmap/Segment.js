import { useEffect, useRef, useState } from 'react';
import { dateToPosition } from './Timeline.helper';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';

export default ({ object, width, minmax, token }) => {

  const activeSegment = useSelector( state => state.segment.active?.token );
  const [active, setActive] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (ref.current) {
      dispatch({type:'PUSH_SEGMENT', segment:{
        ...object,
        token:token,
        node:ref.current
      }});
    }
  }, []);

  useEffect( () => { setActive(token === activeSegment); },[activeSegment])

  return (
    <div className={`chrono_segments ${active && 'active' || ''}`} ref={ref} style={{ left: dateToPosition(minmax, object.begin, width) + 'px' }}>
      <span className='chrono_pillar'><p>{object.begin}</p></span>
      <section>
        <p>{object.header}</p>
        <p className='summary'></p>
        <div className='read_more' style={{ display: 'none' }}>
          <span className='ico plus'><section></section><section></section></span>
          <p>read more</p>
        </div>
      </section>
      <span className='chrono_pillar' style={{ marginLeft: dateToPosition(minmax, object.end, width) - dateToPosition(minmax, object.begin, width) }}>
        <p>{object.end}</p>
      </span>
    </div>);
};