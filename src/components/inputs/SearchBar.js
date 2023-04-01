import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getMovieYear } from '../../lib/utilities';
import FetchAPI from '../../lib/fetchapi';


const SearchBar = ({ limit=5 }) => {

    const [ suggest, setSuggest ] = useState();
    const [ value, setValue ] = useState();
    const navigate = useNavigate();
  
    const onClick = () => setSuggest();
  
    const onKeyDown = (e) => {
      if(e.key === 'Enter' && value){ navigate('/search?query='+value); onClick();}
    }
  
    const list = (sug, query) => {
  
      if(!sug){ return; }
      const listMap = {
        movies: (obj) => <Link key={'suggestmovie'+obj.id} to={'/movies/'+obj.id} onClick={onClick}><li className='suggest suggest_poster'><img src={obj.poster} /><div><p>{obj.title} ({getMovieYear(obj)})</p></div></li></Link>,
        directors: (obj) => <Link key={'suggestdir'+obj.id} to={'/director/'+obj.id} onClick={onClick}><li className='suggest suggest_poster'><img src={obj.poster || require('../../assets/noposter.jpg')} /><div><p>{obj.name}</p><small className='discrete'>(Director)</small></div></li></Link>,
        dops: (obj) => <Link key={'suggestdop'+obj.id} to={'/director/'+obj.id} onClick={onClick}><li className='suggest'><div><p>{obj.dop}</p><small className='discrete'>(Director of photography)</small></div></li></Link>,
        genres: (obj) => <Link key={'suggestgenre'+obj.name} to={'/collections/'+obj.name} onClick={onClick}><li className='suggest'><div>{obj.name} <small>(list)</small></div></li></Link>,
        colors: (obj) => <Link key={'suggestcolors'+obj.family} to={'/colors/'+obj.family} onClick={onClick}><li className='suggest suggest_poster'><div className='suggest_color_wrap'><span></span></div><div><p>{obj.family}</p>(look for shots with {obj.family} hue)</div></li></Link>
      }
      let count = 0;
      const listing = [];
  
      Object.keys(sug).forEach( key => {
  
        if(Array.isArray(sug[key])){
          sug[key].map( item => {
            if(count <= limit){
              listing.push(listMap[key](item))
              count ++;
            }
          })
        }
  
      });
  
      listing.push(<Link key='searchtotal' to={'/search?query='+query}><small className='underline link'>{sug.total} total items found</small></Link>);
      return listing;
    };
  
    const onChange = (e) => {
      const query = e.target.value;
  
      if( query.length > 1 ){
        FetchAPI.post({type:'getSuggestion', suggestion:query}).then( result => { console.log(result); return setSuggest(list(result.data, query)) });
        window.addEventListener('click',onClick);
        setValue(query);
      }else{
        setSuggest();
        window.removeEventListener('click',onClick);
        setValue();
      }
  
    }
  
    useEffect( () => {
      return () => window.removeEventListener('click',onClick);
    }, [onClick]);
  
  
    return(
      <section  className='search_bar suggest_container' onKeyDown={onKeyDown}>
        <span className="ico search"></span>
        <input className="field" id="search_input" autoComplete="off" placeholder="Type a movie, director, or a subject" type="text" onChange={onChange}/>
        {
          suggest && suggest.length > 0 ? <ul className='suggest_list'>{ suggest.map(item => item) }</ul>
          :
          <></>
        }
      </section>
    );
  }

  export default SearchBar;