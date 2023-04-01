import { useState, useEffect } from 'react';
import FetchAPI from '../lib/fetchapi';

import { Tag, SquareButton, Button } from '../components/inputs';
import { LabelBar } from '../components/header';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setTagArray } from '../lib/utilities';
import { container, settings } from '../lib/variants';
import qs from 'query-string';


const TagBox = (props) => {

  const { header, tags, type } = props;
  const [ tagChain, setTagChain ] = useState([]);
  const onChange = (e) =>{

    setTagChain(setTagArray({
      array:tagChain,
      value:e.value,
      action: e.state ? 'add' : 'remove'
    }));

    props.onChange( {type:type, actives:tagChain} );
  }

  return(
    <div className='tagbox' id={'tagbox_'+header}>
        <LabelBar label={header}/>
        { tags.map(item => <Tag key={'tag_'+item} value={item.toLowerCase()} onChange={ onChange }/>) }
    </div>
  );
}

const Counter = ({results, titles}) => {

  const [ count, setCount ] = useState(0);

  const resultsToUrl = ({ tagChain, colourChain }) => {

    const req = {};

    if(tagChain.length > 0 ){ req.tags = tagChain; }
    if(colourChain.length > 0 ){ req.colours = colourChain; }

    return '?'+qs.stringify(req,{arrayFormat:'separator', arrayFormatSeparator:'+', strict:false})+'&mosaic=1';
  }

  useEffect(() =>{

    if(results.total > count){ setTimeout(() => setCount(count+1),10); }

    if(results.total < count){ setTimeout(() => setCount(count-1), 10); }

  },[results,count]);

  return(
    <div id='counter'>

          <section>
            <h1>{count}</h1>
            <div className='resultText'>
              <h3>movies found </h3>
              {results.colours && results.colours.length > 0 ? <motion.p variants={container} initial='initial' animate='animate' exit='exit' key='shotsresult'>({results.colours.length} shots)</motion.p> : <></> }
            </div>
          </section>

          <section>
          {
            count > 0 ?
              <motion.div
              key='listTitlesSearch'
              variants={container}
              initial='initial'
              animate='animate'
              exit='exit'
              >
                <motion.ul key='listTitles'
                variants={container}
                initial='initial'
                animate='animate'
                exit='exit'
                >

                { titles && titles.map( title => <li key={'li'+title}>{title}</li> ) }
                </motion.ul>
                <Link to={'/search'+resultsToUrl(results)}><Button label='See all' icon={<span className='ico search'></span>}/></Link>
              </motion.div>
            :
            <motion.p
                key={'descChooseTag'}
                variants={container}
                initial='initial'
                animate='animate'
                exit='exit'
                className="discrete">Find shots with specific moods and colors by choosing between the tags on the left</motion.p>
          }
          </section>

    </div>
  );
}


function Tags(){

  const [ tagBox, setTagBox ] = useState([]);
  const [ results, setResults ] = useState({});
  const [ tagChain, setTagChain ] = useState([]);
  const [ colourChain, setColourChain ] = useState([]);

  const spliceTitle = (array,limit) => {

     if(array.length > limit){ array = array.splice(0,limit); }
     return array.map(movie => movie.title);

  }

  const onChange = (val) => {
    switch(val.type){
      case 'tag':
        setTagChain([...val.actives]);
      break;

      case 'colour':
        setColourChain([...val.actives]);
      break;

      default:
    }

  }


  useEffect(() => {

  	document.title = "KINO寺 - Tags";

    const setTotalResult = (colourchain, tagchain, tagresult, colourresult) => {

      if(tagchain.length > 0 && colourchain.length === 0){ return tagresult.length; }
      else if( colourchain.length > 0 && tagchain.length === 0 ){ return colourresult.length; }
      else if ( (tagchain.length && colourchain.length) > 0){
        // only keep common id
        return tagresult.filter( tag => {
          for(const movieId of colourresult){ if(movieId === tag.id){ return true; } }
          return false;
        }).length;
      }

      return 0;
    }

    //set Tax Boxes
    const colors = FetchAPI.post({type:'getColors'}).then( result => result.data );
    const tags = FetchAPI.post({type:'getTags'}).then( result => result.data );

    Promise.all([colors, tags]).then( result => setTagBox([
      {header: 'Movies aesthetics', tags:result[1], type:'tag'},
      {header: 'Shots hues', tags: result[0], type:'colour'}
    ]));


    const colourResults = colourChain.length > 0 ? FetchAPI.post({type:'getShotsWithColours', colours:colourChain, tags:tagChain}).then(result => result.data) : new Promise(resolve => resolve([]));
    const tagResults = tagChain.length > 0 ? FetchAPI.post({type:'getMoviesFromTags', tags:tagChain}).then(result => result.data) : new Promise(resolve => resolve([]));

    Promise.all([tagResults, colourResults]).then( result => {

      setResults({
      tagChain:tagChain,
      colourChain:colourChain,
      tags: result[0],
      colours: result[1].shots,
      total: setTotalResult(colourChain, tagChain, result[0], result[1].movies)
    })
  });



  },[tagChain,colourChain]);

  return  (
    <>
        <div id="tag_container" className="settings_container">
            <Counter results={ results ? results : {} } titles={ results.tags ? spliceTitle(results.tags,7) : []}/>
            <div id="tagbox_wrapper">
            {  tagBox.map( item => <TagBox key={'tagbox_'+item.header} header={item.header} tags={item.tags} onChange={onChange} type={item.type}/>) }
            </div>
        </div>
    </>
    );
}

export default Tags;
