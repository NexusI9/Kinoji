
import Link from 'next/link';


export default ({ label, link, ico='smallarrow', children }) => (
    <Link href={link} className='arrowlabel'>
      { label && <small>{label}</small> }
      { children && children }
      <svg width="15" height="14" viewBox="0 0 15 14" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.28281 10.5L7.78281 7.00003L4.28281 3.50003L4.98281 2.10003L9.88281 7.00003L4.98281 11.9L4.28281 10.5Z"/>
      </svg>
     </Link>
  );
