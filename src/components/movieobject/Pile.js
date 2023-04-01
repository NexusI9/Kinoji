import { randomInt, shuffle_array } from '../../lib/utilities.js';


const Pile = ({ movies }) => {

  const settings = {
    maxX: 30,
    maxY: 20,
    maxDegree: 30
  }

  shuffle_array(movies);

  const transform = () => {
    const randX = randomInt(-1*settings.maxX, settings.maxX);
    const randY = randomInt(-1*settings.maxY, settings.maxY);
    const randRot = randomInt(-1*settings.maxDegree, settings.maxDegree)+'deg';

    return {
      marginTop:randY+'%',
      marginLeft:randX+'%',
      transform: 'rotate('+randRot+')'
    }

  }

  return(
    <div style={{display:'flex', justifyContent:'center', alignContent:'center', height:'100%', alignItems:'flex-start', paddingTop: 2*settings.maxY+'px'}}>
    {
      movies.map( movie => <img key={'messy_'+movie.id} alt={movie.title + 'poster'} className='messy' style={transform()} src={movie.poster} /> )
    }
    </div>
  );

};

export default Pile;