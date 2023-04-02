import { useState, useEffect } from 'react';
import { move } from '../../lib/utilities';


const DropDown = ({ list, onChange=(_)=>0, name, id, filter, selected }) => {

    const [expand, setExpand] = useState(false);
    const [organized, setOrganized ] = useState(list);

    const handleOnClick = (item) => {
      setExpand(!expand);
      onChange(item);
    }
  
    useEffect(() => {

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
          {organized.map( (item,i) => i === 0 &&  
            <li key={'dropdown_item'+i} onClick={ () => handleOnClick(item) }>
                { filter ? filter(item) : item} 
                <svg className='arrow' width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.40008 -3.67174e-07L4.90005 3.5L8.40005 -6.11959e-08L9.80005 0.7L4.90005 5.6L7.91244e-05 0.699999L1.40008 -3.67174e-07Z" />
                </svg>
            </li> )}

          <ul>
          { organized.map( (item,i) => i > 0 &&
            <li key={'dropdown_item'+i} onClick={ () => handleOnClick(item) }>{ filter ? filter(item) : item} </li> 
            )
            }
          </ul>

      </ul>
    );
  
  }

  export default DropDown;