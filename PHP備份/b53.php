<?php

class Bike  {   //類別名稱通常首字大寫
    //fields
    protected  $speed=0;    //private 封裝  speed 不被外部直接竄改 ex: $b1->speed=5;
                              //protected this類和extends類可使用此變數
   
    function __construct(){//每個class都有預設空consturctor 繼承自stdClass
        echo 'bike build<br>';
    }
   
    //method                
    function upspeed(){     //function預設public
        $this->speed=$this->speed<1?1:$this->speed*1.2;
    }
    function downspeed(){
        $this->speed=$this->speed<1?0:$this->speed*0.7;
    }
    function getspeed(){
       return $this->speed;
    }
}
$b1=new Bike;   //小寫可以?
$b2=new Bike;
echo 'b1-speed: '.$b1->getSpeed().'<br>';
$b1->upSpeed(); 
echo 'b1-speed: '.$b1->getSpeed().'<br>';
$b2->upSpeed();
echo 'b2-speed: '.$b2->getSpeed().'<br>';

//Scooter is-a Bike
class Scooter extends Bike{
    private $gear=0;

    function chGear($n=0){
        $this->gear=$n;
    }

    //Override 複寫
    function upspeed(){
        // func_get_args
        $this->speed=$this->speed<1?1:$this->speed*($this->gear*1.2);
    }
    //Overload 複載
    // function upspeed($gear){
    //     $this->speed=$this->speed<1?1:$this->speed*1.5;
    // }
     
}
// var_dump($s1);
// echo '<br>';  
// var_dump($b1);
// echo '<br>';

$s1=new Scooter;
echo gettype($s1).'<br>';
$s1->chgear(5);
$s1->upspeed();$s1->upspeed();
echo's1:' .$s1->getspeed().'<br>';

echo'<hr>';
class Person{
    //have-a
    private $bike,$scooter,$name;
    //建構式,建構子,建構方法=> Constructor
    function __construct($i){
        $this->bike=new Bike;
        $this->scooter=new Scooter;
        $this->name=$i;
        echo'person build<br>';
    }
        function getName(){
            return $this->name;
        }
        function getbike(){
            return $this->bike;
        }
    
}
$ben=new Person('ben');
$eric=new Person('eric');
// $ben->getbike()->upspeed();
// $ben->getbike()->upspeed();
// $eric->getbike()->upspeed();
// $eric->getbike()->upspeed();
// $eric->getbike()->upspeed();

// echo$ben->getname().':'.$ben->getbike()->getspeed();
?>