
import { RadioLabel } from '../components/inputs';
import { useState } from 'react';
import { hasHistory, setEventDate } from '../../lib/utilities';

const SideList = ({ country }) => {


	const ListElement = ( {element, category} ) => {

		let header, subtext = '';

		switch( category ){
			case 'movies':
				header = element.title;
				subtext= element.date.split('-')[0];
			break;

			default:
				header = element.header;
				subtext= setEventDate(element);
		}

		return (
			<li name={category}>
				<section>
					<span className='dot_events small'></span>
				</section>
				<section>
					<p style={{margin:0, padding:0}}>{header}</p>
					<small>{subtext}</small>
				</section>
			</li>
		);

	}
	const categories = [
		{
			value:'segments',
			label:'Eras',
			checked:true,
		},
		{
			value:'movies',
			label:'Movies',
		},
		{
			value:'events',
			label:'Events',
		}
	];
	const [ category, setCategory ] = useState(categories[0].value);


	return(

		<div id="history_sidelist"  className='toReveal' style={{opacity: hasHistory(country) ? 1 : 0, pointerEvents: hasHistory(country) ? 'auto' : 'none' }} >
		<div>
			<RadioLabel id='historadio' labels={categories} onClick={ setCategory } />
		</div>
		<ul className='sideContent'>
			{
				 hasHistory(country, category) && country[0].history[category].map( (item,i) => <ListElement key={'list_'+item.name+i} element={item} category={category} /> )
			}
		</ul>
	</div>

	);

}

export default SideList;