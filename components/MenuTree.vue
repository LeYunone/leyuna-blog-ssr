<template>
  <div>
    <template v-for="menu in this.menuData">
      <nuxt-link :to="menu.children?menu.menuUrl+'/'+menu.menuId:menu.menuUrl">
        <el-submenu :key="menu.menuId" :index="menu.menuId" v-if="menu.children">
          <template slot="title">
            <!--          <i :class="menu.icon"></i>-->
            <span slot="title">{{menu.menuName}}</span>
          </template>
          <menu-tree :menuData="menu.children"></menu-tree>
        </el-submenu>
        <el-menu-item :key="menu.menuId" :index="menu.menuId" v-else>
          <!--        <i :class="menu.icon"></i>-->
          <span slot="title">{{menu.menuName}}</span>
        </el-menu-item>
      </nuxt-link>
    </template>
  </div>
</template>

<script>
  export default {
    props: ['menuData'],
    name: 'MenuTree'
  }
</script>
