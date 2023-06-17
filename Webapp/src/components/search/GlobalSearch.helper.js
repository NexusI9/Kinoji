export function lengthOfCategory(result, category){ //combine peoples length
    return (category !== 'peoples') ? result[category].length : [...result['dops'],...result['directors'], ...result['artdirs']].length; 
}