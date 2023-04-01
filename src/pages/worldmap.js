
import {DropDown } from '../components/inputs';
import { useEffect, useState, useRef } from 'react';
import FetchAPI from '../lib/fetchapi';
import { Earth, Countries, Timeline, SideList } from '../components/worldmap/';


function Worldmap(){

	const [ country, setCountry ] = useState(); 				//selected country : name
	const [ dropdown, setDropdown ] = useState([]);			//list of countries from history dtb

	const history= useRef();				//History Blob (all countries, 3D coordinate, events, movies, segments, 3D meshes)
	const scene = useRef(new Earth({
		onUnfocus: () => setCountry(),
		onFlagClick: (val) => setCountry(val)
	}));

	const onDropdownChange = (val) => {
		//setCountry( val.props.value );
	}


	useEffect(() => {

		document.title = "KINO寺 - Worldmap";

		const ListItem = ({value}) => ( <li name={value} className='microFilter'><div><span className='ico'></span><small>{value}</small></div></li> );
		const droplist = (ar) => [ <ListItem key='listelement_world' value='world' />, ...ar  ];

		FetchAPI.post({type:'getAllHistory'}).then(result => {

			//---fill up blob object (movies/events/segments)
			const newCountries = result.data.map( histoCountry => {
				const ctr = Countries.filter(item => item.name.toLowerCase() === histoCountry.name.toLowerCase() ); //prev object
				const history = {history: histoCountry};
				const list =  {list: <ListItem key={'listelement_'+histoCountry.name} value={histoCountry.name} /> }
			 	delete histoCountry.name;
				return Object.assign({}, ...ctr, history, list);
			});

			history.current= newCountries;
			setDropdown( droplist(newCountries.filter( country => country.list ).map(item => item.list)) );
			scene.current.countries = newCountries;
			scene.current.init();

		});

		return ( <div /> )
	}, [Countries]);

	useEffect( () => {

		if(!country){ return; }
			//use retrieved name to check history (now fetched and available)
			const {name} = country;
			setCountry(country); 
			scene.current.goTo(country); 

	},[country]);

return(
    <div id="date_container" className="settings_container" data-country={country && country.name || 'world'}>
					<div id="Earth"></div>
					{country && <Timeline country={ country } width={300}/> }
					<div id="timeline_settings">
						{console.log(country)}
						{country && <SideList country={country.name} /> }
						<DropDown 
							list={dropdown} 
							id='country_select' 
							name='country' 
							onChange={ onDropdownChange } 
							selected={ country ? country.name : null }
						/>
					</div>
  </div>
);

}

export default Worldmap;
