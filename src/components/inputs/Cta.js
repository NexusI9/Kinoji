import { Link, useNavigate } from "react-router-dom"

const Cta = ({type='primary', to, children}) => {

    const navigate = useNavigate();

    return( 
        <a onClick={ () => navigate(to) } className={`cta ${type}`} >{children}</a>
    )};

export default Cta;