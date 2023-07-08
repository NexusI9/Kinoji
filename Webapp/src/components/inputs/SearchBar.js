import { useState, useEffect,useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getMovieYear, jobFullName } from '@/lib/utilities';
import useAPI from '@/lib/api';
import { InfoTag } from '../header';
import ArrowLabel from './ArrowLabel';

import noposter from '@/assets/noposter.jpg';

export default ({ limit = 5, theme='default' }) => {

  const [suggest, setSuggest] = useState();
  const [value, setValue] = useState();
  const router = useRouter();
  const input = useRef();

  const onClick = () => setSuggest();

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && value) {
      router.push({ pathname: '/search', query: { query: value } });
      onClick();
    }
  }

  const list = (sug, query) => {

    if (!sug) { return; }
    const listMap = {
      movies: (obj) =>
        <Link key={'suggestmovie' + obj.id} href={'/movies/' + obj.id} onClick={onClick}>
          <li className='suggest suggest_poster'><img src={obj.poster} />
            <div>
              <p>{obj.title} ({getMovieYear(obj)})</p>
              <InfoTag>movie</InfoTag>
            </div>
          </li>
        </Link>,

      peoples: ({id, poster, name, job}) =>
        <Link key={'suggestdir' + id} href={'/people/' + id} onClick={onClick}>
          <li className='suggest suggest_poster'>
            <img src={poster || noposter.src} />
            <div>
              <p>{name}</p>
              <InfoTag>{jobFullName(job)}</InfoTag>
            </div>
          </li>
        </Link>,

      collections: ({name}) =>
        <Link key={'suggestgenre' + name} href={'/collections/' + name} onClick={onClick}>
          <li className='suggest'>
            <div> <p>{name}</p>
              <InfoTag>collection</InfoTag>
            </div>
          </li>
        </Link>,

      colours: ({family}) =>
        <Link key={'suggestcolors' + family} href={'/shots/?colours=' + family.toLowerCase()} onClick={onClick}>
          <li className='suggest suggest_poster'>
            <div className='suggest_color_wrap'>
              <span className='ico colours' name={family.toLowerCase()}></span>
            </div>
            <div>
              <p>{family}</p>
              <InfoTag>shots with {family} hue</InfoTag>
            </div>
          </li>
        </Link>
    }
    let count = 0;
    const listing = [];
 
    Object.keys(sug).forEach(key => {
      if (Array.isArray(sug[key])) {
        sug[key].map(item => {
          if (count <= limit) {
            listing.push(listMap[key](item))
            count++;
          }
        })
      }

    });

    listing.push(
      <ArrowLabel key='searchtotal' link={'/search?query=' + query} ><small>See all ({sug.total})</small></ArrowLabel>
    );
    return listing;
  };

  const onChange = (e) => {
    const query = e.target.value;

    if (query.length > 1) {
      const { post } = useAPI();
      post({ type: 'GET_SUGGESTION', suggestion: query }).then(result => setSuggest(list(result.data, query)) );
      window.addEventListener('click', onClick);
      setValue(query);
    } else {
      setSuggest();
      window.removeEventListener('click', onClick);
      setValue();
    }

  }

  useEffect(() => {
    return () => window.removeEventListener('click', onClick);
  }, []);

  useEffect(() => { 
    setSuggest(); 
    if(input.current){
      input.current.value = '';
    }
  },[router.asPath]);


  return (
    <section className={'search_bar suggest_container ' + (theme !== 'default' && theme) } onKeyDown={onKeyDown}>
      <span className="ico search"></span>
      <input className="field" id="search_input" autoComplete="off" ref={input} placeholder="Type a movie, director, or a subject" type="text" onChange={onChange} />
      {
        suggest?.length && <ul className='suggest_list'>{suggest.map(item => item)}</ul>
      }
    </section>
  );
}