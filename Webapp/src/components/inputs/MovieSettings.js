import { useState } from 'react';
import { useRouter } from 'next/router';
import Switcher from './Switcher';
import MicroFilters from './MicroFilters';

export default ({onChange, defaultCheck}) => {

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
      },undefined,{scroll:false});
      onChange({ type:"switch", value:e });
    }
  
    const filter = [
      {
        name:'name',
        ico: <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M1 8.4189L2.37336 1.04295C2.38074 1.01432 2.3992 1 2.42874 1H4.03468C4.06422 1 4.08268 1.01432 4.09006 1.04295L5.40804 8.4189C5.41543 8.45469 5.40066 8.47258 5.36374 8.47258H4.13436C4.10483 8.47258 4.08637 8.45469 4.07898 8.4189L3.95715 7.63514H2.45089L2.32906 8.4189C2.32167 8.45469 2.30322 8.47258 2.27368 8.47258H1.0443C1.01477 8.47258 1 8.45469 1 8.4189ZM2.6724 6.48633H3.73564L3.28155 3.46939L3.2151 3.07214L3.17079 3.46939L2.6724 6.48633Z" fill="#DBE4F2"/>
            <path d="M5.81347 12C5.77655 12 5.75809 11.9821 5.75809 11.9463L5.76917 10.776L8.48266 5.75138H5.91315C5.88361 5.75138 5.86885 5.73706 5.86885 5.70843V4.5811C5.86885 4.54531 5.88361 4.52742 5.91315 4.52742H9.92247C9.95939 4.52742 9.97785 4.54531 9.97785 4.5811V5.74064L7.27543 10.7438H9.94462C9.97416 10.7438 9.98892 10.7617 9.98892 10.7975L10 11.9463C10 11.9821 9.98154 12 9.94462 12H5.81347Z" fill="#DBE4F2"/>
        </svg>,

      },
      {
        name:'year',
        ico: <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.2001 2.3H9.6001V3.5H7.8001V2.3H4.2001V3.5H2.4001V2.3H1.8001C1.1395 2.3 0.600098 2.84 0.600098 3.5V10.7C0.600098 11.36 1.1395 11.9 1.8001 11.9H10.2001C10.8601 11.9 11.4001 11.36 11.4001 10.7V3.5C11.4001 2.84 10.8601 2.3 10.2001 2.3ZM10.2001 10.7H1.8001V5.9H10.2001V10.7ZM3.9001 1.1H2.7001V3.2H3.9001V1.1ZM9.3001 1.1H8.1001V3.2H9.3001V1.1Z" fill="#DBE4F2"/>
        </svg>
      },
    ]
  
    return(
      <div id='displayOptions'>
        <section>
          <small>Sort by:</small>
          <div id='microFilters'>
            { filter.map( ({name, ico}) => 
              <MicroFilters 
                  key={name+'_input'} 
                  id={name} 
                  label={name} 
                  name='filter'
                  onChange={ (e) => onChange({type:"radio", value:e }) } 
                  defaultCheck={ defaultCheck === name }
                  ico={ico}
              /> ) }
          </div>
        </section>
  
        <section>
          <small>Display mode:</small>
          <Switcher onChange={ onSwitch } activated={mosaicParam == 1 ? true : false}/>
        </section>
      </div>
    );
  }