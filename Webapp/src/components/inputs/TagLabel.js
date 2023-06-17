import { useState, useEffect } from 'react';
import Link from 'next/link';
import useAPI from '../../lib/api';
import { Popup } from '../misc';


export default ({label, discrete=false, popup=true}) => {

    const [ summary, setSummary ] = useState();
    const [pop, setPop] = useState();
    const [hover, setHover] = useState();
    
    const onMouseEnter = (e) => setHover(e);
    const onMouseLeave = () => setHover();
    
    useEffect(() => {
      const {post} =  useAPI();
      post({type:'GET_TAG_SUMMARY', tag:label}).then(result => setSummary(result.data.summary));
    
      if(summary && hover){
        setPop({
          content:<div className='discrete' style={{whiteSpace:'nowrap', display:'block'}}>{summary}</div>,
          event:hover
        });
      }else{
        setPop();
      }
    
    },[label, hover]);
    
    
    return(
      <>
        <Link href={'/search?tags='+label} onMouseEnter={ onMouseEnter } onMouseLeave={onMouseLeave}>
          <span className={discrete ? 'label tagLabel grey' : 'label tagLabel'}>
          <svg className='' version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 1136 1136" style={{enableBackground:'new 0 0 1136 1136'}} xmlSpace="preserve">
            <path d="M1045.1,0H704.2c-24.1,0-47.3,9.6-64.3,26.6L26.6,639.9c-35.5,35.5-35.5,93.1,0,128.7c0,0,0,0,0,0l0,0
              l340.8,340.8c35.5,35.5,93.1,35.5,128.7,0l613.3-613.3c17.1-17.1,26.6-40.2,26.6-64.3V91C1136,40.7,1095.3,0,1045.1,0z M965.3,384.1
              c-58.9,58.9-154.5,58.9-213.4,0c-58.9-58.9-58.9-154.5,0-213.4s154.5-58.9,213.4,0v0l0,0C1024.2,229.7,1024.2,325.2,965.3,384.1z"/>
          </svg>

          <small> {label}</small>
          </span>
        </Link>
        { pop ? <Popup content={pop.content} event={pop.event} /> : <></>}
      </>
      )
    }