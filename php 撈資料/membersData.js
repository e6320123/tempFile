var resData; 
var page = 1;
var pageData = 5;
var star = (page-1) * pageData;
var end = page * pageData;
var endPage;
var keys;

function init(){
	ajax();  
	newPage();
	addEventListener("click",function(e){
		if(e.target.tagName == "BUTTON"){
			if(e.target.innerHTML == "上一頁"){
				if(page == 1) return;
				page--;
				count();
				// console.log(star);
				// console.log(end); 
				showData(star,end,keys,resData); 
				newPage();
			}
			if(e.target.innerHTML == "下一頁"){
				if(page == endPage) return;
				page++; 
				count();
				// console.log(star);
				// console.log(end); 
				showData(star,end,keys,resData); 
				newPage();
			}
		} 
	}) 
}
function newPage(){
	document.getElementById("pages").innerHTML = "第" +page+"頁";
}
function count(){ 
	endPage = Math.ceil(keys.length / pageData);
	if(page >= endPage) page = endPage;
	star = (page-1) * pageData;
	end = page * pageData;

	end = (page == endPage)? keys.length :end;
	console.log("star "+star);
	console.log("end "+end);
}
function ajax(){
	var url = "http://rdtest999.cvssp2017.com/felix/testdb.php";
	var parame = "";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		console.log("state "+xmlhttp.readyState);
		console.log(xmlhttp.status);
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
			document.getElementById("state").innerHTML = "";
			resData = JSON.parse(xmlhttp.responseText); 
			keys = Object.keys(resData);  
			endPage = Math.ceil(keys.length / pageData);
			showData(star,end,keys,resData); 
		} else {
			document.getElementById("state").innerHTML = "error";
		}
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(parame);
}
		
function showData(star,end,keyAry,dataAry){ 
	var table_head = document.getElementById("table_head").innerHTML;
	var table_content = document.getElementById("table_content").innerHTML;
	var table_boot = document.getElementById("table_boot").innerHTML;

	var alltable = "";
	alltable += table_head;

	
	for (var i = star; i < end; i++) {
		var onetr = table_content.replace("*ID*", keyAry[i]);
		onetr = onetr.replace("*username*", dataAry[keyAry[i]]['username']);
		onetr = onetr.replace("*password*", dataAry[keyAry[i]]['passwd_safe']);
		alltable += onetr
	} 

	alltable += table_boot;

	document.getElementById("div_show").innerHTML = alltable; 
}


function change(){
	var idx = document.getElementById("sel").selectedIndex;
	var pages = document.getElementById("sel").options[idx];
	if(idx == 0){
		console.log(pages.innerHTML);
		pageData = pages.innerHTML;
		count();
		showData(star,end,keys,resData); 
		newPage();
	}
	if(idx == 1){
		console.log(pages.innerHTML);
		pageData = pages.innerHTML;
		count();
		showData(star,end,keys,resData); 
		newPage();
	}
	if(idx == 2){
		console.log(pages.innerHTML);
		pageData = pages.innerHTML;
		count();
		showData(star,end,keys,resData); 
		newPage();
	}
}