import Head from 'next/head';
import Script from 'next/script';
import { Footer, TopBar } from '@/components/static';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { useEffect } from 'react';

import '../sheets/index.scss';
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

                <meta name="description" content="KINOJI :: Your Asian movies stills library" />
                <meta property="og:site_name" content="KINOJI :: Your Asian movies stills library"/>
                <meta name="twitter:site_name" content="KINOJI :: Your Asian movies stills library"/>
                <meta content="KINOJI :: Your Asian movies stills library" property="og:title"/>
                <meta content="KINOJI :: Your Asian movies stills library" property="twitter:title"/>
                <meta content="Kinoji is the free Asian movies stills library, gathering thousands High-Res shots from hundreds Asian movies and anime." name="description"/>
                <meta content="Kinoji is the free Asian movies stills library, gathering thousands High-Res shots from hundreds Asian movies and anime." property="og:description"/>
                <meta content="Kinoji is the free Asian movies stills library, gathering thousands High-Res shots from hundreds Asian movies and anime." property="twitter:description"/>
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