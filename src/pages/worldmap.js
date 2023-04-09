
import {DropDown } from '@/components/inputs';
import { useEffect, useState, useRef } from 'react';
import useAPI from '@/lib/api';
import { Countries, Timeline, SideList } from '@/components/worldmap';
import { Earth } from '@/components/earth';
import { AnimatePresence } from 'framer-motion';


function Worldmap(){

	const [ country, setCountry ] = useState(); 		//selected country : name
	const [ dropdown, setDropdown ] = useState([]);		//list of countries from history dtb
	
	const history= useRef();				//History Blob (all countries, 3D coordinate, events, movies, segments, 3D meshes)
	const scene = useRef();

	const onDropdownChange = (val) => setCountry(val);

	useEffect(() => {

		scene.current = new Earth({
			onUnfocus: () => setCountry(country),
			onFlagClick: (val) => setCountry(val)
		});

		document.title = "KINO寺 - Worldmap";
		const {post} = useAPI();

		const ListItem = ({value}) => ( 
					<div className='microFilter'>
						<span className='ico country' name={value}></span>
						<small>{value}</small>
					</div>
				);


		post({type:'getAllHistory'}).then(result => {

			//---fill up blob object (movies/events/segments)
			const newCountries = result.data.map( histoCountry => {
				const ctr = Countries.filter(item => item.name.toLowerCase() === histoCountry.name.toLowerCase() )[0]; //prev object
				const id = ctr.name;
				return ({ 
					...ctr,
					history: histoCountry,
					dropdown: {
						id:id,
						item: <ListItem key={'listelement_'+histoCountry.name} value={histoCountry.name} /> 
					}
				});
			});

			history.current= newCountries;

			setDropdown([
				{ 
					name:'world',
					dropdown: {
						id:'world', 
						item:<ListItem key='listelement_world' value='world' /> 
					}
				}, 
				...newCountries
			]);

			scene.current.countries = newCountries;
			scene.current.init();

		});

		return () => {}
	}, [Countries]);

	useEffect( () => {
		
		if(!country){ return; }
			//use retrieved name to check history (now fetched and available)
			switch(country.name){
				case'world':
					return scene.current.reset();
				default:
					setCountry(country); 
					return scene.current.goTo(country); 
			}


	},[country]);

return(
    <div id="date_container" className="settings_container" data-country={country && country.name || 'world'}>
					<div id="Earth"></div>
					{country?.history && <Timeline country={ country } width={300}/> }
					<div id="timeline_settings">
						{ <DropDown 
							list={dropdown} 
							id='country_select' 
							name='country' 
							onChange={ onDropdownChange } 
							filter={ e => e.dropdown.item }
							selected={ country?.dropdown }
						/>	}
						<AnimatePresence>
							{country && country.history && <SideList country={country} /> }
						</AnimatePresence>
					</div>
  </div>
);

}

export default Worldmap;
