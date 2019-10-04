<template>

<div class="container"> 
  <div class="row">
    <div class="col-md-12">
        <div class="tab finishDetail">
        <h6>訂購明細</h6> 
            <div> 
                <table>
                    <tr>
                        <td>&emsp;名&emsp;&emsp;稱&emsp;&emsp;&emsp;{{list.movieName}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;上映地點&emsp;&emsp;&emsp;中佑戲院{{list.theater}}影城</td>
                    </tr>
                    <tr>
                        <td>&emsp;放映場次&emsp;&emsp;&emsp;{{list.day}} {{list.time}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;座&emsp;&emsp;位&emsp;&emsp;&emsp;{{list.seat}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;票&emsp;&emsp;種&emsp;&emsp;&emsp;{{list.ticket}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;餐&emsp;&emsp;點&emsp;&emsp;&emsp;{{list.food}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;姓&emsp;&emsp;名&emsp;&emsp;&emsp;{{list.memberName}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;信&emsp;&emsp;箱&emsp;&emsp;&emsp;{{list.email}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;電&emsp;&emsp;話&emsp;&emsp;&emsp;{{list.phone}}</td>
                    </tr>
                    <tr>
                        <td>&emsp;總金額&emsp;&emsp;&emsp;&emsp;{{list.total}}</td>
                    </tr>
                </table>
             </div>
        </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12"> 
        <router-link to="/" class="finishBtn btn btn-outline-success"> 
            回到首頁
        </router-link> 
     </div>
  </div>
</div> 
</template>

<script>
import detail from '@/views/frontEnd/Detail.vue'
export default {
    data(){
        return {
            list: 0
        }
    },
    mounted() { 
        this.log();
        this.getData();
    },
    methods:{
        log:function(){
            var FinishPageData = JSON.parse(sessionStorage.getItem('FinishPageData')); 
            // console.log(FinishPageData);
        },
        getData:function(){
            var FinishPageData = JSON.parse(sessionStorage.getItem('FinishPageData'));
            this.list = FinishPageData;
            // console.log(this.list);
        }
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
                } 
            }
        }
    }
</style>
