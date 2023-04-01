import { useState, useEffect } from 'react';
import { move } from '../../lib/utilities';


const DropDown = ({ list, onChange=(_)=>0, name, id, selected }) => {

    const [ active, setActive ] = useState(false);
    const [ organized, setOrganized ] = useState();
  
    useEffect(() => {
      if(list && selected ){
        const sel = selected;
        const index = list.findIndex( item => item.key === sel.key );
        move(list, index, 0);
      }
  
      setOrganized( [...list] );
  
    },[selected, list])
  
    const onClick = (slt) => active && onChange(slt);
  
    const ListElement = ({value, item, switchActive = false}) => (
      <div value={value} onClick={ () => { onClick(item); if(switchActive){ setActive(!active); } } }>{item}</div>
    )
  
  
  
    return(
      <ul name={name} className={active ? 'dropdown active' : 'dropdown'} id={id} >
        {
          organized ? organized.map( (item,i) => {
              if(!active){ return <ListElement key={'dropdown_'+item.props.value} value={item.props.value} item={item} switchActive={i === 0} /> }
              else{ return <ListElement key={'dropdown_'+item.props.value} value={item.props.value} item={item} switchActive={true} /> }
          }) : <></>
        }
      </ul>
    );
  
  }

  export default DropDown;