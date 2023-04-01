/*
Everything related to Routing, basically check the location path and returns the type of page the user is on (home, settings, about ...)
*/

import { useLocation } from 'react-router-dom';



export function isSettings(location){
  return location.pathname.match(/(\/world|\/list|\/tags)/) ? true : false;
}


export function isFullview(location){
  return location.pathname.match(/(\/shot)/) ? true : false;
}

export function isHomepage(location){
  return (location.pathname === '/' ) ? true : false;
}
