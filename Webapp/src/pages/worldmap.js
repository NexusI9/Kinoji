

import { useEffect, useState, useRef } from 'react';
import useAPI from '@/lib/api';
import { Countries, Timeline, SideList, SegmentHeader } from '@/components/worldmap';
import { Earth } from '@/components/earth';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { CountryList } from '../components/worldmap';



function Worldmap() {

	const [country, setCountry] = useState(); 		//selected country : name
	const [history, setHistory] = useState();				//History Blob (all countries, 3D coordinate, events, movies, segments, 3D meshes)
	const scene = useRef();
	const resetDispatch = useDispatch();

	const handleCountryClick = (ctr) => setCountry(ctr);
	const handleCountryHover = (ctr) => scene.current && scene.current.goTo(ctr);
	const handleListLeave = () => scene.current && scene.current.reset();

	useEffect(() => {

		scene.current = new Earth({
			onUnfocus: () => setCountry(country),
			onFlagClick: (val) => setCountry(val)
		});

		const { post } = useAPI();

		post({ type: 'GET_ALL_HISTORY' }).then(result => {

			//---fill up blob object (movies/events/segments)
			const newCountries = result.data.map(histoCountry => {
				const ctr = Countries.filter(item => item.name.toLowerCase() === histoCountry.name.toLowerCase())[0]; //prev object
				return ({ ...ctr, history: histoCountry });
			});

			setHistory(newCountries);
			scene.current.countries = newCountries;
			scene.current.init();
		});

		return () => { scene.current = null; }

	}, [Countries]);


	useEffect(() => {

		if (!country) { return; }
		//use retrieved name to check history (now fetched and available)
		switch (country.name) {
			case 'world':
				resetDispatch({ type: 'SET_ACTIVE_SEGMENT', segment: null });
				return scene.current.reset();
			default:
				setCountry(country);
				return scene.current.scaleUp();
		}


	}, [country]);

	return (
		<div id="date_container" className="settings_container" data-country={country && country.name || 'world'}>
			<Head>
				<title>Movies & history worldmap | Kinoji</title>
			</Head>
			{!country?.history && history &&
				<CountryList
					countries={history}
					onCountryClick={handleCountryClick}
					onCountryHover={handleCountryHover}
					onListLeave={handleListLeave}
				/>}
			<div id="Earth"></div>

			{country?.history && <>
				<Timeline country={country} width={300} />
				<div id="timeline_settings">
					<AnimatePresence>
						<p onClick={() => setCountry({ name: 'world' })}>
							<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M7 2.5L4.5 5L7 7.5L6.5 8.5L3 5L6.5 1.5L7 2.5Z" />
							</svg>
							<small><b>choose another country</b></small></p>
						<header>
							<h4>Cinema history of&nbsp;<img src={country.flag.src} alt={`${country.name} flag icon`} />{country.name}</h4>
							<SegmentHeader />
						</header>
						<SideList country={country} />
					</AnimatePresence>
				</div>
			</>}
		</div>
	);

}

export default Worldmap;
