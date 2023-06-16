import { getMovieYear, setEventDate, truncate } from '../../lib/utilities';
import { Poster } from '../movie';
import { DirectorLabel } from '../people';
import Link from 'next/link';


export function ObjectToEvent(item){
    //Converts and universalize Events and Movies for <Event />
    /*
      label : title shown bellow dot_events
      header : title shown inside content box
    */

    const type = item.folder ? 'movie' : 'event';

    switch(type){
      case 'movie':
      return{
        label: item.title|| '',
        header:  <Link href={'/movies/'+item.id} className='link' replace>{item.title}<span className='light'> ({getMovieYear(item)})</span></Link>,
        begin: getMovieYear(item),
        end:null,
        subtext: <span className='link underline'><DirectorLabel id={item.director} popup={false} /></span>,
        summary: item.summary ? truncate(item.summary, 120) : '',
        poster: <Poster movie={item} size='small'/> || false,
        id:item.id,
        type:'movie'
      }

      case 'event':
      return{
        label: item.header || '',
        header: <>{item.header} <span className='light'> ({setEventDate(item)})</span></>,
        begin: item.begin,
        end: item.end || null,
        subtext: '',
        summary: item.summary ?  truncate(item.summary, 200) : '',
        poster: item.poster || false,
        id:item.id,
        type:'event'
      }

      default:
      return null;


    }

}

export function group(ar){
  //cluster same date events & movies

  const segments = ar.segments || [];
  const moviesGroup = [];
  const mixedGroup = [];
  const eventsGroup = [];

  const moviesSolo = [];
  const eventsSolo = [];

  if( ar.events && ar.movies ){

    //-------set Group Mixed
    for(const evt of ar.events){
        let commonMovies = ar.movies.filter( movie => getMovieYear(movie) === evt.begin );
        if(commonMovies.length > 0){
          mixedGroup.push({ date:evt.begin, objects: [evt, ...commonMovies] });
        }
    }

    //-------Set Movies (Group & Solo)
    for(const movie of ar.movies){
      let commonMovies = ar.movies.filter( mv => getMovieYear(mv) === getMovieYear(movie) );

      if( commonMovies.length > 1){
        const indexOfDate = moviesGroup.findIndex( gp => gp.date === getMovieYear(movie) );
        if( indexOfDate !== -1){
          if( moviesGroup[indexOfDate].objects.findIndex(item => item.id === movie.id) === -1  ){
            moviesGroup[indexOfDate].objects.push(movie);
          }
        }else{
          moviesGroup.push({ date:getMovieYear(movie), objects: commonMovies });
        }

      }else{
        if( mixedGroup.filter(item => item.date === getMovieYear(movie) ).length === 0 ){
          moviesSolo.push(...commonMovies);
        }
      }
    }

    //-------Set Events (Group & Solo)
    for(const evt of ar.events){
      let commonEvents = ar.events.filter( et => et.begin === evt.begin );
      if( commonEvents.length > 1 ){
        const indexOfEvent = eventsGroup.findIndex( gp => gp.date === evt.begin );
        if( indexOfEvent !== -1){
          if( eventsGroup[indexOfEvent].objects.findIndex(item => item.id === evt.id) === -1  ){
            //Push group to existing group
            eventsGroup[indexOfEvent].objects.push(evt);
          }
        }else{
          //create new group
          eventsGroup.push({ date:evt.begin, objects: commonEvents });
        }

      }else{
        //check if event's date doesn't exists in mixed Group
        if( mixedGroup.filter(item => item.date === evt.begin ).length === 0 ){
          //Push solo
          eventsSolo.push(...commonEvents);
        }
      }
    }


  }

  return {
    segments:segments,
    group: {
      movies:moviesGroup,
      mixed:mixedGroup,
      events:eventsGroup
    },
    solo: {
      movies:moviesSolo,
      events:eventsSolo
    }
  }


}

export function minMax(ar){
  //get Min and max date crossing key ( segments / movies / events ) from Country.history

  let min = 10000;
  let max = -10000;
  
  Object.keys(ar).forEach( key => 
    Array.isArray(ar[key]) && ar[key].forEach( item => {
      if( (item.begin && item.begin < min) || (item.date && getMovieYear(item) < min )){ min = item.begin || getMovieYear(item); }
      if( (item.being && item.bein > max ) || (item.date && getMovieYear(item) > max )){ max = item.begin || getMovieYear(item); }
    })
  );

  return { min:min, max:max }

}

export function dateToPosition(minMax, date, width, additional_margin = 0){
  const pixelPos = (date - minMax.min) * width / (minMax.max-minMax.min);
  return pixelPos - additional_margin;
}

export function dateToWidth(minMax, begin, end){
  return this.dateToPosition(minMax,end) - this.dateToPosition(minMax,begin);
}
