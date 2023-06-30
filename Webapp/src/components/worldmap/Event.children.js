import Link from 'next/link';
import { Fragment } from 'react';

export const SoloContent = ({object, type}) => (
    <>
      { object.poster && object.poster }
      <div className='detail_content'>
          <div className='detail_header'>
            <h4>{object.header}</h4>
            {object.subtext }
          </div>
          <small className='summary'>{object.summary}</small>
          {object.footer}
      </div>
    </>);

export const GroupContent = ({ object, type, date}) =>{

  const ListEvent = ({event}) => (
    <div className='content_list_event'>
        <div className='content'>
          {event.poster && <div style={{width:'30px', flexShrink:0, pointerEvents:'none'}}>{event.poster}</div> }
          <div>
          <p><b>{event.header}</b></p>
          { event.subtext }
          </div>
        </div>
        <div className='hyperlink'>
          {
            event.type === 'movie' ? <Link href={'/movies/'+event.id}><span className='ico eye'></span></Link> : <span target='_blank' href={event.src} className='ico hyperlink'></span>
          }
        </div>
    </div>
  );

  const MovieGroup = () => ( //group of movies
        <div className='content_group_movies'>
          <p><b>{`Movies from ${date}`}</b></p>
          <div className='carousel'>
            { object.map( ({id,poster}) => <Fragment key={'moviegroup'+id}>{poster}</Fragment> )  }
          </div>
        </div>
      );

  const MixedGroup = () => ( //mixed group (movies/ events)
        <div className='content_group_mixed'>
          { object.map( (item,i) => <ListEvent key={'listEvent_mixed'+i} event={item} />) }
        </div>
      );

  const EventGroup = () => ( //group of Events
        <div className='content_group_events'>
          { object.map( (evt,i) => <ListEvent key={'listEvent_event'+i} event={evt} /> ) }
        </div>
      );

  return(
    <div>
      {
        {
          'movies': <MovieGroup />,
          'events': <EventGroup />,
          'mixed': <MixedGroup />
        }[type]
      }
    </div>
  );


}