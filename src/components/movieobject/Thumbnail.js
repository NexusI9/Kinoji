//Movie Objects
import Link from 'next/link';

const Thumbnail = ({movie, shot, replace=false}) => (
  <Link key={'thumbnail_'+shot} href={'/movies/'+movie.id+'/shot/'+shot} replace={replace}>
      <div className='thumb' >
        <img alt={shot} src={"/assets/movies/"+movie.folder+"/thumbnails/"+shot+".jpg"} />
        <section className='overlay'></section>
      </div>
  </Link>
);

export default Thumbnail;