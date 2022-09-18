<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="main-m">
      <el-table
        :data="tableList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>

      <div class="page-card">
        <el-pagination background layout="prev, pager, next" :current-page="query.pageIndex"
                       :page-size="query.pageSize" :total="query.pageTotal"
                       @current-change="handlePageChange"></el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from "axios";

  export default {
    name: 'noteIndex',
    data() {
      return {
        tableList:[],
        query: {
          pageSize: 10,
          pageTotal: 0,
          pageIndex: 1,
        },
      }
    },
    async asyncData({params}){
      // const { data } = await axios.get('/leyuna/blog/getTopMenuBlogs')
      const {data} = await axios.get("/leyuna/blog/blogs")
      console.log(data.data)
      return  {tableList:data.data}
    },
    mounted: function () {
      //默认得到该顶级菜单下的所有文章
    },
    methods: {
      handlePageChange(val) {
        this.query.pageIndex = val;
        this.tableData();
      },
      tableData(){
        axios({
          url:"/leyuna/blog/blogs",
          params:{
            index:this.query.pageIndex,
            size:this.query.pageSize
          }
        }).then((res)=>{
          var data = res.data;
          if(data.status){
            this.tableList = data.data;
          }
        })
      }
    },
  }
</script>

<style>
</style>
