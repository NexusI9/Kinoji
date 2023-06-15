//Inputs
export default ({ id, labels, onClick}) => {


    return(
      <form id={id} className='microFilter switcharo'>
        {
          labels.map( label =>
          <div key={'form'+label.value}>
            <input key={'input_'+label.value} name={id} id={'switch_'+label.value} type='radio' value={label.value} defaultChecked={label.checked || false} onClick={(e) => onClick(e.target.value) }/>
            <label key={'label_'+label.value} htmlFor={'switch_'+label.value}>
                <span></span>
                <small>{label.label}</small>
            </label>
          </div>
      )}
      </form>
    );
  }
  