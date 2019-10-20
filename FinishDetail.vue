<template>

<div v-if="!hideFinishDetail" class="container"> 
  <h1 class="text-center my-5">完成訂購</h1>
  <div class="row">
    <div class="col-md-7">
        <div class="tab finishDetail">
        <h6>訂購明細</h6> 
            <div> 
               <table>
                    <tr>
                        <td>&emsp;訂票序號&ensp;:</td>
                        <td>{{list.orderNumber}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;名&emsp;&emsp;稱&ensp;:</td>
                        <td>{{list.movieName}}</td>
                    </tr>
                    <tr> 
                        <td>&emsp;上映地點&ensp;:</td>
                        <td>中佑戲院台中影城</td>
                    </tr>
                    <tr>
                        <td>&emsp;放映場次&ensp;:</td>
                        <td>{{list.day}}&ensp;{{list.time}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;大&emsp;&emsp;廳&ensp;:</td>
                        <td>第{{list.hall}}廳</td>
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
                            {{list.ticketName["2"] + list.ticketNum["2"]}}
                            {{list.ticketName["3"] + list.ticketNum["3"]}}
                        </td> 
                    </tr>
                    <tr>
                        <td>&emsp;餐&emsp;&emsp;點&ensp;:</td>
                        <td>
                            {{list.food["0"]+list.foodNum["0"]}}
                            {{list.food["1"]+list.foodNum["1"]}}
                            {{list.food["2"]+list.foodNum["2"]}}
                            <br v-if="list.br">
                            {{list.food["3"]+list.foodNum["3"]}} 
                            {{list.food["4"]+list.foodNum["4"]}} 
                        </td>
                    </tr>  
                    <tr>
                        <td>&emsp;總&emsp;&emsp;價&ensp;:</td>
                        <td>{{list.total}}</td>
                    </tr> 
                    <tr>
                        <td>&emsp;折&emsp;&emsp;扣&ensp;:</td>
                        <td>{{list.discount}}</td>
                    </tr> 
                    <tr>
                        <td>&emsp;使用點數&ensp;:</td>
                        <td>{{list.pointValue}}</td>
                    </tr> 
                    <tr>
                        <td>&emsp;合&emsp;&emsp;計&ensp;:</td>
                        <td>{{list.real}}</td>
                    </tr> 
                </table>
             </div>
        </div>
    </div>
    <div class="col-md-5">
        <div class="tab finishDetail2">
        <h6>取票付款說明</h6> 
            <div> 
                <p>1.本網路訂票僅提供訂票序號，並無線上刷卡。
                請記錄您的訂票序號至現場付款取票。</p>
                <p>2.購買優待票種請於取票時出示您的證件/會員卡確認。
                愛心票：購買愛心票需於取票時出示您的身心障礙相關手冊(證件)做確認。取票與入場時皆需配合出示證件。
                無法提供證件或證件資料與本人不符/無法辨識的情況，恕無法提供相關優惠。</p>
                <p>3.建議您記錄最後確認頁之訂票序號，取票時，請告知服務人員正確訂票序號、
                手機號碼，以免無法取票。</p>
             </div>
        </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">  
        <router-link @click.native="clrSession" class="finishBtn btn btn-outline-success" to="/">
            回到首頁
        </router-link> 
     </div>
  </div>
</div> 
</template>

<script> 
export default {
    data(){
        return {
            list:{
                movieName: '',
                theater: '',
                day: '',
                time: '', 
                food:{"0":"","1":"","2":"","3":"","4":""},
                foodNum:{"0":"","1":"","2":"","3":"","4":""},
                ticketName:{"0":"","1":"","2":"","3":""},
                ticketNum:{"0":"","1":"","2":"","3":""},
                price:{"0":190,     "1":170,    "2":50,   "3":70,      "4":30,     "5":50,     "6":150,  "7":130,
                // Price {"0":全票,"1":優待票,"2":可樂 大,"3":爆米花 大,"4":可樂 中,"5":爆米花 中,"6":學生票,"7":敬老票}
                    //"8":爆米花 小
                       "8":30
                },
                ticketData:{"全票":0,"優待票":0,"學生票":0,"敬老票":0},
                foodData:{"爆米花 小":0,"爆米花 中":0,"爆米花 大":0,"可樂 中":0,"可樂 大":0},
                discount: 0.7,
                total:0,
                real:0, 
                seat: '',
                hall: '',
                accout: '',
                memberName:'', 
                email:' ',
                phone:' ', 
                loginBar:1, 
                editBar:0,
                cadrd1:" ",
                cadrd2:" ",
                cadrd3:" ",
                cadrd4:" ",
                br:1,
                orderNumber:"",
                pointValue:0
            },    
            hideFinishDetail:0
        }
    },
    mounted() { 
        if(!(sessionStorage.getItem('FinishPageData'))) 
            window.location.href="./#/order"; 
        this.getData(); 
    },
    methods:{  
        clrSession:function(){  
            sessionStorage.removeItem('FinishPageData');  
            this.hideFinishDetail = 1;
        }, 
        getData:function(){
            var FinishPageData = JSON.parse(sessionStorage.getItem('FinishPageData'));
            this.list = FinishPageData;        
        } 
    }
}
</script>

<style lang="scss" scoped>
    // .container{ 
        // margin:0;
        // width:100;
        // border:2px solid blue;
    // }
    .col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-11,
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
    
    
    
//RWD  寬度769px以上
@media only screen and (min-width: 769px) {
    .finishDetail,.finishDetail2{
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
                        width:21%;
                        padding:5px 0px ; 
                    }
                    td:last-child{
                        width:79%;
                        padding:5px 0px ; 
                    }
                } 
            }
        }
    }
 .finishDetail2{
        margin:4% 0 0 0;
    }
}
//RWD  寬度768px~321px
@media only screen and (min-width: 321px) and (max-width: 768px) {
    .finishDetail,.finishDetail2{
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
                        // width:25%;
                        // padding:5px 0px ; 
                    }
                    td:last-child{
                        // width:75%;
                        // padding:5px 0px ; 
                    }
                } 
            }
        }
    }
 .finishDetail2{
        margin:4% 0 0 0;
    }
}
//RWD  寬度320px~0px
@media only screen and (min-width: 0px) and (max-width: 320px){
    .finishDetail,.finishDetail2{
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
                        // width:25%;
                        // padding:5px 0px ; 
                    }
                    td:last-child{
                        // width:75%;
                        // padding:5px 0px ; 
                    }
                } 
            }
        }
    }
 .finishDetail2{
        margin:4% 0 0 0;
    }
}
</style>
