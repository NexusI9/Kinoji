import { ContactLayout } from '@/components/layout';
import Head from 'next/head.js';


const Contact = ({ main = true }) => {

  return (
    <div className='page-contact'>
      <Head>
        <title>Contact Us</title>
      </Head>
      <ContactLayout/>
    </div>

  );
}

export default Contact;
