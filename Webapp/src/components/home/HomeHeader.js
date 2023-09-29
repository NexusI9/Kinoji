
import { useEffect } from "react";
import BannerSearch from "./BannerSearch";

export default () => {

  const list = [
    "539307929", //zuzhou
    "539307800", //train
    "539307685", //kuro
    "539307609", //
    "539307548",
    "539307513",
    "539307432",
    "539307281",
    "539307222"
  ];

  useEffect(()=> {});

  const randVal = list[Math.floor(Math.random() * list.length)];

  return (

    <header id='homeheader'>

      <div id='videobanner'>
        <script src='https://player.vimeo.com/api/player.js'></script>
        <div id='vimeoContainer'>
          <iframe src={'https://player.vimeo.com/video/539307685?h=583d0b23c9&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=1&loop=1&title=0&byline=0&portrait=1&muted=1&autopause=0&controls=0'} frameBorder='0' allow='autoplay; fullscreen; picture-in-picture' style={{ width: '100%', height: '130vw' }} title='Short reel'></iframe>
        </div>
        <BannerSearch title='Your Asian Cinema visual library' />
      </div>
    </header>

  );

}
