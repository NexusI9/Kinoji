import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Spheros } from '../components/misc';
import FetchAPI from '../lib/fetchapi';

const Highway = ({number}) => {

    const [ shots, setShots ] = useState();
  
    useEffect(() => {
         FetchAPI.post({type:'GET_RANDOM_SHOTS', limit:number}).then( result => { return setShots(result.data) });
    }, [number]);
  
    return(
        <div id="highway">
            <Spheros number={5}/>
            {
              shots && shots.map(shot => <Link href={'/movie/'+shot.id+'/shot/'+shot.name} className='floatingShots' key={shot.id+shot.name}><img key={'floating'+shot.path} src={process.env.PUBLIC_URL+shot.path}/><span className='overlay'></span></Link>)
            }
        </div>
    );
  }

  export default Highway;