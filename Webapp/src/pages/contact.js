import { ContactLayout } from '@/components/layout';
import Head from 'next/head.js';


const Contact = ({ main = true }) => {

  return (
    <div className='page-contact container'>
      <Head>
        <title>Contact Us | Kinoji</title>
      </Head>
      <ContactLayout/>
    </div>

  );
}

export default Contact;
