<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit">添加</el-button>
      <el-button class="filter-item" type="danger" icon="el-icon-delete">删除</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column label="角色名" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.role_name" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.role_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色描述" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.role_discription" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.role_discription}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="small-padding fixed-width" label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button type="primary" >分配权限</el-button>  
          <el-button
            v-if="scope.row.edit"
            type="success"
            icon="el-icon-circle-check-outline"
            @click="scope.row.edit=false"
          >Ok</el-button>
          <el-button
            v-else
            type="primary"
            icon="el-icon-edit"
            @click="scope.row.edit=!scope.row.edit"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { getRoleList } from "@/api/permission";
//分页插件
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      total: 1,
      list: null,
      listLoading: true,
      //参数
      listQuery: {
        page: 1,
        limit: 20
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getRoleList(this.listQuery).then(response => {
        const items = response.data.items;  
        this.list = items.map(v => {
          this.$set(v, "edit", false); // https://vuejs.org/v2/guide/reactivity.html
          return v;
        });
         // 延时1.5秒
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
      
    }
  }
};
</script>