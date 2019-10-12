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
                        <td>{{list.orderNumber}}</td>
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
                food:{"0":"","1":"","2":"","3":""},
                foodNum:{"0":"","1":"","2":"","3":""},
                ticketName:{"0":"","1":""},
                ticketNum:{"0":"","1":""},
                price:{"0":190,"1":150,"2":50,"3":50,"4":40,"5":40},
                //Price {"0":一般票,"1":愛心票
                //"2":可樂 大,"3":爆米花 大,"4":可樂 中,"5":爆米花 中}
                discount: 0.7,
                total:0,
                real:0, 
                seat: '',
                hall: '',
                accout: '',
                memberName:'', 
                email:' ',
                phone:' ',
                buyerBar:false,
                loginBar:true, 
                editBar:true,
                cadrd1:"1231",
                cadrd2:"1234",
                cadrd3:"1234",
                cadrd4:"1234",
                br:1,
                orderNumber:""
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
            this.list = FinishPageData;        } 
    }
}
</script>

<style lang="scss" scoped>
    // .container{ 
        // margin:0;
        // width:100;
        // border:2px solid blue;
    // }
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
