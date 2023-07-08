import { useState } from 'react';
import { Tag } from '../inputs';
import { LabelBar } from '../header';


export default (props) => {

  const { header, tags, type } = props;
  const onChange = (e) => {
    props.onChange({ type: type, value: e.value, checked: e.state });
  }

  return (
    <div className='tagbox' id={'tagbox_' + header}>
      <LabelBar label={header} hero={false} />
      <div className='tagbox-content'>
        {tags.map((item,i) => <Tag key={'tag_' + item+i} value={item.toLowerCase()} onChange={onChange} />)}
      </div>
    </div>
  );
}