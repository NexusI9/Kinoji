import Cta from './Cta';
import Text from './Text';
import { useRef, useState, Fragment } from 'react';

export default (props) => {

    const [entries, setEntries] = useState(props.entries);
    const [submitted, setSubmitted] = useState(false);

    const handleOnSumbit = () => {
        let valid = true;
        entries.forEach((entry, i) => {
            if (!entry.ref.value.length && entry.required) {
                valid = false;
                entries[i].warning = true;
                setEntries([...entries]);
            }
        });

        if (valid) {

            entries.forEach((_, i) => entries[i].warning = false );

            setEntries([...entries]);

            if (props.submit?.onSubmit) { props.submit.onSubmit(entries); }
            setSubmitted(true);
        }

    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            {entries?.map(entry => <Fragment key={entry.name+'form_entry'}><Text {...entry} warning={entry.warning} innerRef={e => entry.ref = e} /></Fragment>)}
            <fieldset>
                <button className='cta primary' onClick={handleOnSumbit}>{props.submit?.content}</button>
                {submitted && <p className='submitted'><small><b>Thank you!</b></small></p>}
            </fieldset>
        </form>
    );


}