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
    <div @click="sidebarBtn" class="sidebar-wrapper">
      <span class="el-icon-arrow-left"></span>
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
        menuList: []
      }
    },
    async fetch(){
      const { data } = await axios.get('/leyuna/menu/getAllMenu');
      this.menuList = data.data;
    },
    methods: {
      sidebarBtn() {
        if (!$(".leftDiv").hasClass("toggle")) {
          $(".leftDiv").addClass("toggle")
          $(".main-m").addClass("toggle")
          $(".sidebar-wrapper").addClass("toggle")
          $(".el-icon-arrow-left").addClass("el-icon-arrow-right")
          $(".el-icon-arrow-left").removeClass("el-icon-arrow-left");
        } else {
          $(".leftDiv").removeClass("toggle")
          $(".main-m").removeClass("toggle")
          $(".sidebar-wrapper").removeClass("toggle")
          $(".el-icon-arrow-right").addClass("el-icon-arrow-left")
          $(".el-icon-arrow-right").removeClass("el-icon-arrow-right");
        }
      }
    }
  };
</script>

<style type="text/css">

  .leftDiv {
    z-index: 150;
    margin: 0;
    font-size: 16px;
    position: fixed;
    width: 17rem;
    height: 100%;
    transition: transform 0.5s;
    transform: translateX(0%);
  }

  .leftDiv.toggle {
    transform: translateX(-100%);
  }

  .sidebar {
    position: fixed;
    top: 3.75rem;
    bottom: 0;
    left: 0;
    z-index: 150;
    box-sizing: border-box;
    margin: 0;
    font-size: 16px;
    -webkit-backdrop-filter: saturate(150%) blur(12px);
    backdrop-filter: saturate(150%) blur(12px);
    width: 17rem;
    transition: transform 0.5s;
    transform: translateX(0%);
    border-right: solid 1px #e6e6e6;

    /*overflow-y: auto;*/
    overflow: hidden;
    /*white-space: nowrap;*/
  }

  .sidebar-wrapper {
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    position: fixed;
    top: 3.75rem;
    bottom: 0;
    left: 17rem;
    transition: left .3s ease;
  }

  .sidebar-wrapper:hover {
    background-color: hwb(0deg 97% 3%);
  }
</style>
