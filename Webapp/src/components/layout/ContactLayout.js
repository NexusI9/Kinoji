import Form from '@/components/inputs/Form.js';
import logo from '@/assets/logo.svg';
import useAPI  from '@/lib/api';

export default ({ main = true }) => {

    const { post } = useAPI();

    const handleOnSubmit = (e) => {
        const name = e.filter(item => item.name === "name");
        const email = e.filter(item => item.name === "email");
        const message = e.filter(item => item.name === "message");

        if (name[0] && email[0] && message[0]) {
            post({
                type: 'SEND_MAIL',
                name: name[0].ref?.value || 'NULL',
                email: email[0].ref?.value || 'NULL',
                message: message[0].ref?.value || 'NULL'
            }).then(res => console.log(res));
        }
    }

    return (<section className='contact-container casual_content'>
        <header>
            {main ? <h1>Contact us</h1> : <h3>Contact us</h3>}
            <h4>
                Want to contribute to Kinoji?  Noticed any unaccurate information? Or simply want to say Hi?
                Feel free to reach out to us using the form or the email below.
            </h4>
            <a href='mailto:kinoji@elkhantour.com'>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.6094 5.6875L20.9219 13L13.6094 20.3125M19.9062 13L5.07812 13" stroke="#DBE4F2" strokeWidth="2.4375" strokeMiterlimit="10" strokeLinecap="square" />
                </svg>
                <b>kinoji@elkhantour.com</b>
            </a>
        </header>

        <div className='contact-form-container'>
            <img alt='logo' src={logo.src} />
            <Form
                entries={[
                    { name: 'name', placeholder: 'Your name', required: true },
                    { name: 'email', placeholder: 'Your email', required: true },
                    { name: 'message', placeholder: 'Your message', required: true, type: 'textarea' }
                ]}

                submit={{
                    content: 'send',
                    onSubmit: handleOnSubmit
                }}
            />
        </div>
    </section>);
}