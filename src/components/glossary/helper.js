export function setDate(item){
    if(item.birthday && item.deathday){ return item.birthday.split('-')[0] +'-'+ item.deathday.split('-')[0] }
    if(item.birthday && !item.deathday){ return item.birthday.split('-')[0] +'-today';}
    if(!item.birthday && !item.deathday){ return ''; }
    return item.birthday.split('-')[0];
}