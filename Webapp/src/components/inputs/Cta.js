import { useRouter } from "next/router";

export default ({type='primary', onClick, children, href}) => {

    const router = useRouter();

    const handleOnClick = () => {
        if(href){ router.push({pathname:href}); }
        if(onClick){ onClick(); }
    }

    return( 
        <a onClick={handleOnClick} className={`cta ${type}`} >{children}</a>
    )};
