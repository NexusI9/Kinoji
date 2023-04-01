import tmdb from '../../assets/tmdb.svg';

const TMDBLink = ({link}) => (
    <a style={{cursor:'pointer'}} target='_blank' rel="noreferrer" href={link}>
      <img alt='tmdb icon' className='ico bigico' src={tmdb}/>
    </a>
  );
  
  export default TMDBLink;