<template>
<div id='app'>
    <div class="orderContent">
    <h2>購票資訊</h2>
         <p>電影:{{movieName}}</p> 
         <p>影城:中佑戲院{{theater}}影城 </p>
         <p>場次:{{day}} {{time}}</p>
         <p>{{hall}}</p>
         <p>座位:{{seat}}</p>
         <!-- border="1" -->
         <table id="tb"  >
        <thead >
            <th>票種</th>
            <th>價格</th>
            <th>數量</th>
            <th width="100px">合計</th>
        </thead>
        <tr>
            <td>{{ticket}}</td>
            <td>{{price}}</td>
            <td>{{num}}</td>
            <td>{{total}}</td>
        </tr>
        <tr>
            <td>&emsp;</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>折扣</td>
            <td>{{discount}}</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>實際金額</td>
            <td>{{real}}</td>
        </tr>
        <tr>
            <td>&emsp;</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><a href="http://localhost:8081/#/order" class="btn btn-sm btn-warning">回上一頁</a></td>
        </tr>
    </table> 

    </div>
        <form action="saveSQL.php" method='post' class="form-horizontal">
            
            <h2>個人資訊</h2>
            <a v-if="seen" href="javascript:void()" v-on:click="memberData()">同會員資料</a>
            &emsp;<a  href="javascript:void()" v-on:click="clrMemberData()">清除會員資料</a>
            
            <!-- Text input -->
            <div class="form-group">
              <label class="col-md-4 control-label" for="memberName">姓名</label>  
              <div class="col-md-4">
                <input id="memberName" name="memberName" :value="memberName" type="text" class="form-control input-md">
              </div> 
            </div> 
            <!-- Text input-->
            <div class="form-group">
              <label class="col-md-4 control-label" for="telephone">電話</label>  
              <div class="col-md-4">
                <input id="telephone" name="telephone" v-bind:value="phone" type="text" class="form-control input-md">
              </div>
            </div>
             <!-- Text input-->
            <div class="form-group">
              <label class="col-md-4 control-label" for="email">電子信箱</label>  
              <div class="col-md-4">
                <input id="email" name="email" :value="email" type="text" class="form-control input-md">
              </div>    
            </div>
            <!-- Text input-->
            <div class="form-group">
              <label class="col-md-4 control-label" for="creditCard">信用卡卡號</label>  
              <div class="col-md-4">
                <input id="creditCard" name="creditCard" value="" type="text" class="form-control input-md">
              </div>
            </div>
            <!-- </fieldset> -->
            <div id="btn" class="col-md-4">
                <button type='submit' name='btn' value='確認送出' class="btn btn-sm btn-primary">
                   <i class="fa fa-check" aria-hidden="true"></i>
                  確認訂購</button>&ensp;
                <button type='submit' name='btn' value='取消訂購' class="btn btn-sm btn-danger">
                  <i class="fa fa-times" aria-hidden="true"></i>
                  取消訂購</button>
            </div>
            <!-- ----------------------------hidden----------------------------------- -->
            <input type="hidden" name='movieName' v-bind:value='movieName'>
            <input type="hidden" name='theater' v-bind:value='theater'>
            <input type="hidden" name='day' v-bind:value='day'>
            <input type="hidden" name='time' v-bind:value='time'>
            <input type="hidden" name='ticket' v-bind:value='ticket'>
            <input type="hidden" name='seat' v-bind:value='seat'>
            <input type="hidden" name='hall' v-bind:value='hall'>
        </form>
    </div>
</template> 
<script>
var orderData = {
            movieName: '返校',
            theater: '台中',
            day: '2019-9-30',
            time: '14:00',
            ticket: '全票',
            price: 280,
            num: 2,
            discount: 0.8,
            seat: 'A2,A3',
            hall: '第10廳',
            memberName:'ben',
            email:'123@gmail.com',
            phone:'09123456789' 
        };
localStorage.setItem('dataList', JSON.stringify(orderData));
export default {
    data(){
        return {
              movieName: '',
              theater: '',
              day: '',
              time: '',
              ticket: '' ,
              price: 0 ,
              num:  0,
              discount: 0,
              seat: '',
              hall: '',
              memberName:'',
              email:'',
              phone:'',
              total:'',
              real:'',
              seen:true 
        }
    },
    mounted() {
        this.getData();
        this.countMoney();
    },
    methods:{
       countMoney:function(){
        this.total=this.price*this.num;
        this.real =this.total*this.discount;
       },
       getData: function(){
            this.movieName=JSON.parse(localStorage.getItem('dataList')).movieName; 
            this.theater=JSON.parse(localStorage.getItem('dataList')).theater; 
            this.day=JSON.parse(localStorage.getItem('dataList')).day; 
            this.time=JSON.parse(localStorage.getItem('dataList')).time; 
            this.ticket=JSON.parse(localStorage.getItem('dataList')).ticket; 
            this.price=JSON.parse(localStorage.getItem('dataList')).price;
            this.num=JSON.parse(localStorage.getItem('dataList')).num;
            this.discount=JSON.parse(localStorage.getItem('dataList')).discount;
            this.seat=JSON.parse(localStorage.getItem('dataList')).seat; 
            this.hall=JSON.parse(localStorage.getItem('dataList')).hall; 
        },
        memberData: function(){
            this.memberName=JSON.parse(localStorage.getItem('dataList')).memberName; 
            this.email=JSON.parse(localStorage.getItem('dataList')).email; 
            this.phone=JSON.parse(localStorage.getItem('dataList')).phone; 

        },
        clrMemberData: function(){
            this.memberName=""; 
            this.email=""; 
            this.phone="";  
        }
    }
    
    
}
</script>

<style>
        h2 {
            background-color: blanchedalmond;
        }
        #btn{
            left:30px;
            font-size: 28px;
        }
        .orderContent{
          position: relative;  
          background-color: rgb(234,234,234);
        }
        #tb{
          width:65%;
          position: relative;  
          left :35%;    
        } 
</style>