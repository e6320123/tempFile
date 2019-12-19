<?php
// Connects to DB and returns DB lid
// PRIVATE
// function connect()

// Runs query and sets up the query id for the class.
// PUBLIC
// function query($qstr)
// Return next record in result set
// PUBLIC
// function next_record()
// Field Value
// PUBLIC
// function f($field_name)
// Selective field value
// PUBLIC
// function sf($field_name)
// Print field
// PUBLIC
// function print_value($field_name)
// Selective print field
// PUBLIC
// function sp($field_name)
// Returns the number of rows in query
// function num_rows()

// Halt and display error message
// PRIVATE
// function halt($msg)
//include "./library.php";

 class proc_DB
 {
  var $dbhost = DB_HOST;
  var $dbuser = DB_USER;
  var $dbpwd = DB_PWD;
  var $dbname = DB_NAME;
  var $lid = 0;                // Link ID for database connection
  var $qid = 0;                // Query ID for current query
  var $row;                    // Current row in query result set
  var $record = array();       // Current row record data
  var $error = "";             // Error Message
  var $errno = "";             // Error Number
  var $pflag=1;                //預設為 pconnect
  var $lastamount=0;           //最後query取得的資料筆數

  function proc_DB($host='',$user='',$pwd='',$dbname='')
  {
   if(!empty($host))
   {
    $this->dbname = $dbname;
    $this->dbhost = $host;
    $this->dbuser = $user;
    $this->dbpwd = $pwd;
   }
   
  }

  function connect($connect_flag=0)
  {
  	//因為 mysql5 同帳密 在同一隻程式 new 兩次 mysql_connect, lid 會是相同,所以在 
  	//mysql_connect(第四個參數 new_link 要為true ),每個連線 lid 會是新的
   if($this->lid == 0){
	 if ($connect_flag){
		$this->lid = mysql_connect($this->dbhost,$this->dbuser,$this->dbpwd,true);
		$pflag=0;
	 }else{
		$this->lid = mysql_connect($this->dbhost,$this->dbuser,$this->dbpwd,true);
		$pflag=1;
	 }
	//@mysql_query("SET NAMES 'utf8'", $this->lid);
	//@mysql_query("SET CHARACTER_SET_CLIENT=utf8", $this->lid);
	//@mysql_query("SET CHARACTER_SET_RESULTS=utf8", $this->lid);
	//@mysql_query("SET character_set_connection = utf8", $this->lid);
	if(!$this->lid) $this->halt("connect(" . $this->dbhost . "," . $this->dbuser . ",PASSWORD)  failed.");
	else @mysql_query("SET names 'utf8',character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8',character_set_database = 'utf8', character_set_server = 'utf8'", $this->lid); 
	if (!@mysql_select_db($this->dbname,$this->lid)) {
		$this->halt("Cannot connect to database ".$this->dbname." to by dbhost =>".$this->dbhost);
		return 0;
	}
   }
   return $this->lid;
  }

  function query($qstr,$action=0)
  {
   if(empty($qstr))  return 0;
   if(!$this->connect(1))    return 0;
   if($this->qid)
   {
    @mysql_free_result($this->qid);
    $this->qid = 0;
   }
   $qstr = str_replace('\\', '\\\\', $qstr);
   $this->qid = @mysql_db_query($this->dbname,$qstr, $this->lid);
   $this->row   = 0;
   $this->errno = mysql_errno();
   $this->error = mysql_error();
   if (!$this->qid)
     $this->halt("Invalid SQL: ".$qstr);
   $this->lastamount = @mysql_num_rows($this->qid);
   if($action)
    $this->next_record();
   return $this->qid;
  }

  function muti_query($qstr)
  {
   if(empty($qstr))  return 0;
   if(!$this->connect(1))    return 0;
   if($this->qid)
   {
    @mysql_free_result($this->qid);
    $this->qid = 0;
   }
   $aqstr = explode(";",$qstr);
   for($i=0; $i<count($aqstr)-1; $i++)
   {
    $aqstr[$i] = str_replace('\\', '\\\\', $aqstr[$i]);
    $this->qid = @mysql_db_query($this->dbname,$aqstr[$i], $this->lid);
    $this->row   = 0;
    $this->errno = mysql_errno();
    $this->error = mysql_error();
    if (!$this->qid)
     $this->halt("Invalid SQL: ".$aqstr[$i]);
   }
   $this->next_record();
   $lastamount = @mysql_num_rows($this->qid);
   return $this->qid;
  }

  function get_total_data($qfield='')
  {
   $count = 0;
   $all_data=array();
   while($this->next_record())
   {
    if(empty($qfield))
     $all_data[$count] = $this->record;
    else
     $all_data[$this->record[$qfield]] = $this->record;
    $count++;
   }
   return $all_data;
  }

  function next_record()
  {
   if(!$this->qid)
   {
//    $this->halt("next_record called with no query pending.");
    return false;
   }
   $this->record = @mysql_fetch_array($this->qid);
   $this->row   += 1;
   $this->errno  = mysql_errno();
   $this->error  = mysql_error();
   if(is_array($this->record))
    return true;
   else
   {
    @mysql_free_result($this->qid);
    $this->qid = 0;
    return false;
   }
  }

  function f($field_name)
  {
   //return iconv("utf-8","utf-8",stripslashes($this->record[$field_name]));
   return $this->record[$field_name];
  }

  function sf($field_name)
  {
   global $vars, $default;

   if($vars["error"] and $vars["$field_name"])
    return stripslashes($vars["$field_name"]);
   else if($default["$field_name"])
    return stripslashes($default["$field_name"]);
   else
    return stripslashes($this->record[$field_name]);
  }

  function print_value($field_name)
  {
   print stripslashes($this->record[$field_name]);
  }

  function sp($field_name)
  {
    global $vars, $default;

   if($vars["error"] and $vars["$field_name"])
    print stripslashes($vars["$field_name"]);
   else if($default["$field_name"])
    print stripslashes($default["$field_name"]);
   else
    print stripslashes($this->record[$field_name]);
  }

  function num_rows()
  {
   if($this->lid)
    return $this->lastamount;
   else
    return 0;
  }

  //function halt($msg)
  //{
   //$this->error = @mysql_error($this->lid);
   //$this->errno = @mysql_errno($this->lid);
//   printf("</td></tr></table><b>Database error:</b> %s<br>\n", $msg);
//   printf("<b>MySQL Error</b>: %s (%s)<br>\n",$this->errno,$this->error);
   //showerror("Database Error!!","<b>MySQL Error</b>: $this->errno ($this->error)<br>$msg<br>","javascript:history.go(-1);");
   //exit;
  //}

  function halt($msg)
  {
   global $USER_IP,$user,$PHP_SELF;
   $this->error = @mysql_error($this->lid);
   $this->errno = @mysql_errno($this->lid);
   $user="[".$msg."]";
   $IP_add=$_SERVER["REMOTE_ADDR"];
   $today=getdate();
   if(!is_dir(FILE_PATH."/log/error_log")){mkdir(FILE_PATH."/log/error_log",0777);}
   $dir_date=FILE_PATH."/log/error_log/".gmdate("Y-m-d",mktime($today[hours]+WEB_TIME_ZONE,$today[minutes],$today[seconds],$today[mon],$today[mday],$today[year]));
   $file_date=gmdate("H",mktime($today[hours]+WEB_TIME_ZONE,$today[minutes],$today[seconds],$today[mon],$today[mday],$today[year]));
   if(!is_dir($dir_date)){mkdir($dir_date,0777);}
   $file_log=fopen($dir_date."/error_log.".$file_date.".log","a");
   fwrite($file_log,gmdate("i:s",mktime($today[hours]+WEB_TIME_ZONE,$today[minutes],$today[seconds],$today[mon],$today[mday],$today[year]))."\t".$USER_IP."\t".$user."\t".HTTP_USER_AGENT."\t".HTTP_ACCEPT_LANGUAGE.$PHP_SELF."\n");
   fclose($file_log);
   //showerror("System error",$msg);
   showerror("System error","System error");
   //showerror("Database Error!!","<b>MySQL Error</b>: $this->errno ($this->error)<br>$msg<br>","javascript:history.go(-1);");
   exit;
  }

  function record_count()
  {
   if($this->qid)
   {
    $this->record = @mysql_fetch_row($this->qid);
    return @count($this->record);
   }
   else
    return 0;
  }

  function record_list($num)
  {
	if ($this->record)
   	return @mysql_field_name($this->qid,$num);
	else
		return 0;
  }

  function insert_id($qstr)
  {
	$this->query($qstr);
	return @mysql_insert_id($this->lid);
  }

  function close()
  {
   if($this->qid)
   {
    @mysql_free_result($this->qid);
    $this->qid = 0;
   }
   if ($pflag) return;
   if($this->lid)
   {
    @mysql_close($this->lid);
    $this->lid = 0;
   }
  }
}