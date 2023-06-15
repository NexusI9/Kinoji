import Button from './Button';
import { useState } from 'react';

export default (props) => {

    const [ state, setState ] = useState(false);
  
    const onClick = () => {
      setState(!state);
      if(props.onClick){ props.onClick(!state ? 'revealed' : 'hidden'); }
    }
  
    return(
  
          <div className='readmore'>
            <span></span>
            <Button label={!state ? 'read more' : 'read less'} onClick={onClick} />
          </div>
  
    );
  }
  