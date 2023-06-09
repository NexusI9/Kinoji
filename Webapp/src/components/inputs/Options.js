export default ({ id, label, icon }) => (
    <span className='label'>
        { !icon ? <span className={'ico '+id}></span> : icon }
        {label && <p>
            <small>{label}</small>
        </p>
        }
    </span>
);