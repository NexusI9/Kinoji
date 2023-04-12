import { useState } from 'react';
import { useRouter } from 'next/router';
import Switcher from './Switcher';
import MicroFilters from './MicroFilters';

const MovieSettings = (props) => {

    const [mosaic, setMosaic] = useState(false);
    const router = useRouter();
    const mosaicParam = router.query.mosaic;
  
  
    const onSwitch = (e) => {
      router.push({
            pathname: router.pathname, 
            query: {
            ...router.query, 
            mosaic: e ? 1 : 0
          }
      });
      props.onChange({ type:"switch", value:e });
    }
  
    const filter = {
      name:'filter',
      inputs:['name','year']
    }
  
    return(
      <div id='displayOptions'>
        <section>
          <small>Order by</small>
          <div id='microFilters'>
            { filter.inputs.map( (item,i) => <MicroFilters key={item+'_input'} id={item} label={item} name={filter.name} onChange={ (e) => props.onChange({type:"radio", value:e }) } defaultCheck={props.defaultCheck === item}/> ) }
          </div>
        </section>
  
        <section>
          <small>Display mode</small>
          <Switcher onChange={ onSwitch } activated={mosaicParam == 1 ? true : false}/>
        </section>
      </div>
    );
  }

  export default MovieSettings;