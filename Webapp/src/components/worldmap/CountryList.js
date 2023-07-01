
import { motion } from 'framer-motion';


export default ({ countries, onCountryClick = e => e, onCountryHover = e => e, onListLeave = e => e }) => (
    <div className='country-list'>
        <header>
            <h2>Choose a country</h2>
            <small className='discrete'>Select a country below to discover its cinema history through an interactive timeline.</small>
        </header>
        <ul onMouseLeave={onListLeave}>
            {countries?.map(country =>
                <li key={country.name + 'list item'}
                    onMouseEnter={() => onCountryHover(country)}
                    onClick={() => onCountryClick(country)}
                >
                    <h3><img alt={`${country.name} flag icon`} src={country.flag.src} />{country.name}</h3>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 7.5L5.5 5L3 2.5L3.5 1.5L7 5L3.5 8.5L3 7.5Z" />
                    </svg>
                </li>)}
        </ul>
    </div>
);