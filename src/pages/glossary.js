import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Poster, Mosaic } from '../components/movieobject';

import FetchAPI from '../lib/fetchapi';

import { RadioLabel, SquareButton, ArrowLabel } from '../components/inputs';
import { DirectorLabel } from '../components/api';
import { LabelBar } from '../components/header';
import { isSettings } from '../lib/routing';

import { motion, AnimatePresence } from 'framer-motion';
import { container, settings } from '../lib/variants';

function setDate(item){
  if(item.birthday && item.deathday){ return item.birthday.split('-')[0] +'-'+ item.deathday.split('-')[0] }
  if(item.birthday && !item.deathday){ return item.birthday.split('-')[0] +'-today';}
  if(!item.birthday && !item.deathday){ return ''; }
  return item.birthday.split('-')[0];
}

// Preview
const SubMovies = ({id}) => {

  const [ movies, setMovies ] = useState();
  useEffect( () => FetchAPI.post({type:'getMoviesFromDir', id:id} ).then( result => { console.log(result.data); setMovies(result.data) }), [id]);

  return(
    <>
    {
      movies ?
      <>
        <h3>Movies</h3>
        <hr/>
        <div id='dirmovies'>{ movies.map( mv => <Poster key={'dirmovie_'+mv.id} movie={mv} size='small' /> ) }</div>
      </> : <></>
    }
    </>
  );
}
const SubPreview = ({movie}) => (
  <>
    <LabelBar label='Preview' hero={false} hyperlink={  <ArrowLabel label='see the shots' link={`/movie/${movie.id}`} /> }/>
    <div>
      <span style={{pointerEvents:'none'}}>
        <Mosaic movie={movie} random={true} limit={9} />
      </span>
    </div>
  </>
)

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

//list
const List = ({ id, query, value, link ,onEnter }) => {

  const [ list, setList ] = useState([]);

  useEffect( () => {

    const alphalist = [];
    const gather = (list, alp) => {
      //sort list alphabetically

      for( const i in list ){

        if(alp.length === 0){
          alp.push({letter: list[i][value][0], objects: [ list[i] ] });
          list.splice(i,1);
          return gather(list, alp);
        }else{

          for( const j in alp){
            if(list[i][value][0] === alp[j].letter){
              alp[j].objects.push( list[i] );
              list.splice(i,1);
              return gather(list, alp);
            }
          }

          alp.push({letter: list[i][value][0], objects: [ list[i] ] });
          list.splice(i,1);
          return gather(list, alp);
        }
      }


      alp.sort(function(a,b){
        if(a.letter > b.letter){ return 1; }
        if(a.letter < b.letter){ return -1; }
        return 0;
      });

      return alp;
    }

    FetchAPI.post({type:query}).then( result => setList(  gather(result.data, alphalist) ) )
  },[query, value]);

  return (
    <motion.div id={'list_'+id} className='alphaList'
      key={'list_'+id}
      variants={container}
      initial='initial'
      animate='animate'
      exit='exit'
      >
    {
      list.map( item =>
          <div key={'alpha_'+item.letter}>
              <h1>{item.letter}</h1>
              <ul>
              {
                item.objects.map((obj,i) => <Link key={'subitem_'+id+'_'+i} to={link(obj)}><li><p className='queries' onMouseEnter={ () => onEnter(obj) } >{obj[value]}</p></li></Link>)
              }
              </ul>
            </div>
        )
    }
    </motion.div>

  );

}

const Glossary = (props) => {

  const content = [
    {
      category:'movie',
      input:{ value:'movie', label:'movies', checked:true },
      list: { id:'title', query:'getAllMovies', value:'title', link: (item) => '/movies/'+item.id },
      preview: (item) => ({

          header: <Link to={'/movies/'+item.id}>{item.title}</Link>,
          subheader: <Link to={'/director/'+item.director} className='link underline'><DirectorLabel id={ item.director } /></Link>,
          img: item.poster || require('../assets/noposter.jpg'),
          summary: item.summary,
          subcontent: <SubPreview movie={item}/>

      })
    },

    {
      category:'director',
      input: { value:'director', label:'directors' },
      list: {id:'director', query:'getAllDirectors', value:'name', link: (item) => '/director/'+ item.id },
      preview: (item) => ({

          header: <Link to={'/director/'+item.id} >{item.name}</Link>,
          subheader: setDate(item) || '&emsp;',
          img: item.poster || require('../assets/noposter.jpg'),
          summary: item.summary,
          subcontent: <SubMovies id={item.id} />

        })
    },

    {
      category:'cinematographer',
      input:{ value:'cinematographer', label:'cinematographers' },
      list: {id:'cinematographer',query:'getAllDOP', value:'name', link: (item) => '/dop/'},
      preview: (item) => ({

           header: item.name,
           subheader: item.birthday,
           img: item.poster || require('../assets/noposter.jpg'),
           summary: item.summary,

       })
    }
  ];

  const dft = {
    header:'',
    subheader:'',
    img:'',
    summary:'',
    movies:''
  };
  const location = useLocation();
  const [ listType, setListType ] = useState(content[0]);
  const [ preview, setPreview ] = useState(dft);
  const [ isStg, setIsStg ] = useState(isSettings(location));

  useEffect( () => {
  	document.title = "KINO寺 - Glossary";
  },[]);
  return(
      <>
        <div id="dir_container" className="settings_container">

            <RadioLabel
                id={'cinedir'}
                labels={content.map(item => item.input)}
                onClick={ val  => { setListType(content.filter( item => item.category === val )[0]);  setPreview(dft); } }
              />

              <List id={listType.list.id} query={listType.list.query}  value={listType.list.value} link={listType.list.link} onEnter={ (val) => setPreview( listType.preview(val) )}/>

        </div>
              <Preview content={preview} />
      </>
  );

}

export default Glossary;
