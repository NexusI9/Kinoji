import { Spheros } from '../misc';
import ExpandableText from './ExpandableText';
import { InfoTag } from '../header';

const Banner = ({ hero=true, visual, header, summary, sources, spheros=false, category}) => {

    return(
      <div className='bannerFilter'>
          {spheros && <Spheros />}
          <div className='visual'>{visual}</div>
          <div>
          <div className='title'>
          {hero ? <h1>{header}</h1> : <h3>{header}</h3>}
          {category &&  <InfoTag>{category}</InfoTag> }
          </div>
          <br></br>
          <ExpandableText paragraph={summary} height={200}/>
        </div>
      </div>
  
    );
  
  }

  export default Banner;