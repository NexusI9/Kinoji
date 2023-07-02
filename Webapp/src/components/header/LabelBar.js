import { useEffect, useState, useRef } from "react";

export default ({label, ico , hyperlink, hero=true, underline=true, sticky=false}) => {

    const [stuck, setStuck] = useState(false);
    const ref = useRef();

    useEffect( () => {
      
      const onScroll = () => {
        
        if(!ref.current){ return; }
        const { top } = ref.current.getBoundingClientRect();
        if(top === 46){ setStuck(true);  }
        else if(top > 46){ setStuck(false); }
      }

      if(sticky && ref.current){
        window.addEventListener('scroll', onScroll);
      }else{
        window.removeEventListener('scroll', onScroll);
      }

      return () => window.removeEventListener('scroll', onScroll);
    },[ref.current]);
    ico = ico ? <span className={'ico bigico '+ ico}></span> : null;
    return(
      <div ref={ref} className={`label-bar ${underline ? 'underline' : '' } ${sticky ? 'sticky' : ''} ${stuck ? 'stuck' : ''}`}>
      { hero ? <h2 className='label'>{ico}{label}</h2> : <h4 className='label'>{ico}{label}</h4>  }
      { hyperlink }
      </div>
    
    );
}