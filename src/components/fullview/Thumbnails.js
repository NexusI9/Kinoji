import { Thumbnail } from '../movieobject';
import { sortThumbnails } from '../../lib/utilities';


const Thumbnails = ({movie}) => {

    let shots = movie.shots.split(';');
    shots = sortThumbnails(shots);

    return(
      <section id="thumbFrame">
      { shots.map( thumb => <Thumbnail key={thumb} movie={movie} shot={thumb} replace={true}/> ) }
      <span className="deg"></span>
      </section>
    );

}

export default Thumbnails;