import { Fragment } from "react";

export default ({ tabs = [], onChange = _ => 0, name = '' }) => {


    return (<div className="tab-bar underline">
        {
            tabs.map((tab, i) => {
                const id = tab.name + name + i;
                return <Fragment key={id}>
                    <input type='radio' id={id} name={name} value={tab.name} onChange={() => onChange(tab)} defaultChecked={!(!!i)} />
                    <label htmlFor={id}>{tab.name}</label>
                </Fragment>
            }
            )
        }
    </div>);

};