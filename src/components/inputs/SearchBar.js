import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getMovieYear } from '../../lib/utilities';
import useAPI from '../../lib/api';


const SearchBar = ({ limit=5 }) => {

    const [ suggest, setSuggest ] = useState();
    const [ value, setValue ] = useState();
    const router = useRouter();
  
    const onClick = () => setSuggest();
  
    const onKeyDown = (e) => {
      if(e.key === 'Enter' && value){ 
        router.push({pathname:'/search', query:{query:value}}); 
        onClick();
      }
    }
  
    const list = (sug, query) => {
  
      if(!sug){ return; }
      const listMap = {
        movies: (obj) => 
            <Link key={'suggestmovie'+obj.id} href={'/movies/'+obj.id} onClick={onClick}>
              <li className='suggest suggest_poster'><img src={obj.poster} />
                <div>
                  <p>{obj.title} ({getMovieYear(obj)})</p>
                </div>
              </li>
            </Link>,

        directors: (obj) => 
            <Link key={'suggestdir'+obj.id} href={'/director/'+obj.id} onClick={onClick}>
              <li className='suggest suggest_poster'>
                <img src={obj.poster || require('../../assets/noposter.jpg')} />
                <div>
                  <p>{obj.name}</p>
                  <small className='discrete'>(Director)</small>
                </div>
              </li>
            </Link>,

        dops: (obj) => 
            <Link key={'suggestdop'+obj.id} href={'/director/'+obj.id} onClick={onClick}>
              <li className='suggest'>
                <div>
                  <p>{obj.dop}</p>
                  <small className='discrete'>(Director of photography)</small>
                </div>
              </li>
            </Link>,

        genres: (obj) => 
            <Link key={'suggestgenre'+obj.name} href={'/collections/'+obj.name} onClick={onClick}>
              <li className='suggest'>
                <div> {obj.name} 
                <small>(list)</small>
                </div>
              </li>
            </Link>,

        colours: (obj) => 
            <Link key={'suggestcolors'+obj.family} href={'/search?colours='+obj.family} onClick={onClick}>
              <li className='suggest suggest_poster'>
                <div className='suggest_color_wrap'>
                  <span className='ico colours' name={obj.family.toLowerCase()}></span>
                </div>
                <div>
                  <p>{obj.family}</p>
                  <p><small>(look for shots with {obj.family} hue)</small></p>
                </div>
              </li>
            </Link>
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
  
      listing.push(<Link key='searchtotal' href={'/search?query='+query}><small className='underline link'>{sug.total} total items found</small></Link>);
      return listing;
    };
  
    const onChange = (e) => {
      const query = e.target.value;
  
      if( query.length > 1 ){
        const {post} = useAPI();
        post({type:'getSuggestion', suggestion:query}).then( result => { console.log(result); return setSuggest(list(result.data, query)) });
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