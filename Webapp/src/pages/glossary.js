import { useState, useEffect } from 'react';
import Link from 'next/link';
import { RadioLabel} from '@/components/inputs';
import { PeopleLabel } from '@/components/people';
import { setDate, List, Preview, SubMovies, SubPreview } from '@/components/glossary';
import Head from 'next/head';

import noposter from '@/assets/noposter.jpg';

const Glossary = () => {

  const content = [
    {
      category:'movie',
      input:{ value:'movie', label:'movies', checked:true },
      list: { id:'title', query:'GET_ALL_MOVIES', value:'title', link: (item) => '/movies/'+item.id },
      preview: (item) => ({

          header: <Link href={'/movies/'+item.id}>{item.title}</Link>,
          subheader: <Link href={'/people/'+item.director} className='link underline'><PeopleLabel id={ item.director } /></Link>,
          img: item.poster || noposter.src,
          summary: item.summary,
          subcontent: <SubPreview movie={item}/>

      })
    },

    {
      category:'director',
      input: { value:'director', label:'directors' },
      list: {id:'director', query:'GET_ALL_DIRECTORS', value:'name', link: (item) => '/people/'+ item.id },
      preview: (item) => ({

          header: <Link href={'/people/'+item.id} >{item.name}</Link>,
          subheader: setDate(item) || '&emsp;',
          img: item.poster || require('../assets/noposter.jpg'),
          summary: item.summary,
          subcontent: <SubMovies id={item.id} />

        })
    }
  ];

  /*
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
  */

  const dft = {
    header:'',
    subheader:'',
    img:'',
    summary:'',
    movies:''
  };

  const [ listType, setListType ] = useState(content[0]);
  const [ preview, setPreview ] = useState(dft);


  return(
      <>
      <Head>
        <title>Movies and directors glossary</title>
      </Head>
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
