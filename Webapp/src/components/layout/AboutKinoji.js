export default ({main=true}) => {

    return(
      <section id='aboutKinoji' className='container'>
        <svg width="268" height="269" viewBox="0 0 268 269" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.000119603 134.405C-0.0226345 151.395 3.20149 168.233 9.49903 184.012L128.163 65.3483L76.2989 13.4634C53.493 24.4048 34.2357 41.5574 20.7392 62.9506C7.24278 84.3439 0.0546405 109.11 0.000119603 134.405Z" fill="#DD0000"/>
          <path d="M13.0479 192.117C27.7025 222.805 53.4716 246.778 85.1372 259.18C116.803 271.583 151.998 271.489 183.597 258.916L64.9326 140.252L13.0479 192.117Z" fill="#DD0000"/>
          <path d="M268 134.405C268.02 117.421 264.796 100.591 258.501 84.8176L139.836 203.482L191.701 255.346C214.51 244.409 233.77 227.257 247.267 205.863C260.764 184.469 267.95 159.7 268 134.405Z" fill="#DD0000"/>
          <path d="M133.99 0.415243C117.006 0.385502 100.173 3.61018 84.4027 9.9144L203.067 128.578L254.952 76.694C244.004 53.8902 226.847 34.6362 205.45 21.1436C184.053 7.65095 159.285 0.466471 133.99 0.415243Z" fill="#DD0000"/>
        </svg>
  
          <div>
            {main ? <h1>About Kinoji</h1> : <h3>About Kinoji</h3>}
            
           <p>
            Kinoji is an online cinematography library that focuses on Asian and author cinema. 
            <br/>
            The website serves as a search engine and gathering place for movie enthusiasts and artists who are looking for inspiration or hoping to increase their knowledge about Asian cinema. With a mission to educate and inform,
            Kinoji provides a comprehensive database of movies and directors, making it easy for users to discover new films and expand their cinematic horizons. 
            </p>
          </div>
      </section>
    );
  }