//Movie Objects
import { Link } from 'react-router-dom';

const Thumbnail = ({movie, shot, replace=false}) => (
  <Link key={'thumbnail_'+shot} to={'/movie/'+movie.id+'/shot/'+shot} replace={replace}>
      <div className='thumb' >
        <img object={movie.id} alt={shot} src={process.env.PUBLIC_URL+"/assets/movies/"+movie.folder+"/thumbnails/"+shot+".jpg"} />
        <section className='overlay'></section>
      </div>
  </Link>
);

export default Thumbnail;