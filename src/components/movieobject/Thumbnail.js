//Movie Objects
import Link from 'next/link';
import { useState } from 'react';

const Thumbnail = ({movie, shot, replace=false, onLoad=()=>0}) => {

  const [loaded,setLoaded] = useState(false); 

  return(
    <Link key={'thumbnail_'+shot} href={'/movies/'+movie.id+'/shot/'+shot} replace={replace}>
        <div className={`thumb ${!loaded ? 'unloaded' : ''}`}>
          <img alt={shot} src={"/assets/movies/"+movie.folder+"/thumbnails/"+shot+".jpg"} onLoad={() => { setLoaded(true); onLoad(); }}/>
          <section className='overlay'></section>
        </div>
    </Link>
  );
}

export default Thumbnail;