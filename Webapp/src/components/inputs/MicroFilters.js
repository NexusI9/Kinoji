const MicroFilters = ({ id, label, sort, name, onChange=(e)=>0, defaultCheck="false", ico, type='radio'}) => {

    return(
       <section className='microFilter' id={"micro_"+id}>
        <input 
          id={"micro_"+id+"_input"} 
          ata-sort={id} 
          type={type} 
          name={name} 
          onChange={ () => { onChange(label) } }  
          defaultChecked={ defaultCheck} 
        />
        <label htmlFor={"micro_"+id+"_input"} >
          { ico && ico }
          <p className='detail'>{label}</p>
        </label>
       </section>
    );
  }

  export default MicroFilters;