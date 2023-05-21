import Banner from "./Banner";
import Mosaic from "./Mosaic";

const Bundle = ({ movie, masonry, summary=false, linked=true, spheros=false, onThumbsLoaded=()=>0 }) => (
    <div className={ masonry ? 'movie_contain movie_object dynamic masonry': 'movie_contain movie_object dynamic' } key={'movieblock_'+movie.id}>
      <Banner movie={movie} summary={summary} linked={linked} spheros={spheros}/>
      <Mosaic movie={movie} onThumbsLoaded={onThumbsLoaded} />
    </div>);

export default Bundle;