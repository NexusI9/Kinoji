import { useNavigate } from 'react-router-dom';


const SquareButton = ({id, type="arrow"}) => {

    const navigate = useNavigate();
    return(
          <section id={id || ''} className={'squareButton ' + type }> <span id="arrowMenu" onClick={() => navigate(-1)}></span></section>
    )
  }

  export default SquareButton;
  