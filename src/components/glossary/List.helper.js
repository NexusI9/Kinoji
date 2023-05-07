export const gather = (list, alp, value) => {
    //sort list alphabetically
    console.log({list, value});
    for( const i in list ){

      if(alp.length === 0){
        alp.push({letter: list[i][value][0], objects: [ list[i] ] });
        list.splice(i,1);
        return gather(list, alp, value);
      }else{

        for( const j in alp){

          if(list[i][value][0] === alp[j].letter){
            alp[j].objects.push( list[i] );
            list.splice(i,1);
            return gather(list, alp, value);
          }
        }

        alp.push({letter: list[i][value][0], objects: [ list[i] ] });
        list.splice(i,1);
        return gather(list, alp, value);
      }
    }


    alp.sort(function(a,b){
      if(a.letter > b.letter){ return 1; }
      if(a.letter < b.letter){ return -1; }
      return 0;
    });

    return alp;
  }