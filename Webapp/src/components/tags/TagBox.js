import { useState } from 'react';
import { Tag } from '../inputs';
import { LabelBar } from '../header';

export default (props) => {

    const { header, tags, type } = props;
    const [ tagChain, setTagChain ] = useState([]);
    const onChange = (e) =>{
  
      setTagChain(setTagArray({
        array:tagChain,
        value:e.value,
        action: e.state ? 'add' : 'remove'
      }));
  
      props.onChange( {type:type, actives:tagChain} );
    }
  
    return(
      <div className='tagbox' id={'tagbox_'+header}>
          <LabelBar label={header}/>
          { tags.map(item => <Tag key={'tag_'+item} value={item.toLowerCase()} onChange={ onChange }/>) }
      </div>
    );
  }