show variables where Variable_name = 'autocommit';
set autocommit=0;  --on(1) / off(0)
start transaction;
---...操作
---後悔
rollback;   --增刪修
commit;     --trigger永遠是auto_commit
---後悔
set autocommit=1;

-----------------------
\d #
create procedure addcato(in newcato varchar(100))
begin
    insert into catos (cato) values(newcato);
end#
\d ;

\d #
create procedure addcatov2(in newcato varchar(100))
begin
    declare exit handler for sqlstate '23000'    --23000 dulicate entry 'C003'
    begin
        select 'Error.';
    end; 
    insert into catos (cato) values(newcato);
        select 'Success.';
end#
\d ;
\d #
create procedure addcatov3(in newcato varchar(100))
begin
    declare continue handler for sqlstate '23000'     
    begin
        select 'Error.';
    end; 
    insert into catos (cato) values(newcato);
        select 'Success.';
end#
\d ;

--若pds新增產品,查cats有無pds的cat ,無則在cats新增cat = 新增的pds.cat
\d #
create trigger addcato before insert on pds for each row
begin
    declare continue handler for sqlstate '23000'   --trigger 不handle error '23000'  
    begin
         insert into catos (cato) values (new.cato);
    end; 
     
end#
\d ;

\d #
create trigger addcatov1 after insert on pds for each row
begin 
    select count(*) into @count from catos where cato=new.cato ;
    if @count = 0 then insert into catos (cato) values (new.cato);
    end if;
end#
\d ;
