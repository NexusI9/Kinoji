import { dateToPosition } from './Timeline.helper';

const Segment = ({ object, width, minmax }) => (
    <div className='chrono_segments' style={{ left:dateToPosition(minmax, object.begin, width)+'px' }}>
      <span className='chrono_pillar'><p>{object.begin}</p></span>
      <section>
        <p>{object.header}</p>
        <p className='summary'></p>
        <div className='read_more' style={{display:'none'}}>
          <span className='ico plus'><section></section><section></section></span>
          <p>read more</p>
        </div>
      </section>
      <span className='chrono_pillar' style={{marginLeft: dateToPosition(minmax,object.end, width) - dateToPosition(minmax,object.begin, width) }}>
        <p>{object.end}</p>
      </span>
    </div>
  );

  export default Segment;