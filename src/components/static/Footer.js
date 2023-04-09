import Link from 'next/link';
import kinojilogo from '../../assets/logo.svg';
import { TMDBLink } from '../inputs';
import { motion } from 'framer-motion';
import { container } from '../../lib/variants';


const Footer = () => {

  const footer = [
    {
      header:"Main pages",
      content:[
        { label:'Home', link:'/' },
        { label:'Movies', link:'/movies' },
        { label:'Collections', link:'/collections' }
      ]
    },
    {
      header:"Search tools",
      content:[
        { label:'Glossary', link:'/glossary' },
        { label:'Worldmap', link:'/worldmap' },
        { label:'Tags and colours picker', link:'/tags' }
      ]
    },
    {
      header:"About",
      content:[
        { label:'The project', link:'/about' },
        { label:'Contribute', link:'/contribute' }
      ]
    },
  ];

  return(
    <motion.footer variants={container} initial='initial' animate='animate' exit='exit' >

        <section id="footerInfo">
          <img alt='kinoji logo' style={{width:'100px'}} src={kinojilogo.src}/>
          <p className='discrete'>Kinoji is an online cinematography library focused on Asia and auteur cinema</p>
        </section>
        <section id="footerLinks">
          {
            footer.map( item =>
              <div key={'footerlist'+item.header}>
                <h4>{item.header}</h4>
                <ul>
                  {item.content.map( list => <li key={'footersublist'+list.label}><Link className='light link' href={list.link}>{list.label}</Link></li>)}
                </ul>
              </div>
            )
          }
        </section>
        <section>
          <p className='discrete'>powered by </p>
          <TMDBLink link='https://www.themoviedb.org/'/>
        </section>
    </motion.footer>
  );
}

export default Footer;