import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { setParam } from '../../lib/utilities';
import Switcher from './Switcher';
import MicroFilters from './MicroFilters';

const MovieSettings = (props) => {

    const [mosaic, setMosaic] = useState(false);
    const [ params, setParams ] = useSearchParams({});
    const mosaicParam = params.get('mosaic');
    const location = useLocation();
  
  
    const onSwitch = (e) => {
      setParams(  setParam(location, {mosaic: e ? 1 : 0})  );
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