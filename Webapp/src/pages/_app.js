import Head from 'next/head';
import Script from 'next/script';
import { Footer, TopBar } from '@/components/static';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { useEffect } from 'react';

import '../sheets/style.scss';
import '../sheets/smallscreen.scss';
import '../sheets/timeline.scss';

export default function App({ Component, pageProps }) {


    useEffect(() =>{

        window.dataLayer = window.dataLayer || [];
        function gtag(){
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-DF5SRDEKG0');

    },[]);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />

                <meta name="description" content="KINOJI - Your portal to asia cinema" />
                <meta property="og:site_name" content="KINOJI - Your portal to asia cinema"/>
                <meta name="twitter:site_name" content="KINOJI - Your portal to asia cinema"/>
                <meta content="KINOJI - Your portal to asia cinema" property="og:title"/>
                <meta content="KINOJI - Your portal to asia cinema" property="twitter:title"/>
                <meta content="Kinoji is a free online cinematography library gathering thousands shots from hundreds asian movies and anime." name="description"/>
                <meta content="Kinoji is a free online cinematography library gathering thousands shots from hundreds asian movies and anime." property="og:description"/>
                <meta content="Kinoji is a free online cinematography library gathering thousands shots from hundreds asian movies and anime." property="twitter:description"/>
                <meta property="og:type" content="website"/>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DF5SRDEKG0" />

            <Provider store={store}>
                <TopBar/>
                <Component {...pageProps} />
                <Footer/>
            </Provider>
        </>
    )
  }