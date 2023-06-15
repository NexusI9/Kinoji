export default ({ sources }) => {

    sources = sources.split(';');
  
    return (
      <div className='sourcebanner'>
        <section className='sourcebanner_header'>
          <div className='plusless link'>
            <p>+ <span className='underline'>sources</span></p>
            <div><p> - </p></div>
          </div>
          <span className='bar'></span>
        </section>
        <section>
          <ul>{
            sources.map((src) => {
              if(src.includes('html')){ return <li><a className='link' target='_blank' rel="noreferrer" href={src}>{src}</a></li> }
              else{ return <li>{src}</li> }
            })
          }</ul>
        </section>
      </div>
    );
  }