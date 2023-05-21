import { useRouter } from 'next/router';


const SquareButton = ({id, type="arrow"}) => {

    const router = useRouter();
    return(
          <section id={id || ''} className={'squareButton ' + type }> <span id="arrowMenu" onClick={() => router.back()}></span></section>
    )
  }

  export default SquareButton;
  