export default ({label, icon, onClick}) => (
    <div className='button' data-icon={icon ? 1 : 0} onClick={onClick}>
    {icon ? icon : <></>}
    <small>{label}</small>
    </div>
);