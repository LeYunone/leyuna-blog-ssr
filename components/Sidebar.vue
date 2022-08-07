<template>
  <div class="leftDiv">
    <div class="sidebar">
      <el-row>
        <el-col>
          <el-menu
            default-active="16"
            class="el-menu-vertical-demo"
          >
            <MenuTree :menuData="menuList"></MenuTree>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import MenuTree from "./MenuTree";

  export default {
    components: {MenuTree},
    data() {
      return {
        menuList: [],
      }
    },
    // async fetch() {
    //
    //   this.loading = loading;
    // },
    mounted: function () {
      // const loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      // });
      axios.get('/leyuna/menu/getAllMenu').then(res => {
        let data = res.data;
        if(data.status){
          this.menuList = data.data;
        }
        // loading.close();
      });
    },
    methods: {}
  };
</script>

<style type="text/css">
  .leftDiv {
    float: left;
    position: fixed;
    width: 17rem;
    height: 80%;
    transition: transform 0.5s;
    transform: translateX(0%);
    border-right: solid 1px #e6e6e6;
  }

  .el-menu {
    border-right: 0;
  }

  .leftDiv.toggle {
    transform: translateX(-100%);
  }

  .sidebar {
    overflow: hidden;
    white-space: nowrap;
  }

  .sidebar-wrapper {
    position: fixed;
    top: 3.75rem;
    bottom: 0;
    left: 100%;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    transition: left .3s ease;
  }

  .left-btn {
    bottom: 0;
  }

  .sidebar-wrapper:hover {
    background-color: hwb(0deg 97% 3%);
  }
</style>
