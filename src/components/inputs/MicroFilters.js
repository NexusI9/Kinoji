const MicroFilters = ({ id, label, sort, name, onChange, defaultCheck=false}) => {

    const active = ( (sort && sort === id) || (!sort && id === 'name') ) ? "checked" : "";
  
    return(
       <section className='microFilter' id={"micro_"+id}>
        <input id={"micro_"+id+"_input"} data-sort={id} type='radio' name={name} onChange={ () => onChange(label) }  defaultChecked={defaultCheck}/>
        <label htmlFor={"micro_"+id+"_input"} >
          <span className='ico'></span>
          <p className='detail'>{label}</p>
        </label>
       </section>
    );
  }

  export default MicroFilters;