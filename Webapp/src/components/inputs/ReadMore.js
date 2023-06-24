import Button from './Button';
import { useState } from 'react';

export default (props) => {

    const [ expanded, setExpanded ] = useState(false);
  
    const onClick = () => {
      setExpanded(!expanded);
      if(props.onClick){ props.onClick(!expanded ? 'revealed' : 'hidden'); }
    }
  
    return(
  
          <div className='readmore' onClick={onClick}>
            <p><small>{!expanded ? 'read more' : 'read less'}</small></p>
            <div className={'ico ' + (!expanded ? 'plus' : 'less')}>
              <span></span>
              <span></span>
            </div>
          </div>
  
    );
  }
  