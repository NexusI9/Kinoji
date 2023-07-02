import { useRef, useState } from 'react'

export default ({ placeholder = '', required, innerRef = _ => 0, warning = false, type }) => {

    const input = useRef();
    const [active, setActive] = useState(false);

    return (
        <label className={`${required ? 'required' : ''} ${active ? 'active':''} `}>
            {type == 'textarea' ?
                <textarea
                    ref={e => { input.current = e; return innerRef(e) }}
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive((!!input.current?.value.length))}
                ></textarea>
                :
                <input
                    type='text'
                    ref={e => { input.current = e; return innerRef(e) }}
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive((!!input.current?.value.length))}
                />}

            <p className='placeholder'>{placeholder}</p>
            <p className='warning'><small><b>{(warning && required) && 'This filed is required'}</b></small></p>
        </label>
    );
}
