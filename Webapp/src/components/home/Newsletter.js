import { useEffect, useRef } from "react";
import { Form } from "../inputs";
import { ShotSlider } from "../movie";
import useAPI from "@/lib/api";


export default () => {

    const { post } = useAPI();

    const handleOnSumbit = (e) => {
        const name = e.filter(item => item.name === "name");
        const email = e.filter(item => item.name === "email");
        if (name[0] && email[0]) {
            post({ type: 'ADD_LEAD', name: name[0].ref?.value || 'NULL', email: email[0].ref?.value || 'NULL' });
        }
    }

    return (
        <section className="newsletter-container container">
            <ShotSlider />
            <div className="newsletter-form">
                <header>
                    <h3>Join the asian cinema club</h3>
                    <p>Get the latest high quality uploads as well as kinetic art news ! </p>
                </header>
                <Form
                    entries={[
                        { name: 'name', placeholder: 'Your name', required: true },
                        { name: 'email', placeholder: 'Your email', required: true },
                    ]}
                    submit={{ content: 'subscribe', onSubmit: handleOnSumbit }}
                />
                <p className="discrete">
                    <small>
                        By subscribing you agree to receive mails from Kinoji and our Privacy Policy. <br />
                        You will be able to unsubscribe at any time.
                    </small>
                </p>
            </div>
        </section>
    );

}