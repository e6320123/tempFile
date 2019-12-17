<?php
$mesg = isset($_GET['errorMesg'])? $_GET['errorMesg']:'';
echo $mesg;
?> 
 
<form action="chkacc2.php" method="get">  
      
 
Accout: <input type="text" name="acc"><br>
Password: <input type="password" name="pwd"><br>
<input type="submit" value="Login">&emsp;
<button type="button" onclick="location.href='reg.php'">
Register
</button>
</form>