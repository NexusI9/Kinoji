import { Link } from 'react-router-dom';



const ColourLabel = ({label, discrete=false}) => (
    <Link to={'/search?colours='+label} >
      <span className={discrete ? 'label tagLabel colours grey' : 'label tagLabel colours'}>
        <span name={label} className={'ico small colours'}></span>
        {label}
      </span>
    </Link>
  )

  export default ColourLabel;
  