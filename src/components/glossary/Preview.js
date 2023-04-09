import { motion } from 'framer-motion';



const Preview = ({ content }) => {

    const { header, subheader, summary, img, subcontent } = content;
  
    return(
      <div id='alphaPreview'>
  
        <motion.section
          key={Math.random()}
          initial={{opacity:0}}
          animate={{opacity:1, transition:{duration:0.2} }}
          >
          <div id='alpha_header'>
            { img !== '' ? <img alt='poster' src={img} /> : <></> }
            <div>
              <h3>{header}</h3>
              <p>{subheader}</p>
              <br/>
              <p>{ summary ? summary.substr(0,200) : '' }</p>
            </div>
          </div>
            {subcontent || <></> }
        </motion.section>
  
      </div>
    );
  }

  export default Preview;