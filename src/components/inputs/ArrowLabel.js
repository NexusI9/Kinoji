
import { Link } from 'react-router-dom';


const ArrowLabel = ({ label, link, ico='smallarrow' }) => (
    <Link to={link} className='arrowlabel'><small>{label}</small><span className={`ico ${ico}`}></span></Link>
  );

export default ArrowLabel;