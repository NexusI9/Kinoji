import { Cta } from "../inputs";
import { ShotSlider } from "../movie";
import useAPI from "@/lib/api";


export default () => {

    const {post} = useAPI();

    return (
        <section className="newsletter-container container">
            <ShotSlider />
            <div className="newsletter-form">
                <h3>Join the asian cinema nerds</h3>
                <p>Get the latest high quality uploads as well as kinetic art news ! </p>
                <Cta onClick={ () => post({type:'addLead', name:'test', email:'test@test.com'}) }>subscribe</Cta>
            </div>
        </section>
    );

}