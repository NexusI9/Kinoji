import { Thumbnail } from '../movieobject';
import { sortThumbnails } from '../../lib/utilities';


export default ({movie}) => {

    let shots = movie.shots.split(';');

    return(
      <section id="thumbFrame">
      { shots.map( thumb => <Thumbnail key={thumb} movie={movie} shot={thumb} replace={true}/> ) }
      <span className="deg"></span>
      </section>
    );

}