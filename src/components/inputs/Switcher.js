import Options from "./Options";

const Switcher = (props) => {

    return (
      <section id='displaySwitch'>
          <label className='switch'>
            <input id='isMosaic' type='checkbox' onChange={(e) => props.onChange(e.target.checked)} defaultChecked={props.activated}/>
            <span className='slider round'></span>
            <Options id="poster" param="" hover={false} />
            <Options id="mosaic" param="" hover={false} />
          </label>
      </section>
    );
  
  }

  export default Switcher;
  