<?php
date_default_timezone_set('Asia/Taipei');
?>
<?php
$luzin='C:\Users\USER\Desktop\iii_mysql-master';
$fp=opendir("C:/Users/USER/Desktop/iii_mysql-master/test1");   //正斜線不用跳脫
$fp=opendir("C:\Users\USER\Desktop\iii_mysql-master\\test1");
$fp=opendir('C:\Users\USER\Desktop\iii_mysql-master\test1') or exit('...');
$fp=opendir('C:\Users\USER\Desktop\iii_mysql-master') or die('...');
echo gettype($fp).'<br>';         //雙引號會解譯變數  單引號不會

echo readdir($fp).'<br>';   // . 本目錄
echo readdir($fp).'<br>';   // .. 上個目錄
echo readdir($fp).'<br>';   // 檔案1
echo readdir($fp).'<br>';   // 檔案2
echo '<br>';
 while ($filename = readdir($fp)) {
    // echo readdir($fp).'<br>';
    if(is_dir($luzin.'/'.$filename)){// is_dir('相對路徑 or 絕對路徑 not filename')
        echo'[dir]';
    
    }else{
        echo'[file]';
    }
    echo filesize($luzin.'/'.$filename).'byte<br>';
    echo $filename.'<br>';
    echo '上次修改時間:'.date("Y/m/d  G:i..s",filemtime ( $luzin.'/'.$filename)).'<br>';
    echo'<br><br>';
 }

closedir($fp);
// unlink('C:\Users\USER\Desktop\iii_mysql-master\新文字文件.txt');
?>