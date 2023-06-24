import { Spheros } from '../misc';
import ExpandableText from './ExpandableText';
import { InfoTag } from '../header';

export default ({ hero = true, visual, header, summary, sources, spheros = false, category }) => {

  return (
    <header className='bannerFilter'>
      {spheros && <Spheros />}
      <div className='visual'>{visual}</div>
      <div>
        <div className='title'>
          {hero ? <h1>{header}</h1> : <h3>{header}</h3>}
          {category && <InfoTag>{category}</InfoTag>}
        </div>
        <ExpandableText
          paragraph={summary}
          height={200}
          footer={sources &&
            <div className='sources'>
              <h4>Sources</h4>
              <ul>{sources.split(';').map( src => <li><a href={src} target='_blank'><small>{src}</small></a></li> )}</ul>
            </div>
          }
        />
      </div>
    </header>

  );

}
