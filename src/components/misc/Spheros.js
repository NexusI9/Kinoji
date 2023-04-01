import { randomInt } from '../../lib/utilities';


const Spheros = ({ number }) =>{

  const settings = {
    maxRadius: 30,
    minRadius: 20,
  }
  const transform = (seg) =>{

    //better disparity
    const percent = seg * 100 / number

    const randRad = randomInt(settings.minRadius, settings.maxRadius);
    const randX = percent;
    const randY = randomInt(0 , 100);

    return {
      transform:`translate(${randX}vw, ${randY}%)`,
      width: `${randRad}vw`,
      height: `${randRad}vw`
    }
  }

  const ar = [];
  for(let i = 0; i < number; i++){
    ar.push( <span key={`spheros_${i}`} style={transform(i)}></span> );
  }

  return(
    <>
    <section className='spheros'>
    {ar}
    </section>
    </>
  )

}

export default Spheros;