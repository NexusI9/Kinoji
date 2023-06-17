<?php
function filter_to_key($ar, $skey, $unique=False){
  $tempar = array();
  foreach ($ar as $key => $value){ $tempar[$key] = $value[$skey]; }

  $tempar = array_filter($tempar);
  if($unique){ $tempar = array_unique($tempar); }
  return $tempar;
}

function add_percent($ar){
  foreach ($ar as $key => $value) { $ar[$key] = '%'.$value.'%';  }
  return $ar;
}

?>