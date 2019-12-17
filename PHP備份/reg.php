<?php

include 'sql.php';      //建立mysqli 物件並連線
if(isset($_POST['acc'])){
    $acc=$_POST['acc'];
    $pwd=$_POST['pwd'];
    $rlname=$_POST['rlname'];
    $icon=null;
    if($_FILES['icon']['error']==0){
        $icon= addslashes(file_get_contents($_FILES['icon']['tmp_name']));
    }#addslashes 遇到跳脫字元就加\
    $pwd1=password_hash($pwd,PASSWORD_DEFAULT);  //密碼加密
    $sql="insert into member(acc,pwd,rlname,icon) values ('{$acc}','{$pwd1}','{$rlname}','{$icon}')";
    if($mysqli->query($sql)){
        #success
        header('Location: log.php');
    }else{
        #failue
        echo'Failue';
    }
}
?>
<script>
    var xhttp = new XMLHttpRequest();
    function isFormCheckOk(){
        //...
        return true;    //按下submit後      true 導向到action頁   false 無法跳轉
        // return false;
    }
    function chkacc(){
        let acc = document.getElementById("acc").value;
        xhttp.onreadystatechange =aftchk;
        // GET版
        // xhttp.open("GET", "chkacc.php?="+acc, true);  //GET POST要大寫才行
        // xhttp.send();
        // POST版
        xhttp.open("POST", "chkacc.php", true);  //GET POST要大寫才行
        xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhttp.send("acc="+acc);    // (name1=value1 & name2=value2 & ...)
        xhttp.setRequestHeader("Content-type","multipart/form-data");


    }   
    function aftchk(){
        let msg = document.getElementById("msg");
        
        if (xhttp.readyState == 4 && xhttp.status == 200) {
       
            if (xhttp.responseText =='0') {
                msg.innerHTML = 'OK';
            } else {
                msg.innerHTML = 'XX';
                
            }
        }
    } 
</script>
<!--enctype 預設是 application/x-www-form-urlencoded -->
<form action="reg.php" enctype="multipart/form-data"      
method="post" onsubmit="return isFormCheckOk()"> <!--可看think.html-->
Accout: <input id="acc" type="text" name="acc" onchange="chkacc()">
   <span id="msg"></span> <br>
Password: <input type="password" name="pwd"><br>
Realname: <input type="text" name="rlname"><br>
Icon: <input type="file" name="icon"><br>
<input type="submit" value="Register">
</form>