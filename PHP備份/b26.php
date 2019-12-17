<?php
$person['name']='ben';
$person['age']=19;
$person['weight']=70;
$person['programs']=['PHP','JAVA','C','Swift'];

foreach ($person['programs'] as $language) {
    echo $language.'<br>';
}
?>