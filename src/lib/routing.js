/*
Everything related to Routing, basically check the location path and returns the type of page the user is on (home, settings, about ...)
*/


export function isSettings(location){
  return location.match(/(\/world|\/list|\/tags)/) ? true : false;
}


export function isFullview(location){
  return location.match(/(\/shot)/) ? true : false;
}

export function isHomepage(location){
  return (location === '/' ) ? true : false;
}
