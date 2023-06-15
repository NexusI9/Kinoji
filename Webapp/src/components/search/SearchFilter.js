import { MicroFilters } from '@/components/inputs';
import { useEffect, useState } from 'react';

export default ({onChange=e=>0, items={} }) => {
    
    
    const [searchFilter, setFilter] = useState();
    const handleOnChange = (key) => {
        searchFilter[key] = !searchFilter[key];
        onChange(searchFilter);
    }

    useEffect( () => {

            const filters = {
                movies:false,
                personnalities:false,
                collections:false,
                aesthetics:false
              }

            //set search filters
            Object.keys(items).map( key => {
                if(key === 'movies' && items[key].length ){ filters.movies = true; }
                if( (key === 'dop' || key === 'directors') && items[key].length ){ filters.personnalities = true; }
                if( key === 'genres' && items[key].length ){ filters.collections = true; }
                if( key === 'colours' && items[key].length ){ filters.aesthetics = true; }
            });

            setFilter(filters);


    },[items]);

    return(
        <div className='search-filter'>
        <p><small className='discrete'>Filter by:</small></p>
        {searchFilter && Object.keys(searchFilter).map(key => <MicroFilters 
                key={key+'searchfilter'} 
                id={key+'searchfilter'} 
                label={key} 
                type='checkbox'
                name='searchfilter' 
                onChange={ () => handleOnChange(key) }
                defaultCheck={ searchFilter[key] }
                />
        )}
        </div>
    )
    
}