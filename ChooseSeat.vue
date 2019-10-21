

<template> 
  <div class="container">
    <h1 class="text-center my-5">訂票-選位</h1>
<div class="row">
    <div class="col-md-12"> 
    
    <div id="vm">
      <div>
        您選到的場次為：{{movieDay}} {{movieName}} {{movieTime}}&emsp;
        已售出的座位為：<img src="../../assets/sellout.png" alt="">&emsp;
        您可選的座位為： <img src="../../assets/seat.png" alt="">&emsp;
        <!-- 預設幫您排的座位為：  --> 
        <div class="forTable"> 
        <table class="table table-borderless">  
            <tr v-for="(item,index) in list" :key="index">  
                <td v-for="(obj,index) in item" :key="index">
                    {{obj.eng}}
                    <img @click="onClick=obj.Num;tap();"   :src="seatSrc[obj.Num]" v-bind:class="[courtClass1,courtClass2,courtClass3]"/>
                </td>
            </tr>   
        </table> 
        </div> 
      </div> 
       <div class="row justify-content-center">
      <router-link class="btn btn-danger btn-lg mr-3" to="/order">上一頁</router-link>
      <!-- <router-link @click.native="nextPage"  :to="to" class="btn btn-success btn-lg ml-5">點我去看訂單詳細</router-link> -->
      <button @click="nextPage" class="btn btn-success btn-lg ml-5">
        點我去看訂單詳細
      </button>
       </div>
    </div>
  </div><!--col-md-12-->
  
   </div><!--row-->
  
    </div><!--container-->
    
</template>

<script>
import imgSelect from "../../assets/select.png";
import imgSellout from "../../assets/sellout.png";
import imgSeat from "../../assets/seat.png";
import imgAisle from "../../assets/aisle.png"; 
export default { 
  data() {
    return {   
      list: [], 
      seatSrc:{}, //用物件才能點選變換圖片
      seatSelected:{},  
      max:0, 
      maxCount:0, 
      onClick:-1, 
      temp:1, 
      screenId:"",
      movieName:"",
      movieDay:"",
      movieTime:"",
      to:"",
      cnt:0,
      sellOutData:{},
      selectImg:imgSelect ,
      selloutImg:imgSellout,
      seatImg:imgSeat ,
      aisleImg:imgAisle ,
      initialCheck:0,
      time1:0,
      screeningID:0,
      courtsID:0 ,
      vueSeatDataStrArray:[],
      courts:[
          {'seats':0,'rows':0,'tdsPerRow':0},   //court 0
          {'seats':280,'rows':10,'tdsPerRow':34},   //court 1
          {'seats':200,'rows':10,'tdsPerRow':20},   //court 2
          {'seats':153,'rows':9,'tdsPerRow':21}   //court 3 
      ],
      cID:'',
      courtClass1:'',
      courtClass2:'',
      courtClass3:''
    };
  },
  mounted() {  
    this.cID = sessionStorage.courtsID;  //courtsID
    if(this.cID == '1')
        this.courtClass1 = 'seatImg1';
    if(this.cID == '2')
        this.courtClass2 = 'seatImg2';
    if(this.cID == '3')
        this.courtClass3 = 'seatImg3';
    for(let i=0;i<=this.courts[this.cID].rows-1;i++){
        this.$set(this.list,i,[]);
        for(let k=0;k<=this.courts[this.cID].tdsPerRow-1;k++){ 
            this.$set(this.list[i],k,{});
        }
    }
    for(let i=1;i<=this.courts[this.cID].seats;i++){ 
        this.$set(this.seatSrc,i,0);
    }
    for(let i=1;i<=this.courts[this.cID].seats;i++){ 
        this.$set(this.seatSelected,i,0);
    } 
    this.screeningID = sessionStorage.screeningID;  
    this.buildForListData();
    this.getSellOut();  
    if(sessionStorage.movie){
      this.movieName = JSON.parse(sessionStorage.movie)['moviesName'];
      this.movieDay = JSON.parse(sessionStorage.movie)['moviesDay'];
      this.movieTime = JSON.parse(sessionStorage.movie)['moviesTime']; 
    }
    this.max =
        JSON.parse(JSON.parse(sessionStorage.movie).totalTicketsNum); 
    },
  methods: {  
    getSellOut(){ 
      var ID = this.screeningID ; 
    //  console.log(ID);
      var postData = new FormData(); 
      postData.append('ID', ID);
      if(sessionStorage.chk==1)window.location.replace("/#/");
      this.axios.post(`${this.$api}/detail/getSellOut`, postData).then(response => { 
          // console.log(response.data[0]);
          var seatDataNumArray =[];
          for (let i = 0; i <response.data.length; i++) {
                  var allSeat = response.data[i].seat;  
                  // console.log(allSeat);
                  var array = allSeat.split(",");  
                  for (let k = 0; k <array.length; k++) {
                      var strEng = array[k].substring(0,1);
                      var strNum = array[k].substring(1,3);
                      // console.log(array[k]);   
                      var asciiNum =strEng.charCodeAt()-65;
                      //每排幾個座位
                      var s = this.courts[this.cID].seats / this.courts[this.cID].rows;
                      var seatDataNum = asciiNum*s+Number(strNum); 
                      // console.log(seatDataNum); 
                      seatDataNumArray.push(seatDataNum);
                  }
                  //設定最後一筆訂單的時間戳記
                  if(i == response.data.length-1)
                      this.time1 =Number(response.data[i].time1) ;  
          }
          // console.log(seatDataNumArray); 
          //載入售出位置 
          for(let i=1; i <=this.courts[this.cID].seats; i++){
             this.sellOutData[i] = 0;
          }   
          for(let i=0; i < seatDataNumArray.length; i++){
             this.sellOutData[seatDataNumArray[i]] = 1; 
          }    
          //設定所有走道
          this.seatSrc[0] = this.aisleImg;  
          //設定所有座位圖示
          for(let i=1; i <=this.courts[this.cID].seats; i++){
              if(this.sellOutData[i] == 1){ 
                //座位售出
                  this.seatSrc[i] = this.selloutImg;
                  this.seatSelected[i] ="X";
              }else{
                  //座位可選擇
                this.seatSrc[i] = this.seatImg; 
              }
          } 
      });  
    },
    nextPage(){   
      console.log(this.cnt)
          if(this.cnt>10){
              sessionStorage.setItem("chk",1);
              history.go(-1);
          }
          if(this.maxCount != this.max){ 
              this.$toasted.error("選完 "+this.max+" 個座位才能去下一頁", {
                theme: "bubble",
                duration: 3000
              }); 
              return this.cnt++;
          } 
          this.nextPageGetSell();
    }, 
    buildForListData(){
      //list 把走道也算入陣列中 其他data位置數字只計座位數
      var num = 0;
      //i-1只是調整 真正位置數字要看 i 為多少 
      for (let k = 0; k <this.courts[this.cID].rows; k++) {
         var str = "A";
         num =str.charCodeAt() + k;  // 65 + k
         str = String.fromCharCode(num); 
         var seatCount = 1;
         //每列幾個td
         var a = this.courts[this.cID].tdsPerRow;
         //每排幾個座位
         var b = this.courts[this.cID].seats / this.courts[this.cID].rows;
         for (let i = 1; i <= a; i++) { 
            switch (this.cID) {
              case '1': 
                        if(i%a==5 || i%a==6 || i%a==17 || i%a==18 || i%a==29 || i%a==30){
                            this.list[k][i-1].Num = 0;   
                        }else{  
                            this.list[k][i-1].eng = str + seatCount;
                            this.list[k][i-1].Num = (k*b)+seatCount;
                            if(i<12){   
                                this.list[k][i-1].eng = str +"0"+ seatCount;
                            }  
                            seatCount++;
                        }
                break; 
              case '2':
                      // if(i%a==11 || i%a==12){
                      //       this.list[k][i-1].Num = 0;   
                      //   }else{  
                            this.list[k][i-1].eng = str + seatCount;
                            this.list[k][i-1].Num = (k*b)+seatCount;
                            if(i<10){   
                                this.list[k][i-1].eng = str +"0"+ seatCount;
                            }  
                            seatCount++;
                        // }
                break; 
              case '3':
                      if(i%a==5 || i%a==6 || i%a==16 || i%a==17){
                            this.list[k][i-1].Num = 0;   
                        }else{  
                            this.list[k][i-1].eng = str + seatCount;
                            this.list[k][i-1].Num = (k*b)+seatCount;
                            if(i<12){   
                                this.list[k][i-1].eng = str +"0"+ seatCount;
                            }  
                            seatCount++;
                        }
                break; 
            }
            // console.log(i);
         } 
        //  console.log(k);
      } 
      // console.log(this.list); 
      // {eng:"A",seatNum:1,Num:1}, 
    },  
    nextPageGetSell(){  
      var ID = sessionStorage.screeningID;   
      var postData = new FormData(); 
      postData.append('ID', ID); 
      // this.time1 = 1571110257; 
      postData.append('time1', this.time1);
      //所有賣出座位 英文編號 
      this.axios.post(`${this.$api}/detail/tapGetSellOut`, postData).then(response => { 
          if(response.data != "[]no data"){ 
              // console.log(response.data);
              var seatDataStrArray = [];  
              for (let i = 0; i <response.data.length; i++) { 
                      var allSeat = response.data[i].seat;  
                      //每筆訂單的所有座位
                      var array = allSeat.split(",");   
                      for (let k = 0; k <array.length; k++) {
                          //各筆訂單的單一座位 
                          seatDataStrArray.push(array[k]); 
                      }
              }  
// --------------------------新賣出座位英文編號 存入 seatDataStrArray ------------
              //目前已選
              var selectSeatArray = sessionStorage.getItem('choosedSeat').split(",");
              // console.log(" 撈出已賣座位陣列 ="+seatDataStrArray);
              //選擇座位長度
              for(let i =0; i<selectSeatArray.length ; i++){
                  // console.log("選的座位 ="+selectSeatArray[i]); 
                  //撈出座位長度
                  for(let k =0; k<seatDataStrArray.length ; k++){
                        // console.log("每個撈出已賣座位 ="+seatDataStrArray[k]);
                        if(selectSeatArray[i] == seatDataStrArray[k]){
                            // console.log("選的座位==撈出已賣座位" );  
                            this.$toasted.error(seatDataStrArray[k]+" 已經售出", {
                                theme: "bubble",
                                duration: 3000
                            }); 
                            // return window.location.replace("/#/order/chooseSeat");
                            return this.getSellOut();
                        }
                  }
              } 
// -----------------------------------------------------------------------------------------
          } //if(response.data)
          window.location.replace("/#/order/Detail");
      });   
    }, 
    tapGetSellOut(){  
      var ID = sessionStorage.screeningID;   
      var postData = new FormData(); 
      postData.append('ID', ID); 
      postData.append('time1', this.time1);
      this.axios.post(`${this.$api}/detail/tapGetSellOut`, postData).then(response => { 
          // console.log(response.data);
          if(response.data[0].seat){ 
              //所有賣出座位 數字碼
              var seatDataNumArray = []; 
              for (let i = 0; i <response.data.length; i++) {
                      var allSeat = response.data[i].seat;  
                      // console.log(allSeat);
                      var array = allSeat.split(",");  
                      for (let k = 0; k <array.length; k++) {
                          var strEng = array[k].substring(0,1);
                          var strNum = array[k].substring(1,3);
                          // console.log(array[k]);   
                          var asciiNum =strEng.charCodeAt()-65;
                          var seatDataNum = asciiNum*28+Number(strNum); 
                          // console.log(seatDataNum); 
                          seatDataNumArray.push(seatDataNum);
                      }
              }  
              //seatSrc[傳回新賣出座位]換成賣出圖示
              for(let i=0; i < seatDataNumArray.length; i++){ 
                 this.seatSrc[seatDataNumArray[i]] = this.selloutImg;
                 this.seatSelected[i] ="X";
              }   
          }
      });  
    }, 
    tap(){  
      this.tapGetSellOut();
      // console.log(typeof(Number("1571051990")));  
      // console.log(Number("1571051990")-Number("1571051990"));  
      if(this.onClick==0)
        return;
       switch (this.seatSrc[this.onClick]) {  
        //點打勾位  
        case this.selectImg: 
            this.to= "";
            this.maxCount--;
            this.seatSelected[this.onClick] = 0;
            this.seatSrc[this.onClick] = this.seatImg;
            this.tapChangeSession();
            break; 
        //點空位  
        case this.seatImg: 
            if(this.maxCount  == this.max)
                return ; 
            this.maxCount++;
            this.seatSelected[this.onClick] = 1;
            this.seatSrc[this.onClick] = this.selectImg;
            this.tapChangeSession();
            break;  
        }   
    } ,
    //及時更改session
    tapChangeSession(){ 
      //每排幾個座位
      var a =this.courts[this.cID].seats / this.courts[this.cID].rows;
      var sessionList=[];
      //設定物件seatSelected的長度 (同seatSrc)
      var len = this.courts[this.cID].seats;//物件長度
      //i從1開始才會對應正確
      for(let i=1; i <= len; i++){  
          if(this.seatSelected[i] == 1){ 
              var k = i/a;
              var str = "A";
              var newAsciiNum = str.charCodeAt() + k;  // 65 + k
              str = String.fromCharCode(newAsciiNum); 
              var num = i%a;
              var seatEngNum = str + num ; 
              sessionList.push(seatEngNum); 
          }
      }
        sessionStorage.setItem('choosedSeat',sessionList) 
    } 
  }
};
</script> 

<style lang="scss" scoped>
img{
  width:30px;
  // width:10%;
  height:30px; 
}
td img:hover{
  cursor:pointer;
} 
.col-md-12,.col-md-10{ 
  //  border: 1px solid red;
}
.seatImg1{ 
  width:100%;  
}
.seatImg2{ 
  // width:100%; 
  width:40px; 
  height:40px;  
}
.seatImg3{  
  width:40px; 
  height:40px;  
}
// 座位相鄰靠攏
table{  
  width:1000px;
  // height:20%;
  // border: 1px solid blue;
}
table td{ 
    // width:20%;
    // height:100%;
    //座號字體
      font-size:1vw; 
    span{
        // color:white;
        color:red;
    }
    // border: 1px solid black; 
    padding:0;
    img{
      margin:0;
    }
    
}  
div {
  text-align: center;
  div{
    text-align: center;
  }
}  
//RWD  寬度769px以上
@media only screen and (min-width: 769px) {
    .forTable{

    } 
}
//RWD  寬度768px~321px
@media only screen and (min-width: 321px) and (max-width: 768px) {
    .forTable{ 
         overflow: scroll;
    }
}
//RWD  寬度320px~0px
@media only screen and (min-width: 0px) and (max-width: 320px){
    .forTable{ 
          overflow: scroll;
    }
}
</style>
