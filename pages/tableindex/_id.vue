<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="main-m">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商品 ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="desc">
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
  import axios from "axios";

  export default {
    name: 'noteIndex',
    data() {
      return {
        noteList:[]
      }
    },
    async asyncData({params}){
      const { data } = await axios.get('/leyuna/blog/getTopMenuBlogs')
      console.log(data.data)
      return  {noteList:data.data}
    },
    mounted: function () {
      //默认得到该顶级菜单下的所有文章
    },
    methods: {
    },
  }
</script>

<style>
  .main-m {
    padding-top: 3.75rem;;
    padding-left: calc(22rem);
    margin-left: 100px;
    transition: margin-left 0.5s;
  }
  .main-m.toggle {
    margin-left: -180px;
  }
</style>
