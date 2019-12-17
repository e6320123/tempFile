set @var1=123;
select @x:=1;
prepare upeng from 'update tb set eng=? where cid =?';
execute upeng using @eng,@cid;

create procedure t1()
    -> begin
    -> select * from tb;
    -> end?
Query OK, 0 rows affected (0.001 sec)

MariaDB [class]> \d ;
MariaDB [class]> call t1();

 

\d ?
create function fxy(x int,y int)
returns int 
begin
return x+y;
end?
\d ;

-------------------------------------------------
\d ?
create function ft1()
returns int 
begin
    declare v1 int;
    declare v2 int default 0;
    declare v3,v4,v5 int default 1;

    set v1=10,v3=3;
    return v1+v3+v4;

end?
\d ;

---------------------------------------------------
\d ?
create function ft2(score int)
    returns varchar(10)
begin
    declare ret varchar(10) default 'down';
    if score >=60 then
        set ret = 'pass';
    end if;
    return ret;
end?
\d;

----------------------------------
\d ?
create function ft4(score1 int,score2 int,score3 int)
returns varchar(10)
begin  
    declare ret varchar(10);
    declare avgs int;
    set avgs=(score1+score2+score3)/3;
    if avgs>=90 then set ret = 'A';
    elseif avgs >=80 then set ret = 'B'; 
    elseif avgs >=70 then set ret = 'C'; 
    elseif avgs >=60 then set ret = 'D'; 
    else set ret = 'E';
    end if;
    return ret;
end?
\d ;

----------------------------------
\d ?
create function ft5(score1 int,score2 int,score3 int)
returns varchar(10)
begin  
    declare ret varchar(10);
    declare avgs int;
    set avgs=(score1+score2+score3)/3;
    case
     when avgs >=90 then set ret = 'A' ; 
     when avgs >=80 then set ret = 'B' ;  
     when avgs >=70 then set ret = 'C' ;  
     when avgs >=60 then set ret = 'D' ;  
     else set ret = 'E';
    end case;
    return ret;
end?
\d ;

----------------------------------
\d *
create function ft(n int) returns int
begin  
    declare i int default 1;
    declare sum int default 0;
    while i<=n do
    set sum=sum+i;
    set i=i+1;
    end while;
    return sum;
end*
\d ;

drop function ft;
drop function if exists ft;
show function status;
----------------------------------
\d *
create function d1(n int) returns int
begin  
    declare i int default 1;
    declare sum int default 0;
    repeat
        set sum=sum+i;
        set i=i+1;
        until i>n
    end repeat;
    return sum;
end*
\d ;
----------------------------------
\d *
create function d2(n int) returns int
begin  
    declare i int default 1;
    declare sum int default 0;
    myloop:loop
        set sum=sum+i;
        set i=i+1;
        if i>n then leave myloop;
        end if;
    end loop;
    return sum;
end*
\d ;


    -- mywhile:while boolean do

    -- leave mywhile;
    -- end while (mywhile);
---------------------------------
    -- myrepeat:repeat

    -- leave myrepeat;
    -- until boolean
    -- end repeat (myrepeat);
    ----------------------------------
\d *
create function d3(n int) returns int
begin  
    declare i int default 0;
    declare sum int default 0;
    myloop:loop
        set i = i + 1;
        if i % 2 = 0 then iterate myloop;
        end if;
        set sum = sum + i;
        if i = n-1 then 
        
        leave myloop;
        end if;
    end loop;
    return sum;
end*
\d ;
