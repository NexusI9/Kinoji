export default (props) => {

    const {value} = props;
  
    return (
      <>
        <input type='checkbox' id={'tag_'+value} value={value} onChange={(e) => props.onChange({state:e.target.checked, value:value}) } />
        <label htmlFor={'tag_'+value} className='tag microFilter'><small>{value}</small></label>
      </>
    );
  
  }
  