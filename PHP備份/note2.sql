\d ?
create procedure ptest1()
begin
    select * from tb;
end ?
\d ;

------------------
call ptest1();
------------------
--in, out, inout
\d ?
create procedure ptest2(in x int)
begin
     select x;
end ?
\d ;

--------------
call ptest2(4);
--------------
\d ?
create procedure ptest3(out x int)
begin
     select x;
end ?
\d ;

--------------
\d ?
create procedure ptest4(out x int)
begin
     select count(*) into x from tb;
end ?
\d ;

-------------------
call ptest4(@num);
select @num;
-----------------
\d ?
create procedure ptest5(inout x int)
begin
     select x;
end ?
\d ;

---------------------
set @a=123;
call ptest5(@a);
--------------------
\d ?
create procedure ptest6(inout x int)
begin
     select x;
     select max(ch) into x from tb;
end ?
\d ;

-----------------------
set @scro=0;    --@scro==0
call ptest6(@scro);      --@scro==98
-----------------------
\d ?
create procedure ptest75(in kw varchar(100),out count int)
begin
set @key =concat(kw,"%") collate utf8_unicode_ci;
     select count(*) into count from tb where cphone like @key collate utf8_unicode_ci;
      
end ?
\d ;

---------------------
 call ptest75("092",@x);
 --------------------
 \d #
create procedure ptest77(in kw varchar(100))
begin
set @key =concat("%",kw,"%") collate utf8_unicode_ci;
set @query= 'select cid,cname,cphone from tb where cname like ?';
      
      prepare stmt from @query;
      execute stmt using @key;
end #
\d ;

-------------- 
call ptest77("林")
--------------
--create trigger tname timing event on tbname for each row xxx;
 \d #
create trigger tt1 after insert on mytb for each row 
begin
    insert into eventlog(message) values 
        (concat("insert new t1 :",new.t1));
end #
\d ;

-------------------------
select * from eventlog;
--------------
--create trigger tname timing event on tbname for each row xxx;
 \d #
create trigger tt2 before insert on mytb for each row 
begin
    insert into mynt(timing,action,etime,log) values 
        ('before','insert',now(),concat('insert t1: old:'));
end #
\d ;

 \d #
create trigger tt3 after insert on mytb for each row 
begin
    insert into mynt(timing,action,etime,log) values 
        ('after','insert',now(),concat('insert t1: new:',new.t1));
end #
\d ;

--------------------------------------------------
 \d #
create trigger tt4 before update on mytb for each row 
begin
    insert into mynt(timing,action,etime,log) values 
        ('before','update',now(),concat('update t1: old:',old.t1));
end #
\d ;

--------------------------------------------------
 \d #
create trigger tt5 after update on mytb for each row 
begin
    insert into mynt(timing,action,etime,log) values 
        ('after','update',now(),concat('update t1: ',old.t1,'=>',new.t1));
end #
\d ;

--------------------------------------------------
 \d #
create trigger tt6 before delete on mytb for each row 
begin
    insert into mynt(timing,action,etime,log) values 
        ('before','delete',now(),concat('delete: id=',old.id,',t1=',old.t1));
end #
\d ;

 \d #
create trigger tt7 after delete on mytb for each row 
begin
    insert into mynt(timing,action,etime,log) values 
        ('after','delete',now(),concat('delete ok'));
end #
\d ;
--------------------------------------------------
create table pds (id int primary key auto_increment,name varchar(100),cat int unique key);
create table cats (id int primary key auto_increment,cat int unique key);
--------------------------------------------------
--若pds新增產品,查cats有無pds的cat  ,無則在cats新增cat = 新增的pds.cat
\d #
create trigger tt8 after insert on pds for each row 
begin
     if select cat from cats where cato=pds.cat = 
     then insert into cats (cat) values (pds.cat);
     end if;
end #
\d ;

--------------------------anser
\d #
create trigger addcatov1 after insert on pds for each row
begin 
    select count(*) into @count from catos where cato=new.cato ;
    if @count = 0 then insert into catos (cato) values (new.cato);
    end if;
end#
\d ;
