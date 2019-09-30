<template>
<div id="app">
<div class="tab">
<h6>確認內容</h6>
    <div> 
        <table>
            <tr>
                <td>&emsp;名&emsp;&emsp;稱&emsp;&emsp;&emsp;{{movieName}}</td>
            </tr>
            <tr>
                <td>&emsp;上映地點&emsp;&emsp;&emsp;中佑戲院{{theater}}影城</td>
            </tr>
            <tr>
                <td>&emsp;放映場次&emsp;&emsp;&emsp;{{day}} {{time}}</td>
            </tr>
            <tr>
                <td>&emsp;座&emsp;&emsp;位&emsp;&emsp;&emsp;{{seat}}</td>
            </tr>
            <tr>
                <td>&emsp;票&emsp;&emsp;種&emsp;&emsp;&emsp;{{ticket}}</td>
            </tr>
            <tr>
                <td>&emsp;餐&emsp;&emsp;點&emsp;&emsp;&emsp;{{food}}</td>
            </tr>
            <tr>
                <td>&emsp;總金額&emsp;&emsp;&emsp;&emsp;{{total}}</td>
            </tr>
        </table>
    </div>
</div>
<div class="tab2">
    <h6>購買者資訊</h6>   
    <!--input-->
    <div v-if="guest" class="editInputGrounp input-group input-group-sm mb-1">  
        <span>
        真實姓名 &emsp;
        </span>
     <input v-model="memberName" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
       <div class="input-group-append">
       <span class="input-group-text" id="basic-addon2">
       <i class="fa fa-user-circle-o" aria-hidden="true"></i>
       </span>
     </div>
    </div>
     <!--input end--> 
      <!--input-->
    <div v-if="guest" class="editInputGrounp input-group input-group-sm mb-1"> 
        <span>
        帳號 &emsp;&emsp;&emsp;
        </span>
     <input v-model="account" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
       <div class="input-group-append">
       <span class="input-group-text" id="basic-addon2">
        <i class="fa fa-address-book-o" aria-hidden="true"></i>
       </span>
     </div>
    </div>
     <!--input end--> 
    <!--input-->
    <div v-if="guest" class="editInputGrounp input-group input-group-sm mb-1"> 
        <span>
        密碼 &emsp;&emsp;&emsp;
        </span>
     <input v-model="password" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
       <div class="input-group-append">
       <span class="input-group-text" id="basic-addon2">
       <i class="fa fa-lock" aria-hidden="true"></i>
       </span>
     </div>
    </div>
     <!--input end--> 
    <!--input-->
    <div v-if="guest" class="editInputGrounp input-group input-group-sm mb-1"> 
        <span>
        電子信箱 &emsp;
        </span>
     <input v-model="email" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
       <div class="input-group-append">
       <span class="input-group-text" id="basic-addon2">
       <i class="fa fa-envelope-o" aria-hidden="true"></i>
       </span>
     </div>
    </div>
     <!--input end--> 
    <!--input-->
    <div v-if="guest" class="editInputGrounp input-group input-group-sm mb-3"> 
        <span>
        手機號碼 &emsp;
        </span>
     <input v-model="phone" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
       <div class="input-group-append">
       <span class="input-group-text" id="basic-addon2">
       <i class="fa fa-phone-square" aria-hidden="true"></i>
       </span>
     </div>
    </div>
     <!--input end--> 

     <!--member only-->  
        <!--input-->
            <div  v-if="!guest" class="editInputGrounp input-group input-group-sm mb-1">  
                <span>
                &emsp;真實姓名&ensp;: &emsp;
                </span>
            <!-- <input v-model="memberName" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
               <div class="input-group-append">
               <span class="input-group-text" id="basic-addon2">
               <i class="fa fa-user-circle-o" aria-hidden="true"></i>
               </span> 
             </div>--> 
             
             <span>
                XXX &emsp;
                </span>
            </div>
     <!--input end-->  
     <!--member only--> 
     <!--member only-->  
        <!--input-->
            <div  v-if="!guest" class="editInputGrounp input-group input-group-sm mb-1">  
                <span>
                &emsp;電子信箱&ensp;: &emsp;
                </span>
            <!-- <input v-model="memberName" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
               <div class="input-group-append">
               <span class="input-group-text" id="basic-addon2">
               <i class="fa fa-user-circle-o" aria-hidden="true"></i>
               </span> 
             </div>--> 
             
             <span>
                yaa@gmail &emsp;
                </span>
            </div>
     <!--input end-->  
     <!--member only--> 
     <!--member only-->  
        <!--input-->
            <div  v-if="!guest" class="editInputGrounp input-group input-group-sm mb-3">  
                <span>
                &emsp;手機號碼&ensp;: &emsp;
                </span>
            <!-- <input v-model="memberName" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
               <div class="input-group-append">
               <span class="input-group-text" id="basic-addon2">
               <i class="fa fa-user-circle-o" aria-hidden="true"></i>
               </span> 
             </div>--> 
             
             <span>
                091034568 &emsp;
                </span>
            </div>
     <!--input end-->  
     <!--member only--> 
      

   
</div><!--div"tab2"-->
<div class="tab3" v-bind:class="{memberTab3:isAct}">
    <h6>信用卡資料</h6> 
    <!--input-->
    <div class="editInputGrounp input-group input-group-sm mb-3"> 
    <span>
            信用卡卡號 &emsp;
            </span>
     <input value="1234" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
     <span>-</span>
     <input value="1234" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
     <span>-</span>
     <input value="5555" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
     <span>-</span>
     <input value="1233" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
    </div>
    <!--input end-->  
</div><!--div"tab3"--> 

<form method="post" action="http://localhost/php/saveSQL.php"> 

<div class="btnGroup"> 
    <button @click="ok()" type='submit' name='btn' value='確認送出' class="btn btn-sm btn-primary">
        <i class="fa fa-check" aria-hidden="true"></i>
        確認訂購</button>&ensp;
    <button @click="cancel()" type='submit' name='btn' value='取消訂購' class="btn btn-sm btn-danger">
        <i class="fa fa-times" aria-hidden="true"></i>
        取消訂購</button>&ensp;
         
    
    <a href="javascript:void()" class="btn btn-sm btn-warning">
        <i class="fa fa-reply" aria-hidden="true"></i>
        回上一頁
        </a>
</div><!--div"btnGroup"--> 
    <!--hidden-->
    <input type="hidden" name='sqlList' v-bind:value='sqlList'> 
    <!--hidden-->
</form>
<a href="javascript:void()" @click="isGuest()">ch</a>
</div><!--div"app"-->
</template>

<script>
var orderData = {
            movieName: '返校',
            theater: '台中',
            day: '2019-9-30',
            time: '14:00',
            ticket: '全票',
            food:'薯條',
            price: 280,
            num: 2,
            discount: 0.8,
            seat: 'A2,A3',
            hall: '第10廳',
            memberName:'ben',
            email:'123@gmail.com',
            phone:'09123456789'
        };
var orderSqlData={
            screenings_id    :3,
            members_id       :33,
            num              :1333,
            seat             :'A1,A2',
            total_price      :600,
            discounted_price :480,
            tickets_num      :'9',
            food_drinks_num  :'4'
};
sessionStorage.setItem('dataList', JSON.stringify(orderData));
sessionStorage.setItem('sqlList', JSON.stringify(orderSqlData));
sessionStorage.setItem('dataListObj','orderData');
var obj = sessionStorage.getItem('dataListObj') ;
console.log(obj);
export default {
    data(){
        return {
            movieName: '',
            theater: '',
            day: '',
            time: '',
            ticket: '' ,
            food:'',
            price: 0 ,
            num:  0,
            discount: 0,
            seat: '',
            hall: '',
            memberName:'',
            account:'',
            password:'',
            email:'',
            phone:'321',
            total:'',
            real:'',
            guest:false,
            isAct:true,
            sqlList:''
        }
    },
    mounted() {
        this.getData();
        this.countMoney();
    },
    methods:{
        isGuest:function(){
            this.guest = !(this.guest);
            this.isAct = !(this.isAct);
        },
        checkPersonalInfo:function(){
            if( this.memberName.trim()==""|
                this.account.trim()==""|
                this.password.trim()==""|
                this.email.trim()==""|
                this.phone.trim()=="")
            return 0;
            return 1;
        },
        ok:function(){ 
            // if(confirm("確認訂購嗎?"))
            // if(this.checkPersonalInfo())
            // return alert("資料填完了"); 
            // return alert("資料尚未填完"); 
            // return alert("你按下確定"); 
            // return alert("你按下取消"); 
        },
        cancel:function(){
            window.location.replace("http://localhost/php/cancel.html");
        },
        countMoney:function(){
            this.total=this.price*this.num;
            this.real =this.total*this.discount;
        },
        getData: function(){
            this.sqlList= sessionStorage.getItem('sqlList');
            this.movieName=JSON.parse(sessionStorage.getItem('dataList')).movieName;
            // dataListObj 
            // this.movieName= sessionStorage.getItem('dataListObj').movieName; 
            this.theater=JSON.parse(sessionStorage.getItem('dataList')).theater; 
            this.day=JSON.parse(sessionStorage.getItem('dataList')).day; 
            this.time=JSON.parse(sessionStorage.getItem('dataList')).time; 
            this.ticket=JSON.parse(sessionStorage.getItem('dataList')).ticket; 
            this.food=JSON.parse(sessionStorage.getItem('dataList')).food; 
            this.price=JSON.parse(sessionStorage.getItem('dataList')).price;
            this.num=JSON.parse(sessionStorage.getItem('dataList')).num;
            this.discount=JSON.parse(sessionStorage.getItem('dataList')).discount;
            this.seat=JSON.parse(sessionStorage.getItem('dataList')).seat; 
            this.hall=JSON.parse(sessionStorage.getItem('dataList')).hall; 
        },
        memberData: function(){
            this.memberName=JSON.parse(sessionStorage.getItem('dataList')).memberName; 
            this.email=JSON.parse(sessionStorage.getItem('dataList')).email; 
            this.phone=JSON.parse(sessionStorage.getItem('dataList')).phone; 
        },
        clrMemberData: function(){
            this.memberName=""; 
            this.email=""; 
            this.phone="";  
        }
    }
    
    
}
    // ticket: '' ,
    // price: 0 ,
    // num:  0,
    // discount: 0, 
    // hall: '',
    // memberName:'',
    // email:'',
    // phone:'',
    // real:'',
</script>

<style lang="scss" scoped>
    .btnGroup{
        text-align:right;
        display: inline-block;
        width:100%; 
        padding:0;
        margin:1% 0%;   //上下間隔
        // border: 3px solid yellow;
        button:first-child{
            
        }
        button:last-child{

        }
        a{
            margin:0px 85px 0px 165px;   //左右間隔 
        }
    }
    .tab,.tab2,.tab3{
        border-radius:5px;
        vertical-align: top;
        display: inline-block;
        margin-top:20px;
        margin-left:20px;
        border: 1px solid gray;
        width:40%;
        height:40%;
        h6{
            padding-top:10px;
            padding-left:20px;
            padding-bottom:10px;
            background-color:gray;
            color:white;
        }
        div{
            // border: 2px solid red;
            margin:20px 20px; 
            font-size:16px; 
            table{ 
                // border: 2px dotted blue;
                width:100%;
                tr{ 
                    border-bottom: 2px solid gray;
                    td{
                        padding:5px 0px ; 
                    }
                }
                tr:last-child{ 
                    border-bottom: 0;
                }
            } 
        }
    }
    .tab2,.tab3{
        .member{

        }
        margin-right:85px; 
        float:right ;
        width:45%;
        height:30%;
        .input-group{
        margin-right:70px 40px; 
        }
        .editInputGrounp{ 
            padding-top:20px;
            padding-left:20px;
            padding-right:20px; 
            span{
                font-size:20px;
            } 
        }
        div{
            border: 0;
            margin:0px; 
            // font-size:16px; 
            .fa{//icon寬度
                width:18px;
            }
        }
    }
    .tab3{ 
        // border: 2px solid red;
        // display: inline-block;
        // display: none;
        float:left ;
        margin:20px 0px 0px 20px; 
        width:40%;
        height:30%;
        .editInputGrounp{
            span:not(:first-child){
                font-size:25px;
                width:10px; 
            }
        }
        
    } 
    .memberTab3{
        float:right;
        margin:-70px 144px 20px 0px; 
    } 
</style>