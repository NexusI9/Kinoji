
import Link from 'next/link';


const ArrowLabel = ({ label, link, ico='smallarrow', children }) => (
    <Link href={link} className='arrowlabel'>
      { label && <small>{label}</small> }
      { children && children }
      <span className={`ico ${ico}`}></span>
     </Link>
  );

export default ArrowLabel;