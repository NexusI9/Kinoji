import { useState, useEffect } from 'react';

import { dateToPosition } from './Timeline.helper';
import { SoloContent, GroupContent } from './Event.children';

const Event = ({ object, type, date, minmax, width, id, ...props}) => {

    const [ opacity, setOpacity ] = useState(0);
    const [ hoverDot, setHoverDot ] = useState(false);
    let activated = false;
    let hoverContent = false;
    const soloGroup = Array.isArray(object) ? 'group' : 'solo';
  
    useEffect( () => setOpacity(props.killswitch ? 0 : 1) ,[props]);
  
    //Inner Elements
    const Label = () => {
      switch(soloGroup){
        case 'solo': return <><div className='longevity'></div><section className='chrono_label'><small><b>{object.label}</b></small></section></>;
        case 'group': return <></>;
        default: return <></>;
      }
    };
    const Number = () => {
      switch(soloGroup){
        case 'solo': return <></>;
        case 'group': return <small>{object.length}</small>;
        default: return <></>;
      }
    }
    const Content = () => {
      switch(soloGroup){
        case 'solo': return <SoloContent object={object} type={type} />;
        case 'group': return <GroupContent object={object} type={type} date={date} />;
        default: return <></>;
      }
    }
  

    //Events
    function onHover(dsp){
      setOpacity( dsp ? 1 : 0);
    }
  
    return(
          <div
            className={'chrono_small_events chrono_'+type+' '+soloGroup }
            style={{left:dateToPosition(minmax, date, width,10)+'px'}}
            >
  
            <span className='dot_events'
              onMouseEnter={ () => { setHoverDot(true); if(props.onHover){ props.onHover(id); } if(!activated){ activated = true; onHover(true); }else{ activated = false; onHover(false); } } }
              onMouseLeave={ () =>  { if(hoverContent) { setHoverDot(false); activated = false; onHover(false); } } }
            >
            <Number />
            </span>
            <Label />
            <section
              className='chrono_event_detail'
              data-poster={object.poster ? 1 : 0}
              style={{ opacity:opacity, zIndex: opacity === 1 ? 20 : 0 }}
              onMouseEnter={ () => {  hoverContent = true; if(activated){ onHover(true); } } }
              onMouseLeave={ () => { setHoverDot(false); hoverContent = false; activated = false; onHover(false); }  }
            >
            { hoverDot ? <Content /> : <></> }
            </section>
          </div>
    );
  
  }
  

  export default Event;