import { Fragment } from "react";

export default ({ tabs = [], onChange = _ => 0, name = ''}) => {
    
    return (<div className="tab-bar underline">
        {
            tabs.map((tab, i) => {
                const id = tab.name + name + i;
                return (<Fragment key={id}>
                    <input type='radio' id={id} name={name} value={tab.name} onChange={() => onChange(tab)} defaultChecked={ tab.defaultChecked } />
                    <label htmlFor={id} className={ tab.active === false ? 'inactive' : '' }>{tab.name}</label>
                </Fragment>)
            }
            )
        }
    </div>);

};