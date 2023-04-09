
import Link from 'next/link';


const ArrowLabel = ({ label, link, ico='smallarrow' }) => (
    <Link href={link} className='arrowlabel'><small>{label}</small><span className={`ico ${ico}`}></span></Link>
  );

export default ArrowLabel;