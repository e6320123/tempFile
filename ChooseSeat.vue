
<template>
  <div class="container">
    <h1 class="text-center my-5">訂票-選位</h1>

    <div id="vm">
      <div>
        您選到的場次為：
        <br />已售出的座位為：
        <br />
        您可選的座位為： {{this.canChooseSeat}}
        <br />預設幫您排的座位為：
        <table class="table table-borderless">
          <tr>
            <td>
              <p @click="onClick=1;click(); putSeatIn(a1,1)" v-bind:class="{changeColor:clas[1]}">1</p>
              <p @click="onClick=10;click(); putSeatIn(a10,10)" v-bind:class="{changeColor:clas[10]}">10</p>
              <p @click="onClick=19;click(); putSeatIn(a19,19)" v-bind:class="{changeColor:clas[19]}">19</p>
              <p @click="onClick=28;click(); putSeatIn(a28,28)" v-bind:class="{changeColor:clas[28]}">28</p>
              <p @click="onClick=37;click(); putSeatIn(a37,37)" v-bind:class="{changeColor:clas[37]}">37</p>
              <p @click="onClick=46;click(); putSeatIn(a46,46)" v-bind:class="{changeColor:clas[46]}">46</p>
              <p @click="onClick=55;click(); putSeatIn(a55,55)" v-bind:class="{changeColor:clas[55]}">55</p>
              <p @click="onClick=64;click(); putSeatIn(a64,64)" v-bind:class="{changeColor:clas[64]}">64</p>
            </td>
            <td>
              <p @click="onClick=2;click(); putSeatIn(a2,2)" v-bind:class="{changeColor:clas[2]}">2</p>
              <p @click="onClick=11;click(); putSeatIn(a11,11)" v-bind:class="{changeColor:clas[11]}">11</p>
              <p @click="onClick=20;click(); putSeatIn(a20,20)" v-bind:class="{changeColor:clas[20]}">20</p>
              <p @click="onClick=29;click(); putSeatIn(a29,29)" v-bind:class="{changeColor:clas[29]}">29</p>
              <p @click="onClick=38;click(); putSeatIn(a38,38)" v-bind:class="{changeColor:clas[38]}">38</p>
              <p @click="onClick=47;click(); putSeatIn(a47,47)" v-bind:class="{changeColor:clas[47]}">47</p>
              <p @click="onClick=56;click(); putSeatIn(a56,56)" v-bind:class="{changeColor:clas[56]}">56</p>
              <p @click="onClick=65;click(); putSeatIn(a65,65)" v-bind:class="{changeColor:clas[65]}">65</p>
            </td> 
            <td>
              <p @click="onClick=3;click(); putSeatIn(a3,3)" v-bind:class="{changeColor:clas[3]}">3</p>
              <p @click="onClick=12;click(); putSeatIn(a12,12)" v-bind:class="{changeColor:clas[12]}">12</p>
              <p @click="onClick=21;click(); putSeatIn(a21,21)" v-bind:class="{changeColor:clas[21]}">21</p>
              <p @click="onClick=30;click(); putSeatIn(a30,30)" v-bind:class="{changeColor:clas[30]}">30</p>
              <p @click="onClick=39;click(); putSeatIn(a39,39)" v-bind:class="{changeColor:clas[39]}">39</p>
              <p @click="onClick=48;click(); putSeatIn(a48,48)" v-bind:class="{changeColor:clas[48]}">48</p>
              <p @click="onClick=57;click(); putSeatIn(a57,57)" v-bind:class="{changeColor:clas[57]}">57</p>
              <p @click="onClick=66;click();; putSeatIn(a66,66)" v-bind:class="{changeColor:clas[66]}">66</p>
            </td>

            <td>
              <p @click="onClick=4;click(); putSeatIn(a4,4)" v-bind:class="{changeColor:clas[4]}">4</p>
              <p @click="onClick=13;click(); putSeatIn(a13,13)" v-bind:class="{changeColor:clas[13]}">13</p>
              <p @click="onClick=22;click(); putSeatIn(a22,22)" v-bind:class="{changeColor:clas[22]}">22</p>
              <p @click="onClick=31;click(); putSeatIn(a31,31)" v-bind:class="{changeColor:clas[31]}">31</p>
              <p @click="onClick=40;click(); putSeatIn(a40,40)" v-bind:class="{changeColor:clas[40]}">40</p>
              <p @click="onClick=49;click(); putSeatIn(a49,49)" v-bind:class="{changeColor:clas[49]}">49</p>
              <p @click="onClick=58;click(); putSeatIn(a58,58)" v-bind:class="{changeColor:clas[58]}">58</p>
              <p @click="onClick=67;click(); putSeatIn(a67,67)" v-bind:class="{changeColor:clas[67]}">67</p>
            </td>
            <td>
              <p @click="onClick=5;click(); putSeatIn(a5,5)" v-bind:class="{changeColor:clas[5]}">5</p>
              <p @click="onClick=14;click(); putSeatIn(a14,14)" v-bind:class="{changeColor:clas[14]}">14</p>
              <p @click="onClick=23;click(); putSeatIn(a23,23)" v-bind:class="{changeColor:clas[23]}">23</p>
              <p @click="onClick=32;click(); putSeatIn(a32,32)" v-bind:class="{changeColor:clas[32]}">32</p>
              <p @click="onClick=41;click(); putSeatIn(a41,41)" v-bind:class="{changeColor:clas[41]}">41</p>
              <p @click="onClick=50;click(); putSeatIn(a50,50)" v-bind:class="{changeColor:clas[50]}">50</p>
              <p @click="onClick=59;click(); putSeatIn(a59,59)" v-bind:class="{changeColor:clas[59]}">59</p>
              <p @click="onClick=68;click(); putSeatIn(a68,68)" v-bind:class="{changeColor:clas[68]}">68</p>
            </td>
            <td>
              <p @click="onClick=6;click(); putSeatIn(a6,6)" v-bind:class="{changeColor:clas[6]}">6</p>
              <p @click="onClick=15;click(); putSeatIn(a15,15)" v-bind:class="{changeColor:clas[15]}">15</p>
              <p @click="onClick=24;click(); putSeatIn(a24,24)" v-bind:class="{changeColor:clas[24]}">24</p>
              <p @click="onClick=33;click(); putSeatIn(a33,33)" v-bind:class="{changeColor:clas[33]}">33</p>
              <p @click="onClick=42;click(); putSeatIn(a42,42)" v-bind:class="{changeColor:clas[42]}">42</p>
              <p @click="onClick=51;click(); putSeatIn(a51,51)" v-bind:class="{changeColor:clas[51]}">51</p>
              <p @click="onClick=60;click(); putSeatIn(a60,60)" v-bind:class="{changeColor:clas[60]}">60</p>
              <p @click="onClick=69;click(); putSeatIn(a69,69)" v-bind:class="{changeColor:clas[69]}">69</p>
            </td>
            <td>
              <p @click="onClick=7;click(); putSeatIn(a7,7)" v-bind:class="{changeColor:clas[7]}">7</p>
              <p @click="onClick=16;click(); putSeatIn(a16,16)" v-bind:class="{changeColor:clas[16]}">16</p>
              <p @click="onClick=25;click(); putSeatIn(a25,25)" v-bind:class="{changeColor:clas[25]}">25</p>
              <p @click="onClick=34;click(); putSeatIn(a34,34)" v-bind:class="{changeColor:clas[34]}">34</p>
              <p @click="onClick=43;click(); putSeatIn(a43,43)" v-bind:class="{changeColor:clas[43]}">43</p>
              <p @click="onClick=52;click(); putSeatIn(a52,52)" v-bind:class="{changeColor:clas[52]}">52</p>
              <p @click="onClick=61;click(); putSeatIn(a61,61)" v-bind:class="{changeColor:clas[61]}">61</p>
              <p @click="onClick=70;click(); putSeatIn(a70,70)" v-bind:class="{changeColor:clas[70]}">70</p>
            </td>
            <td></td>
            <td>
              <p @click="onClick=8;click();putSeatIn(a8,8)" v-bind:class="{changeColor:clas[8]}">8</p>
              <p @click="onClick=17;click(); putSeatIn(a17,17)" v-bind:class="{changeColor:clas[17]}">17</p>
              <p @click="onClick=26;click(); putSeatIn(a26,26)" v-bind:class="{changeColor:clas[26]}">26</p>
              <p @click="onClick=35;click(); putSeatIn(a35,35)" v-bind:class="{changeColor:clas[35]}">35</p>
              <p @click="onClick=44;click(); putSeatIn(a44,44)" v-bind:class="{changeColor:clas[44]}">44</p>
              <p @click="onClick=53;click(); putSeatIn(a53,53)" v-bind:class="{changeColor:clas[53]}">53</p>
              <p @click="onClick=62;click(); putSeatIn(a62,62)" v-bind:class="{changeColor:clas[62]}">62</p>
              <p @click="onClick=71;click(); putSeatIn(a71,71)" v-bind:class="{changeColor:clas[71]}">71</p>
            </td>
            <td>
              <p @click="onClick=9;click(); putSeatIn(a9,9)" v-bind:class="{changeColor:clas[9]}">9</p>
              <p @click="onClick=18;click(); putSeatIn(a18,18)" v-bind:class="{changeColor:clas[18]}">18</p>
              <p @click="onClick=27;click(); putSeatIn(a27,27)" v-bind:class="{changeColor:clas[27]}">27</p>
              <p @click="onClick=36;click(); putSeatIn(a36,36)" v-bind:class="{changeColor:clas[36]}">36</p>
              <p @click="onClick=45;click(); putSeatIn(a45,45)" v-bind:class="{changeColor:clas[45]}">45</p>
              <p @click="onClick=54;click(); putSeatIn(a54,54)" v-bind:class="{changeColor:clas[54]}">54</p>
              <p @click="onClick=63;click(); putSeatIn(a63,63)" v-bind:class="{changeColor:clas[63]}">63</p>
              <p @click="onClick=72;click(); putSeatIn(a72,72)" v-bind:class="{changeColor:clas[72]}">72</p>
            </td>
          </tr>
        </table>
      </div>
      every seat status: {{ checkedNames }}
      <br />
      checked seats: {{ finalSeat }}
      =======
      <br />
      <br />
      <br />
      {{canChooseSeat}}
      <router-link to="/order/Detail" class="btn btn-success btn-block">點我去看訂單詳細</router-link>
    </div>
  </div>
</template>

<script>
export default {
  // name: "chooseSeat",
  data() {
    return {
      a: false,
      a1: false,
      a2: false,
      a3: false,
      a4: false,
      a5: false,
      a6: false,
      a7: false,
      a8: false,
      a9: false,
      a10: false,
      a11: false,
      a12: false,
      a13: false,
      a14: false,
      a15: false,
      a16: false,
      a17: false,
      a18: false,
      a19: false,
      a20: false,
      a21: false,
      a22: false,
      a23: false,
      a24: false,
      a25: false,
      a26: false,
      a27: false,
      a28: false,
      a29: false,
      a30: false,
      a31: false,
      a32: false,
      a33: false,
      a34: false,
      a35: false,
      a36: false,
      a37: false,
      a38: false,
      a39: false,
      a40: false,
      a41: false,
      a42: false,
      a43: false,
      a44: false,
      a45: false,
      a46: false,
      a47: false,
      a48: false,
      a49: false,
      a50: false,
      a51: false,
      a52: false,
      a53: false,
      a54: false,
      a55: false,
      a56: false,
      a57: false,
      a58: false,
      a59: false,
      a60: false,
      a61: false,
      a62: false,
      a63: false,
      a64: false,
      a65: false,
      a66: false,
      a67: false,
      a68: false,
      a69: false,
      a70: false,
      a71: false,
      a72: false,
      a73: false,
      a74: false,
      a75: false,
      a76: false,
      a77: false,
      a78: false,
      a79: false,
      checkedNames: [],
      finalSeat: [],
      x: "",
      seat: "",
      canChooseSeat: 0, 
      clas:{ 
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10':0,
      '11':0,
      '12':0,
      '13':0,
      '14':0,
      '15':0,
      '16':0,
      '17':0,
      '18':0,
      '19':0,
      '20':0,
      '21':0,
      '22':0,
      '23':0,
      '24':0,
      '25':0,
      '26':0,
      '27':0,
      '28':0,
      '29':0,
      '30':0,
      '31':0,
      '32':0,
      '33':0,
      '34':0,
      '35':0,
      '36':0,
      '37':0,
      '38':0,
      '39':0,
      '40':0,
      '41':0,
      '42':0,
      '43':0,
      '44':0,
      '45':0,
      '46':0,
      '47':0,
      '48':0,
      '49':0,
      '50':0,
      '51':0,
      '52':0,
      '53':0,
      '54':0,
      '55':0,
      '56':0,
      '57':0,
      '58':0,
      '59':0,
      '60':0,
      '61':0,
      '62':0,
      '63':0,
      '64':0,
      '65':0,
      '66':0,
      '67':0,
      '68':0,
      '69':0,
      '70':0,
      '71':0,
      '72':0,
      '73':0,
      '74':0,
      '75':0,
      '76':0,
      '77':0,
      '78':0,
      '79':0
      },
      max:5, 
      onClick:-1,
      light:[]
    };
  },
  mounted() { 
    // this.initSeat(0);
    this.putSeatIn(this.x, this.seat);
    this.getSession();
    this.setSession();
  },
  methods: {
    click(){  
        var thr= this.onClick;
        // this.light.forEach(element => {
        //   this.clas[element] = 1;
        // });
        this.light.push(thr);
        console.log(this.light);
        if(this.light.length>this.max){
          var shift = this.light.shift(); 
          this.clas[shift] = 0; 
          console.log(this.light.length);
          console.log("shift");
        }
        this.light.forEach(element => {
          this.clas[element] = 1;
        });
        // console.log(light);
        // for(){}設定亮 
    },
    putSeatIn(x, seat) {
      //x 是  true false 值 辨別該座位是否選取
      //seat 為 key   紀錄哪個座位

      
      if (this.finalSeat.length < this.canChooseSeat) {
        // if (this.finalSeat.length < this.canChooseSeat) {
        let i = 0,
          j = 0;
        this.checkedNames[seat] = x;

        this.finalSeat = [];
        for (i = 0; i < 80; i++) {
          if (this.checkedNames[i] == true) {
            this.finalSeat[j] = i;
            j++;
          }
        }
        this.setSession();
      } else {
        this.finalSeat = [];
        // alert("選太多位ㄗ惹");
        console.log("選太多位ㄗ惹");
        this.x=false;
      }
    },
    // initSeat(x){
    //   let i=0;
    //   for(i=x;i<x+4;i++){
    //     this.checkedNames[x]=true ;
    //   console.log(this.checkedNames);
    //   }
    // },

    getSession() {
      this.canChooseSeat = sessionStorage.totalTicketsNum;
      //取得可選座位數
    },
    setSession() {
      sessionStorage.setItem(
        "choosedSeat",this.finalSeat
        //傳出已選座位
      );
    },
    changeStatus(x){

    }
  }
};
</script>




<style scoped>
p {
  border: 1px solid black;
  height: 30px;
  width: 30px;
  text-align: center;
  /* padding: 2px; */
  line-height: 24px;
  cursor: pointer;
}

.changeColor {
  background: rgba(7, 73, 216, 0.918);
}

div {
  text-align: center;
}

div div {
  text-align: center;
}
</style>
