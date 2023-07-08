import { useState, useEffect, useRef } from 'react';
import { TagBox, Counter } from '@/components/tags';
import useAPI from '@/lib/api';
import Head from 'next/head';
import { BigThumbnail } from '@/components/movie';
import { useRouter } from 'next/router';
import { removeUndefined, scrollReachBottom } from '@/lib/utilities';
import { encodeQueries } from '@/components/tags/Tag.helper';

function Shots() {

  const router = useRouter();

  //main objects
  const [tags, setTags] = useState([]);
  const [shots, setShots] = useState([]);

  //filters objects
  const [lights, setLights] = useState([]);
  const [colours, setColours] = useState([]);
  const [subjects, setSubjects] = useState([]);

  //loading process
  const STEP = 20;
  const [stop, setStop] = useState(STEP);
  const [load, setLoad] = useState(false);
  const gallery = useRef();

  const FILTERS = [
    { header: 'Hues', choices: 'GET_COLORS', type: 'colour', state: setColours, getArray: () => colours },
    { header: 'Lighting', choices: 'GET_LIGHTS', type: 'light', state: setLights, getArray: () => lights },
    { header: 'Subjects', choices: 'GET_SUBJECTS', type: 'subject', state: setSubjects, getArray: () => subjects }
  ];

  const getShots = async (queries, start = 0, stp = STEP) => {
    queries = removeUndefined(queries);
    const { post } = useAPI();
    return post({ type: 'GET_SHOTS_FROM_QUERIES', start: start, stop: stp, ...queries }).then(({ data }) => setShots(data));
  };

  const onChange = (input) => {

    try {
      //get Filters objects depending on the input type
      const type = FILTERS.filter(item => item.type === input.type)[0];

      //getCurrent useState value
      let currentArray = type.getArray();
      //find (potential) index in useState array
      const index = currentArray.indexOf(input.value);


      if (input.checked && index < 0) {
        //push to array if checked and not exists already
        currentArray.push(input.value);
      } else if (!input.checked && index >= 0) {
        //remove from array if unchecked and exists
        currentArray.splice(index, 1);
      }

      //update useState
      type.state([...currentArray]);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    //prepare queries for api request
    const queries = encodeQueries({ colours: colours, lights: lights, subjects: subjects });

    //update router
    router.push({
      pathname: router.pathname,
      query: removeUndefined(queries)
    });

    //reset states on filters change & init load
    setShots([]);
    setStop(STEP);
    setLoad(true);

  }, [colours, lights, subjects]);

  useEffect(() => {

    const onScroll = () => (scrollReachBottom(gallery.current) && !load) && setLoad(true);

    if (gallery.current) {
      //events
      gallery.current.addEventListener('scroll', onScroll);
    }
    return () => gallery.current?.removeEventListener('scroll', onScroll);

  }, [gallery]);

  useEffect(() => {

    if (load) {
      const queries = encodeQueries({ colours: colours, lights: lights, subjects: subjects });
      getShots(queries, 0, stop)
        .then(_ => {
          setLoad(false); //allow loading again
          setStop(stop + STEP); //increment stop
        });
    }
  }, [load]);


  useEffect(() => {
    //set Tax Boxes
    const { post } = useAPI();
    const fetchAllTags = FILTERS.map(tag => post({ type: tag.choices }).then(result => ({ ...tag, tags: result.data })));
    Promise.all(fetchAllTags).then(result => setTags(result));
  }, []);

  return (
    <>
      <Head>
        <title>Search shots | Kinoji</title>
      </Head>
      <div className="shot-container settings_container">
        <div id="tagbox_wrapper">
          <h1>Search shots</h1>
          <p className='discrete'>Look up shots depending on their moods, aesthetics or subjects</p>
          {tags.map((item,i) => item.tags.length ?
            <TagBox
              key={'tagbox_' + item.header+i}
              header={item.header}
              tags={item.tags}
              onChange={onChange}
              type={item.type}
            /> : <></>)}
        </div>
        <div className='shot-scroll-wrapper' ref={gallery}>
          <div className='shot-gallery'>
            {shots?.map(shot => <BigThumbnail key={shot.fullpath} {...shot} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Shots;
