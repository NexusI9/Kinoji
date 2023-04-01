export const LabelBar = ({ label, ico , hyperlink, hero=true, underline=true, sticky=false}) => {

    ico = ico ? <span className={'ico bigico '+ ico}></span> : null;
    return(
      <div className={`category_header ${underline ? 'underline' : '' } ${sticky ? 'sticky' : ''}`}>
      { hero ? <h2 className='label'>{ico}{label}</h2> : <h4 className='label'>{ico}{label}</h4>  }
      { hyperlink }
      </div>
    
    );
}

export default LabelBar;