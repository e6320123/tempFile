<?php
    function checkTWId($id){
        if (preg_match('/^[A-Z][12][0-9]{8}$/', $id)){
            $letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
            $c1 = substr($id,0,1);
            $n12 = strpos($letters, $c1) + 10;
            $n1 = (int)($n12 / 10);
            $n2 = $n12 % 10;
            $n3 = substr($id,1,1);
            $n4 = substr($id,2,1);
            $n5 = substr($id,3,1);
            $n6 = substr($id,4,1);
            $n7 = substr($id,5,1);
            $n8 = substr($id,6,1);
            $n9 = substr($id,7,1);
            $n10 = substr($id,8,1);
            $n11 = substr($id,9,1);
            $sum = $n1*1 + $n2*9 + $n3*8 + $n4*7 + $n5*6 + $n6*5 +
                    $n7*4 + $n8*3 + $n9*2 + $n10 + $n11;
            return $sum % 10 == 0;
        }
        return false;
    }
    function cid(){
        $gender = rand(0,1)==0;
        return  cidsex($gender);
    }
    function  cidsex($gender = false){
        $letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
        $area = substr($letters, rand(0,25), 1);
        return  cidboth($gender, $area);
    }
    function createTWIdByArea($area = 'B'){
        $gender = rand(0,1)==0;
        return  cidboth($gender, $area);
    }
    function  cidboth($gender, $area){
        $tempId = $area;
        $tempId .= $gender?'1':'2';
        for ($i=0; $i<7; $i++){
            $tempId .= rand(0,9);
        }
        for ($i=0; $i<10; $i++){
            if (checkTWId($tempId . $i)){
                // OK
                $tempId .= $i;
                break;
            }
        }
        return $tempId;
    } 


   function processData(){
        $data['title']='123';
        $data['user']='345';
        return $data;
    }
    class Student{
        public $ch,$eng,$math;
        function __construct($n,$n1,$n2){
            $this->ch=$n;
            $this->eng=$n1;
            $this->math=$n2;
        }
        function sum(){
            return $this->ch+$this->eng+$this->math;
        }
        function avg(){
            return $this->sum()/3;
        }
    }
?>