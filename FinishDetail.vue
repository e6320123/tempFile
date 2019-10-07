<template>

<div v-if="!hideFinishDetail" class="container"> 
  <h1 class="text-center my-5">完成訂購</h1>
  <div class="row">
    <div class="col-md-12">
        <div class="tab finishDetail">
        <h6>訂購明細</h6> 
            <div> 
               <table>
                    <tr>
                        <td>&emsp;訂單標號&ensp;:</td>
                        <td>{{orderNumber}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;名&emsp;&emsp;稱&ensp;:</td>
                        <td>{{list.movieName}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;上映地點&ensp;:</td>
                        <td>中佑戲院{{list.theater}}影城</td>
                    </tr>
                    <tr>
                        <td>&emsp;放映場次&ensp;:</td>
                        <td>{{list.day}}&ensp;{{list.time}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;座&emsp;&emsp;位&ensp;:</td>
                        <td>{{list.seat}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;票&emsp;&emsp;種&ensp;:</td>
                        <td>
                            {{list.ticketName["0"] + list.ticketNum["0"]}}
                            {{list.ticketName["1"] + list.ticketNum["1"]}}
                        </td> 
                    </tr>
                    <tr>
                        <td>&emsp;餐&emsp;&emsp;點&ensp;:</td>
                        <td>
                            {{list.food["0"]+list.foodNum["0"]}}
                            {{list.food["1"]+list.foodNum["1"]}}
                            <br v-if="list.br">
                            {{list.food["2"]+list.foodNum["2"]}}
                            {{list.food["3"]+list.foodNum["3"]}} 
                        </td>
                    </tr>  
                    <tr>
                        <td>&emsp;折&emsp;&emsp;扣&ensp;:</td>
                        <td>{{list.discount}}</td>
                    </tr> 
                    <tr>
                        <td>&emsp;總金額&emsp;&ensp;:</td>
                        <td>{{list.total}} x {{list.discount}} = {{list.real}}</td>
                    </tr> 
                </table>
             </div>
        </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12"> 
         
 
     
        <button @click="clrSession" class="finishBtn btn btn-outline-success">
    回到首頁

    </button>
       
     </div>
  </div>
</div> 
</template>

<script>
import detail from '@/views/frontEnd/Detail.vue'
export default {
    data(){
        return {
            list: 0,
            ticketsNum:0,
            mealsNum:0,
            orderNumber:"",
            hideFinishDetail:0
        }
    },
    mounted() {  
        this.log();
        this.getData();
        this.getOrderNumber(); 
    },
    methods:{
        clrSession:function(){  
            sessionStorage.removeItem('FinishPageData'); 
            sessionStorage.removeItem('ticketsNameNum');
            sessionStorage.removeItem('ticketsNum');
            sessionStorage.removeItem('totalTicketsNum');
            sessionStorage.removeItem('mealsNameNum');
            sessionStorage.removeItem('mealsNum'); 
            sessionStorage.removeItem('movie_index');
            sessionStorage.removeItem('moviesName');
            sessionStorage.removeItem('day_index');
            sessionStorage.removeItem('moviesDay');
            sessionStorage.removeItem('time_index'); 
            sessionStorage.removeItem('moviesTime'); 
            window.location.replace('./#');
            history.go(0); 
            this.hideFinishDetail = 1;
        },
        log:function(){
            var FinishPageData = JSON.parse(sessionStorage.getItem('FinishPageData')); 
        },
        getData:function(){
            var FinishPageData = JSON.parse(sessionStorage.getItem('FinishPageData'));
            this.list = FinishPageData; 
        },
        getOrderNumber:function(){ 
            if(!(sessionStorage.getItem('ticketsNum') || sessionStorage.getItem('mealsNum'))) 
                return this.orderNumber = "no session";
            var d = new Date();
            var month = d.getMonth()< 9?"0"+String(d.getMonth()+1):String(d.getMonth()+1);
            var dNum = d.getDate()< 10?"0"+String(d.getDate()):String(d.getDate());
            var hour = d.getHours()< 10?"0"+String(d.getHours()):String(d.getHours());
            var minute = d.getMinutes()< 10?"0"+String(d.getMinutes()):String(d.getMinutes());

            this.ticketsNum = JSON.parse(sessionStorage.getItem('ticketsNum'));
            this.mealsNum = JSON.parse(sessionStorage.getItem('mealsNum'));
            this.orderNumber =
                String(this.ticketsNum["0"])+String(this.ticketsNum["1"])+String(this.mealsNum["0"])+
                String(this.mealsNum["1"])+String(this.mealsNum["2"])+String(this.mealsNum["3"])+
                String(d.getFullYear()-2000)+ month + dNum + hour + minute; 
        },
    }
}
</script>

<style lang="scss" scoped>
    .container{ 
        // margin:0;
        // width:100;
        // border:2px solid blue;
    }
    .col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,
    .col-md-8{
        // border:2px solid red;
        padding:0;  
    }
    .finishBtn{
            margin:2% 0 0 0;
            height:50px; 
            width:100%;
        }
    .tab{
        
            background-color:rgb(233,236,239);
        border-radius:5px; 
        border: 1px solid gray; 
        h6{ 
            text-align:left;
            padding:10px 0px 10px 20px;
            background-color:gray;
            color:white;
        }
        div{ 
            margin:20px 20px; 
            font-size:16px; 
            table{  
                text-align:left;
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
    .finishDetail{
        margin:3% 0 0 0;
        border: 1px solid orange; 
        h6{
        background-color:orange;
        }
        div{  
            table{ 
                tr{ 
                    border-bottom: 2px solid rgb(190,190,190); 
                    td:first-child{
                        width:25%;
                        padding:5px 0px ; 
                    }
                    td:last-child{
                        width:75%;
                        padding:5px 0px ; 
                    }
                } 
            }
        }
    }
</style>
