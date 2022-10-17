<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="main-m">
      <div id="top-time-index">
        <el-steps space="300px" finish-status="success">
          <el-step @click.native="getTimeListToYear(item.createDt)" v-for="item in allTime"
                   :title="item.createDt"></el-step>
        </el-steps>
      </div>
      <div id="mid-time-index">
        <template v-for="item in timeList">
          <h2 class="archive-year">{{item.createDt}}</h2>
          <div class="mid-time-line">
            <el-timeline>
              <el-timeline-item v-for="article in item.dataList">
                <nuxt-link :to="'/article/'+article.id">{{article.title}}</nuxt-link>
              </el-timeline-item>
            </el-timeline>
          </div>
        </template>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from "axios";

  export default {
    name: 'timeIndex',
    data() {
      return {
        timeList: [],
        allTime:[],
        menuId:"",
      }
    },
    async asyncData({params}) {
      const {data} = await axios({
        url: "/leyuna/blog/getTopMenuBlogs",
        method: "GET",
        params: {"menuId": params.id}
      })
      if(data.status){
        let dataList = Array.from(data.data.records);
        //以时间分组
        let newArr = [];
        dataList.forEach((item, i) => {
          let index = -1;
          let isExists = newArr.some((newItem, j) => {
            if (item.createDt.substr(0, 4) == newItem.createDt) {
              index = j;
              return true;
            }
          })

          if (!isExists) {
            newArr.push({
              createDt: item.createDt.substr(0, 4),
              dataList: [item]
            })
          } else {
            newArr[index].dataList.push(item);
          }
        })
        console.log(newArr);
        return {timeList: newArr,allTime:newArr,menuId:params.id}
      }
    },


    methods: {
      getTimeListToYear(year) {
        axios({
          url: "/leyuna/blog/getTopMenuBlogs",
          method: "GET",
          params: {
            "menuId": this.menuId,
            "createDt": year
          }
        }).then((res) => {
          let data = res.data;
          if(data.status){
            let dataList = Array.from(data.data.records);
            //以时间分组
            let newArr = [];
            dataList.forEach((item, i) => {
              let index = -1;
              let isExists = newArr.some((newItem, j) => {
                if (item.createDt.substr(0, 4) == newItem.createDt) {
                  index = j;
                  return true;
                }
              })

              if (!isExists) {
                newArr.push({
                  createDt: item.createDt.substr(0, 4),
                  dataList: [item]
                })
              } else {
                newArr[index].dataList.push(item);
              }
            })
            this.timeList = newArr;
          }
        })
      }
    },
  }
</script>

<style>
  .main-m.toggle {
    margin-left: -180px;
  }

  .archive-year {
    font-family: 'Source Code Pro', Consolas, Monaco, SFMono-Regular, 'Ubuntu Mono', Menlo, monospace;
    color: #0078e7;
    margin: 0 1.5rem;
  }

  h2 {
    font-size: 2.2rem;
    font-weight: 400;
  }
</style>
