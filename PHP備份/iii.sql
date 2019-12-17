
create database iii default character set utf8;

use iii;

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

create table customers (id int primary key auto_increment,name varchar(20),tel varchar(15)
    unique key ,email varchar(30),address varchar(40));

create table suppliers (id int primary key auto_increment,name varchar(20),tel varchar(15)
    unique key, address varchar(40));

create table products (id int primary key auto_increment,product_id varchar(5) unique key,
name varchar(20),price int,supplier_id int ,
          foreign key (supplier_id) references suppliers (id));

create table orders (id int primary key auto_increment,
	order_id varchar(5) unique key,customer_id int,
          foreign key (customer_id) references customers (id));

create table order_details (id int primary key auto_increment,
	order_id varchar(5) ,product_id varchar(5), price int ,count int,
          foreign key (order_id) references orders (order_id),
		foreign key (product_id) references products (product_id));

insert into customers (id,name,tel,email,address) 
values(1,'Ben','0918520123','xxx9123@gmail.com','taiwan.taichung'),
(2,'Tom','092220123','xxx@mail','taiwan.taichung'),
(3,'Jonh','09844123','xxx@mail','taiwan.taichung'),
(4,'Anthony','09211123','xxx@mail','taiwan.taichung'),
(5,'Ian','092675543','xxx@mail','taiwan.taichung');

INSERT INTO suppliers (id,name,tel,address) 
VALUES(1, 'Microsoft', '(425)703-6214', 'USA,Microsoft'),
(2, 'Intel', '28933109', 'USA,intel'),
(3, 'Apple', '28377079', 'USA,apple'),
(4, 'Facebook', '3347047079', 'USA,fb.inc'),
(5, 'Google', '2454547079', 'USA,google.inc'),
(6, 'Sony', '243470779', 'jp,sony.inc'),
(7, 'Pchome', '(243)723-4214', 'tw,Pchome.inc');

insert into products (product_id,name,price,supplier_id) 
values('p001','i_mac_pro',25900,3),
('p002','pixel3',19900,5),
('p003','Cpu_4core_3Ghz',8900,2),
('p004','Window_xD',7800,1),
('p005','Playstasion4',11990,6),
('p006','Playstasion5',21990,7),
('p007','Playstasion6',31990,7),
('p008','Playstasion7',41990,7),
('p009','google_watch',6600,5),
('p010','google_glass',2300,5);

insert into orders (order_id,customer_id) 
values('o001',1),
('o002',4),
('o003',5),
('o004',3),
('o005',2),
('o006',2),
('o007',1);

insert into order_details (order_id,product_id,price,count) 
values('o001','p001',25900,100),
('o002','p010',2300,20),
('o002','p002',19900,45),
('o003','p009',6600,2),
('o005','p010',2300,7),
('o006','p004',7800,89),
('o006','p005',11990,11),
('o007','p006',21990,1),
('o007','p007',31990,1),
('o007','p008',41990,1);
/*-----------------------------All Procedures Comment-----------------------
---CUSTOMERS---

call add_c(name,tel,email,address);
call up_cname(id,name);
call up_ctel(id,tel);
call up_cmail(id,email);
call up_caddr(id,address);
call del_c(id);

---SUPPLIERS---

call add_s(name,tel,address);
call up_sname(id,name);
call up_stel(id,tel);
call up_saddr(id,addr);
call del_s(id);

---PRODUCTS---

call add_p(product_id,name,price,supplier_id);
call up_pname(id,name);
call up_pprice(id,price);
call up_p_sid(id,supplier_id);
call del_p(id);

---ORDERS---

call add_o(order_id,customer_id);
call del_o(id);                  --->trigger delete od

---ORDER-DETAILS---

call add_od(order_id,product_id,price,count);
call up_odprice(id,price);
call up_odcount(id,count);
call del_od(id);

---Search---

call s_cname(name);
call s_ctel(tel);
call s_sname(name);
call s_stel(tel);
call s_pname(name);

---Search2---

call sa(name);
call sb(id);        (customers)
call sc(product_id);
call sd(id);        (suppliers)

*/
 ----------------------------------------CUSTOMERS------------------------------------- 
 \d #
--add customers data
create procedure add_c(in add_name varchar(20),in add_tel varchar(15),add_email varchar(30),add_addr varchar(40))
begin
    insert into customers (name,tel,email,address) values(add_name,add_tel,add_email,add_addr);
end#
--update customers name
create procedure up_cname(in n int,in new_name varchar(20))
begin
     update customers set name=new_name where id =n;    
end#
--update customers tel
create procedure up_ctel(in n int,in new_tel varchar(15))
begin
     update customers set tel=new_tel where id =n;    
end#
--update customers email
create procedure up_cmail(in n int,in new_amil varchar(30))
begin
     update customers set email=new_amil where id =n;    
end#
--update customers address
create procedure up_caddr(in n int,in new_addr varchar(40))
begin
     update customers set address=new_addr where id =n;    
end#
--delete customers data
create procedure del_c(in n int)
begin
    delete from customers where id=n;
end#
\d ;

 ----------------------------------------SUPPLIERS------------------------------------- 
 \d #
--add suppliers data
create procedure add_s(in add_name varchar(20),in add_tel varchar(15),add_addr varchar(40))
begin
    insert into suppliers (name,tel,address) values(add_name,add_tel,add_addr);
end#
--update suppliers name
create procedure up_sname(in n int,in new_name varchar(20))
begin
     update suppliers set name=new_name where id =n;    
end#
--update suppliers tel
create procedure up_stel(in n int,in new_tel varchar(15))
begin
     update suppliers set tel=new_tel where id =n;    
end#
--update suppliers address
create procedure up_saddr(in n int,in new_addr varchar(40))
begin
     update suppliers set address=new_addr where id =n;    
end#
--delete suppliers data
create procedure del_s(in n int)
begin
    delete from suppliers where id=n;
end#
\d ;

----------------------------------------PRODUCTS------------------------------------- 
 \d #
--add products data
create procedure add_p(in n1 varchar(5),in n2 varchar(20),n3 int,n4 int)
begin
    insert into products (product_id,name,price,supplier_id) values(n1,n2,n3,n4);
end#
--update products name
create procedure up_pname(in n int,in new_name varchar(20))
begin
     update products set name=new_name where id =n;    
end#
--update products price
create procedure up_pprice(in n int,in new int)
begin
     update products set price=new where id =n;    
end#
--update products supplier_id
create procedure up_p_sid(in n int,in new int)
begin
     update products set supplier_id=new where id =n;
end#
--delete products data
create procedure del_p(in n int)
begin
    delete from products where id=n;
end#
\d ;


----------------------------------------ORDERS------------------------------------- 
 \d #
--add orders data
create procedure add_o(in n1 varchar(5) , in n2 int)
begin
    insert into orders (order_id,customer_id) values(n1,n2);
end#
--delete orders data
create procedure del_o(in n int)
begin
     select order_id into @a from orders where id=n;
     delete from orders where id=n;
end#
--trigger delete order_details before delete orders data
create trigger del_o_od before delete on orders for each row
begin
     delete from order_details where order_id=@a;
end#
\d ;
 
----------------------------------------ORDER-DETAILS------------------------------------- 
 \d #
--add order_details data
create procedure add_od(in n1 varchar(5),in n2  varchar(5),in n3  int ,in n4 int)
begin
    insert into order_details (order_id,product_id,price,count) values(n1,n2,n3,n4);
end#
--update order_details price
create procedure up_odprice(in n int,in new int)
begin
     update order_details set price=new where id =n;    
end#
--update order_details count
create procedure up_odcount(in n int,in new int)
begin
     update order_details set count=new where id =n;    
end#
--delete order_details data
create procedure del_od(in n int)
begin
    delete from order_details where id=n;
end#
\d ;
---------------------------------------Search-------------------------------------------------
--search customers data by name
 \d #
create procedure s_cname(in kw varchar(50))
begin
set @keyword =concat("%",kw,"%");
set @dir= 'select * from customers where name like ?';
      prepare stament from @dir;
      execute stament using @keyword;
end #
\d ;

--search customers data by telephone
 \d #
create procedure s_ctel(in kw varchar(50))
begin
set @keyword =concat("%",kw,"%");
set @dir= 'select * from customers where tel like ?';
      prepare stament from @dir;
      execute stament using @keyword;
end #
\d ;

--search suppliers data by name
 \d #
create procedure s_sname(in kw varchar(50))
begin
set @keyword =concat("%",kw,"%");
set @dir= 'select * from suppliers where name like ?';
      prepare stament from @dir;
      execute stament using @keyword;
end #
\d ;
--search suppliers data by telephone
 \d #
create procedure s_stel(in kw varchar(50))
begin
set @keyword =concat("%",kw,"%");
set @dir= 'select * from suppliers where tel like ?';
      prepare stament from @dir;
      execute stament using @keyword;
end #
\d ;

--search products data by name
 \d #
create procedure s_pname(in kw varchar(50))
begin
set @keyword =concat("%",kw,"%");
set @dir= 'select * from products where name like ?';
      prepare stament from @dir;
      execute stament using @keyword;
end #
\d ;

--------------------------------Search2-------------------------------
--a.
 \d #
create procedure sa(in kw varchar(50))
begin
set @keyword =concat("%",kw,"%");
set @dir= 'select o.customer_id,od.order_id,od.product_id,od.price,od.count 
from order_details od join orders o on (o.order_id=od.order_id)
where o.customer_id in (select id from customers where name like ?)';
      prepare stament from @dir;
      execute stament using @keyword;
end #
\d ;

--b.
 \d #
create procedure sb(in id int)
begin
set @keyword =id;
set @dir= 'select o.order_id,sum(od.price*od.count) `total cost per order`  
from orders o join order_details od on
(o.order_id=od.order_id) where o.customer_id =?
group by od.order_id';
      prepare stament from @dir;
      execute stament using @keyword;
end #
\d ;

--c.
 \d #
create procedure sc(in kw varchar(50))
begin
set @keyword=kw;
set @dir= 'select od.product_id,c.name,od.count from orders o 
join order_details od on(o.order_id=od.order_id)
join customers c on(c.id=o.customer_id)
where product_id=?';
      prepare stament from @dir;
      execute stament using @keyword;
end #
\d ;

--d.
 \d #
create procedure sd(in kw int)
begin
set @keyword=kw;
set @dir= 'select p.supplier_id,o.order_id,p.name from order_details od
join products p on (p.product_id=od.product_id)
join orders o on (o.order_id=od.order_id)
where p.supplier_id=?';
      prepare stament from @dir;
      execute stament using @keyword;
end #
\d ;
