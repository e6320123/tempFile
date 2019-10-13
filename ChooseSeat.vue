

<template> 
  <div class="container">
    <h1 class="text-center my-5">訂票-選位</h1>
<div class="row">
    <div class="col-md-12"> 
    
    <div id="vm">
      <div>
        您選到的場次為：{{screenId}}&emsp;
        已售出的座位為：<img src="../../assets/sellout.png" alt="">&emsp;
        您可選的座位為： <img src="../../assets/seat.png" alt="">&emsp;
        預設幫您排的座位為： 
        <table class="table table-borderless">  
            <tr> 
            <!--eslint-disable-next-line-->
                <td v-for="obj in list[0]">
           {{obj.eng}}
                    <img @click="onClick=obj.Num;tap();"   :src="seatSrc[obj.Num]" class="seatImg"/>
                </td>
            </tr>  
            <tr> 
            <!--eslint-disable-next-line-->
                <td v-for="obj in list[1]">
                    <span>{{obj.whiteStr}}</span>{{obj.eng}} 
                    <img @click="onClick=obj.Num;tap();"  v-bind:src="seatSrc[obj.Num]" class="seatImg"/>
                </td>
            </tr>  
            <tr> 
            <!--eslint-disable-next-line-->
                <td v-for="obj in list[2]">
                    <span>{{obj.whiteStr}}</span>{{obj.eng}}
                    
                    <img @click="onClick=obj.Num;tap();"  v-bind:src="seatSrc[obj.Num]" class="seatImg"/>
                </td>
            </tr>  
            <tr> 
            <!--eslint-disable-next-line-->
                <td v-for="obj in list[3]">
                    <span>{{obj.whiteStr}}</span>{{obj.eng}}
                    
                    <img @click="onClick=obj.Num;tap();"  v-bind:src="seatSrc[obj.Num]" class="seatImg"/>
                </td>
            </tr>  
            <tr> 
            <!--eslint-disable-next-line-->
                <td v-for="obj in list[4]">
                    <span>{{obj.whiteStr}}</span>{{obj.eng}}
                    
                    <img @click="onClick=obj.Num;tap();"  v-bind:src="seatSrc[obj.Num]" class="seatImg"/>
                </td>
            </tr>  
            <tr> 
            <!--eslint-disable-next-line-->
                <td v-for="obj in list[5]">
                    <span>{{obj.whiteStr}}</span>{{obj.eng}}
                    
                    <img @click="onClick=obj.Num;tap();"  v-bind:src="seatSrc[obj.Num]" class="seatImg"/>
                </td>
            </tr>  
            <tr> 
            <!--eslint-disable-next-line-->
                <td v-for="obj in list[6]">
                    <span>{{obj.whiteStr}}</span>{{obj.eng}}
                    
                    <img @click="onClick=obj.Num;tap();"  v-bind:src="seatSrc[obj.Num]" class="seatImg"/>
                </td>
            </tr>  
            <tr> 
            <!--eslint-disable-next-line-->
                <td v-for="obj in list[7]">
                    <span>{{obj.whiteStr}}</span>{{obj.eng}}
                    
                    <img @click="onClick=obj.Num;tap();"  v-bind:src="seatSrc[obj.Num]" class="seatImg"/>
                </td>
            </tr>  
            <tr> 
            <!--eslint-disable-next-line-->
                <td v-for="obj in list[8]">
                    <span>{{obj.whiteStr}}</span>{{obj.eng}}
                    
                    <img @click="onClick=obj.Num;tap();"  v-bind:src="seatSrc[obj.Num]" class="seatImg"/>
                </td>
            </tr>  
            <tr> 
            <!--eslint-disable-next-line-->
                <td v-for="obj in list[9]">
                    <span>{{obj.whiteStr}}</span>{{obj.eng}}
                    
                    <img @click="onClick=obj.Num;tap();"  v-bind:src="seatSrc[obj.Num]" class="seatImg"/>
                </td>
            </tr>  
        </table> 
    
        
      </div>
      <!--<input type="text" v-model="max">
      最多選擇: {{this.max}}個
       <br />
       every seat status: {{seatSelected}}  -->

      <router-link @click.native="nextPage"  :to="to" class="btn btn-success btn-block">點我去看訂單詳細</router-link>
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
      list: [ 
      // 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 
 /*0*/  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
 /*1*/  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
 /*2*/  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
 /*3*/  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
 /*4*/  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
 /*5*/  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
 /*6*/  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
 /*7*/  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
 /*8*/  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
 /*9*/  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
        ],
    seatSrc:  //用物件才能點選變換圖片
      {
  '1':0,  '2':0,  '3':0,  '4':0,  '5':0,  '6':0,  '7':0,  '8':0,  '9':0, '10':0, '11':0, '12':0, '13':0, '14':0, '15':0, '16':0, '17':0, '18':0, '19':0, '20':0,
 '21':0, '22':0, '23':0, '24':0, '25':0, '26':0, '27':0, '28':0, '29':0, '30':0, '31':0, '32':0, '33':0, '34':0, '35':0, '36':0, '37':0, '38':0, '39':0, '40':0,
 '41':0, '42':0, '43':0, '44':0, '45':0, '46':0, '47':0, '48':0, '49':0, '50':0, '51':0, '52':0, '53':0, '54':0, '55':0, '56':0, '57':0, '58':0, '59':0, '60':0,
 '61':0, '62':0, '63':0, '64':0, '65':0, '66':0, '67':0, '68':0, '69':0, '70':0, '71':0, '72':0, '73':0, '74':0, '75':0, '76':0, '77':0, '78':0, '79':0, '80':0,
 '81':0, '82':0, '83':0, '84':0, '85':0, '86':0, '87':0, '88':0, '89':0, '90':0, '91':0, '92':0, '93':0, '94':0, '95':0, '96':0, '97':0, '98':0, '99':0,'100':0, 
'101':0,'102':0,'103':0,'104':0,'105':0,'106':0,'107':0,'108':0,'109':0,'110':0,'111':0,'112':0,'113':0,'114':0,'115':0,'116':0,'117':0,'118':0,'119':0,'120':0,
'121':0,'122':0,'123':0,'124':0,'125':0,'126':0,'127':0,'128':0,'129':0,'130':0,'131':0,'132':0,'133':0,'134':0,'135':0,'136':0,'137':0,'138':0,'139':0,'140':0,
'141':0,'142':0,'143':0,'144':0,'145':0,'146':0,'147':0,'148':0,'149':0,'150':0,'151':0,'152':0,'153':0,'154':0,'155':0,'156':0,'157':0,'158':0,'159':0,'160':0,
'161':0,'162':0,'163':0,'164':0,'165':0,'166':0,'167':0,'168':0,'169':0,'170':0,'171':0,'172':0,'173':0,'174':0,'175':0,'176':0,'177':0,'178':0,'179':0,'180':0,
'181':0,'182':0,'183':0,'184':0,'185':0,'186':0,'187':0,'188':0,'189':0,'190':0,'191':0,'192':0,'193':0,'194':0,'195':0,'196':0,'197':0,'198':0,'199':0,'200':0,
'201':0,'202':0,'203':0,'204':0,'205':0,'206':0,'207':0,'208':0,'209':0,'210':0,'211':0,'212':0,'213':0,'214':0,'215':0,'216':0,'217':0,'218':0,'219':0,'220':0,
'221':0,'222':0,'223':0,'224':0,'225':0,'226':0,'227':0,'228':0,'229':0,'230':0,'231':0,'232':0,'233':0,'234':0,'235':0,'236':0,'237':0,'238':0,'239':0,'240':0,
'241':0,'242':0,'243':0,'244':0,'245':0,'246':0,'247':0,'248':0,'249':0,'250':0,'251':0,'252':0,'253':0,'254':0,'255':0,'256':0,'257':0,'258':0,'259':0,'260':0,
'261':0,'262':0,'263':0,'264':0,'265':0,'266':0,'267':0,'268':0,'269':0,'270':0,'271':0,'272':0,'273':0,'274':0,'275':0,'276':0,'277':0,'278':0,'279':0,'280':0 
           
      }, 
      seatSelected:
      {
  '1':0,  '2':0,  '3':0,  '4':0,  '5':0,  '6':0,  '7':0,  '8':0,  '9':0, '10':0, '11':0, '12':0, '13':0, '14':0, '15':0, '16':0, '17':0, '18':0, '19':0, '20':0,
 '21':0, '22':0, '23':0, '24':0, '25':0, '26':0, '27':0, '28':0, '29':0, '30':0, '31':0, '32':0, '33':0, '34':0, '35':0, '36':0, '37':0, '38':0, '39':0, '40':0,
 '41':0, '42':0, '43':0, '44':0, '45':0, '46':0, '47':0, '48':0, '49':0, '50':0, '51':0, '52':0, '53':0, '54':0, '55':0, '56':0, '57':0, '58':0, '59':0, '60':0,
 '61':0, '62':0, '63':0, '64':0, '65':0, '66':0, '67':0, '68':0, '69':0, '70':0, '71':0, '72':0, '73':0, '74':0, '75':0, '76':0, '77':0, '78':0, '79':0, '80':0,
 '81':0, '82':0, '83':0, '84':0, '85':0, '86':0, '87':0, '88':0, '89':0, '90':0, '91':0, '92':0, '93':0, '94':0, '95':0, '96':0, '97':0, '98':0, '99':0,'100':0, 
'101':0,'102':0,'103':0,'104':0,'105':0,'106':0,'107':0,'108':0,'109':0,'110':0,'111':0,'112':0,'113':0,'114':0,'115':0,'116':0,'117':0,'118':0,'119':0,'120':0,
'121':0,'122':0,'123':0,'124':0,'125':0,'126':0,'127':0,'128':0,'129':0,'130':0,'131':0,'132':0,'133':0,'134':0,'135':0,'136':0,'137':0,'138':0,'139':0,'140':0,
'141':0,'142':0,'143':0,'144':0,'145':0,'146':0,'147':0,'148':0,'149':0,'150':0,'151':0,'152':0,'153':0,'154':0,'155':0,'156':0,'157':0,'158':0,'159':0,'160':0,
'161':0,'162':0,'163':0,'164':0,'165':0,'166':0,'167':0,'168':0,'169':0,'170':0,'171':0,'172':0,'173':0,'174':0,'175':0,'176':0,'177':0,'178':0,'179':0,'180':0,
'181':0,'182':0,'183':0,'184':0,'185':0,'186':0,'187':0,'188':0,'189':0,'190':0,'191':0,'192':0,'193':0,'194':0,'195':0,'196':0,'197':0,'198':0,'199':0,'200':0,
'201':0,'202':0,'203':0,'204':0,'205':0,'206':0,'207':0,'208':0,'209':0,'210':0,'211':0,'212':0,'213':0,'214':0,'215':0,'216':0,'217':0,'218':0,'219':0,'220':0,
'221':0,'222':0,'223':0,'224':0,'225':0,'226':0,'227':0,'228':0,'229':0,'230':0,'231':0,'232':0,'233':0,'234':0,'235':0,'236':0,'237':0,'238':0,'239':0,'240':0,
'241':0,'242':0,'243':0,'244':0,'245':0,'246':0,'247':0,'248':0,'249':0,'250':0,'251':0,'252':0,'253':0,'254':0,'255':0,'256':0,'257':0,'258':0,'259':0,'260':0,
'261':0,'262':0,'263':0,'264':0,'265':0,'266':0,'267':0,'268':0,'269':0,'270':0,'271':0,'272':0,'273':0,'274':0,'275':0,'276':0,'277':0,'278':0,'279':0,'280':0 
           
      },  
      max:0, 
      maxCount:0, 
      onClick:-1, 
      temp:1, 
      screenId:"",
      to:"",
      sellOutData:{},
      selectImg:imgSelect ,
      selloutImg:imgSellout,
      seatImg:imgSeat ,
      aisleImg:imgAisle ,
      initialCheck:0
    };
  },
  mounted() { 
    this.buildForListData();
    this.getSellOut();
    // this.getCourtsData();
    this.screenId = sessionStorage.getItem('screeningID'); 
    this.max =
        JSON.parse(JSON.parse(sessionStorage.getItem('movie')).ticketsNum)[0]+
        JSON.parse(JSON.parse(sessionStorage.getItem('movie')).ticketsNum)[1]; 
    sessionStorage.setItem('max',this.max); 
    // console.log(this.initialCheck);
    if(this.initialCheck ==0) {
        this.seatSrc = JSON.parse(localStorage.getItem('seatSrc'));
        this.sellOutData = JSON.parse(localStorage.getItem('sellOutData'));
    } 
  },
  methods: {  
    getSellOut(){
      this.axios.get(`${this.$api}/detail/getSellOut`).then(response => {  
          var seatDataNumArray =[];
          for (let i = 0; i <response.data.length; i++) {
                  var allSeat = response.data[i].seat;  
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
          // console.log(seatDataNumArray); 
          //載入售出位置 
          for(let i=1; i <=280; i++){
             this.sellOutData[i] = 0;
          }   
          for(let i=0; i < seatDataNumArray.length; i++){
             this.sellOutData[seatDataNumArray[i]] = 1; 
          }    
          //設定所有走道
          this.seatSrc[0] = this.aisleImg;  
          //設定所有座位圖示
          for(let i=1; i <=280; i++){
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
          if(this.to != "/order/Detail"){ 
              this.$toasted.error("選完 "+this.max+" 個座位才能去下一頁", {
                theme: "bubble",
                duration: 3000
              });  
          }
    }, 
    buildForListData(){
      //list 把走道也算入陣列中 其他data位置數字只計座位數
      var num = 0;
      //i-1只是調整 真正位置數字要看 i 為多少 
      for (let k = 0; k <10; k++) {
         var str = "A";
         num =str.charCodeAt() + k;  // 65 + k
         str = String.fromCharCode(num); 
         var seatCount = 1;
         for (let i = 1; i <= 34; i++) { 
            if(i%34==5 || i%34==6 || i%34==17 || i%34==18 || i%34==29 || i%34==30){
                // this.list[k][i-1].eng = "" ; 
                this.list[k][i-1].Num = 0;  
                // this.list[k][i-1].whiteStrF = "";
                // this.list[k][i-1].whiteStr = "A09";
            }else{  
                this.list[k][i-1].eng = str + seatCount; 
                //list[0][34]{Num  eng}
                this.list[k][i-1].Num = (k*28)+seatCount;
                if(i<12){   
                    this.list[k][i-1].eng = str +"0"+ seatCount; 
                    // this.list[k][i-1].whiteStrF = "["; 
                    // this.list[k][i-1].whiteStrB = "]";
                    // "A1"
                    // "[A1]"
                    // "[A10"
                }else{
                    // this.list[k][i-1].whiteStrF = "[";
                }

                seatCount++;
            }
            // console.log(i);
         } 
        //  console.log(k);
      } 
      // console.log(this.list);
          
      // {eng:"A",seatNum:1,Num:1},

    },   
    tap(){  
      console.log(this.onClick); 
      if(this.onClick==0)
        return;
       switch (this.seatSrc[this.onClick]) {  
        //點打勾位  
        case this.selectImg:
            console.log("點打勾位"); 
            this.to= "";
            this.maxCount--;
            this.seatSelected[this.onClick] = 0;
            this.seatSrc[this.onClick] = this.seatImg;
            this.tapChangeSession();
            break; 
        //點空位  
        case this.seatImg:
            console.log("點空位"); 
            if(this.maxCount  == this.max)
                return ;
            if(this.maxCount +1 == this.max)
                this.to= "/order/Detail"; 
            this.maxCount++;
            this.seatSelected[this.onClick] = 1;
            this.seatSrc[this.onClick] = this.selectImg;
            this.tapChangeSession();
            break;  
        }  
    } ,
    //及時更改session
    tapChangeSession(){ 
      var sessionList=[];
      //設定物件seatSelected的長度
      var arr = Object.keys(this.seatSelected);
      var len = arr.length;//物件長度
      //i從1開始才會對應正確
      for(let i=1; i <= len; i++){  
          if(this.seatSelected[i] == 1){ 
              var k = i/28;
              var str = "A";
              var newAsciiNum = str.charCodeAt() + k;  // 65 + k
              str = String.fromCharCode(newAsciiNum); 
              var num = i%28;
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
.seatImg{ 
  width:30px; 
  height:30px;  
}
// 座位相鄰靠攏
table{  
  // width:20%;
  // height:20%;
  // border: 1px solid blue;
}
table td{ 
    // width:20%;
    // height:100%;
    //座號字體
      font-size:12px; 
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
</style>
