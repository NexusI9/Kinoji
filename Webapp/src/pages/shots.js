import { useState, useEffect } from 'react';
import { TagBox, Counter } from '@/components/tags';
import useAPI from '@/lib/api';
import Head from 'next/head';
import { ShotSearch } from '@/components/search';

function Tags() {

  const [tags, setTags] = useState([]);
  const [shots, setShots] = useState({});
  const [lights, setLights] = useState([]);
  const [colours, setColours] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const spliceTitle = (array, limit) => {

    if (array.length > limit) { array = array.splice(0, limit); }
    return array.map(movie => movie.title);

  }

  const onChange = (val) => ({
    'light': () => setLights([...val.actives]),
    'colour': () => setColours([...val.actives]),
    'subject': () => setSubjects([...val.actives])
  })[val.type]() || null;


  useEffect(() => {

    //set Tax Boxes
    const { post } = useAPI();
    const FILTERS = [
      { header: 'Hues', action: 'GET_COLORS', type: 'colour' },
      { header: 'Lighting', action: 'GET_LIGHTS', type: 'colour' },
      { header: 'Subjects', action: 'GET_SUBJECTS', type:'tag' }
  ];

  const fetchAllTags = FILTERS.map( tag => post({ type:tag.action }).then(result => ({...tag, tags: result.data}) ) );

  Promise.all(fetchAllTags).then(result => setTags(result));


},[]);


useEffect(()=>{

    /*const colourResults = colourChain.length > 0 ? FetchAPI.post({type:'GET_SHOTS_WITH_COLORS', colours:colourChain, tags:lightChain}).then(result => result.data) : new Promise(resolve => resolve([]));
  const tagResults = lightChain.length > 0 ? FetchAPI.post({type:'GET_MOVIES_FROM_TAGS', tags:lightChain}).then(result => result.data) : new Promise(resolve => resolve([]));

  Promise.all([tagResults, colourResults]).then( result => {

    setResults({
    lightChain:lightChain,
    colourChain:colourChain,
    tags: result[0],
    colours: result[1].shots,
    total: setTotalResult(colourChain, lightChain, result[0], result[1].movies)
  })
});*/

},[lights, colours, subjects]);

return (
  <>
    <Head>
      <title>Search shots | Kinoji</title>
    </Head>
    <div id="tag_container" className="settings_container">
      <div id="tagbox_wrapper">
        <h1>Search shots</h1>
        <p className='discrete'>Look up shots depending on their moods, aesthetics or subjects</p>
        {tags.map(item => item.tags.length ? <TagBox key={'tagbox_' + item.header} header={item.header} tags={item.tags} onChange={onChange} type={item.type} /> : <></> )}
      </div>
      <ShotSearch />
    </div>
  </>
);
}

export default Tags;
