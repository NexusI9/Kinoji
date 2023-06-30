import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dateToPosition } from './Timeline.helper';
import { SoloContent, GroupContent } from './Event.children';
import { AnimatePresence, motion } from 'framer-motion';


export default ({ object, type, date, minmax, width, id }) => {

  const [opacity, setOpacity] = useState(0);
  let activated = useRef();
  const lastActive = useSelector(state => state.timeline.token);
  const setActive = useDispatch();
  const timeout = useRef();
  const SOLO_OR_GROUP = Array.isArray(object) ? 'group' : 'solo';

  useEffect(() => setOpacity(lastActive === id ? 1 : 0), [lastActive]);

  const handleOnMouseLeave = () => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (!activated.current) {
        setOpacity(0);
        setActive({ type: 'SET_ACTIVE_POPUP', token: 0 });
      }
    }, 20);

    activated.current = false;
  }
  //Inner Elements
  const Label = () => ({
      solo: <>
              <div
                className='longevity'
                style={{ width: date[1] && dateToPosition(minmax, date[1], width, 10) - dateToPosition(minmax, date[0], width, 10) + 'px' }}
              ></div>
              <section className='chrono_label'><small><b>{object.label}</b></small></section>
            </>
  })[SOLO_OR_GROUP] || <></>;

  const Number = () => ({
      group: <small>{object.length}</small>
  })[SOLO_OR_GROUP] || <></>;

  const Content = () => ({
      solo: <SoloContent object={object} type={type} />,
      group: <GroupContent object={object} type={type} date={date[0]} />
  })[SOLO_OR_GROUP] || <></>;


  //Events
  return (
    <div
      className={'chrono_small_events chrono_' + type + ' ' + SOLO_OR_GROUP}
      style={{ left: dateToPosition(minmax, date[0], width, 10) + 'px' }}
    >

      <span className='dot_events'
        onMouseEnter={() => {
          activated.current = true;
          setOpacity(1);
          setActive({ type: 'SET_ACTIVE_POPUP', token: id });
        }}
        onMouseLeave={handleOnMouseLeave}
      >
        <Number />
      </span>
      <Label />
      <AnimatePresence mode='wait'>
        {opacity &&
          <motion.section
            className='chrono_popup'
            key={'popup_' + id}
            initial={{ opacity: 0, zIndex: 0 }}
            animate={{ opacity: 1, zIndex: 20, transition: { duration: 0.1 } }}
            exit={{ opacity: 0, zIndex: 0, transition: { duration: 0.1 } }}
            onMouseEnter={() => activated.current = true}
            onMouseLeave={handleOnMouseLeave}
          >
            <Content />
          </motion.section>
        }
      </AnimatePresence>
    </div>
  );

}