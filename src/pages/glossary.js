import { useState, useEffect } from 'react';
import Link from 'next/link';
import { RadioLabel} from '@/components/inputs';
import { DirectorLabel } from '@/components/api';
import { setDate, List, Preview, SubMovies, SubPreview } from '@/components/glossary';

const Glossary = () => {

  const content = [
    {
      category:'movie',
      input:{ value:'movie', label:'movies', checked:true },
      list: { id:'title', query:'getAllMovies', value:'title', link: (item) => '/movies/'+item.id },
      preview: (item) => ({

          header: <Link href={'/movies/'+item.id}>{item.title}</Link>,
          subheader: <Link href={'/director/'+item.director} className='link underline'><DirectorLabel id={ item.director } /></Link>,
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

          header: <Link href={'/director/'+item.id} >{item.name}</Link>,
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

  const [ listType, setListType ] = useState(content[0]);
  const [ preview, setPreview ] = useState(dft);

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
