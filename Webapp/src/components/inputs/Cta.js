import { useRouter } from "next/router";

const Cta = ({type='primary', to, children}) => {

    const router = useRouter();

    return( 
        <a onClick={ () => router.push({pathname:to}) } className={`cta ${type}`} >{children}</a>
    )};

export default Cta;