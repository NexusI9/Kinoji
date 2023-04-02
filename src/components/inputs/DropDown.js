import { useState, useEffect } from 'react';
import { move } from '../../lib/utilities';


const DropDown = ({ list, onChange=(_)=>0, name, id, filter, selected }) => {

    const [expand, setExpand] = useState(false);
    const [organized, setOrganized ] = useState(list);
  
    useEffect(() => {

      console.log(selected);

      if(list && selected){ 
        const index = list.findIndex( ({dropdown}) => dropdown.id === selected.id );
        let newList = [...list]
        move(newList, index < 0 ? 0 : index, 0)
        return setOrganized( newList  );
      }else{
        return setOrganized( [...list] );
      }

  
    },[selected,list])


    
    return(
      <ul name={name} className={expand ? 'dropdown active' : 'dropdown'} id={id} >
        {console.log(organized)}
        {
          organized && organized.map( (item,i) => 
            <li key={'dropdown_item'+i} onClick={ () => {
              setExpand(!expand);
              onChange(item);
            }}>{ filter ? filter(item) : item} </li> 
            )
        }
      </ul>
    );
  
  }

  export default DropDown;