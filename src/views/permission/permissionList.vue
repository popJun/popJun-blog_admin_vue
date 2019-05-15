<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="用户名"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
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
      <el-table-column align="center" label="ID" width="80" sortable="custom">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="权限名" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.permission_name" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.permission_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限描述" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.permission_description" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.permission_description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限URL" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.permission_url" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.permission_url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限类别" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.permission_type" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.permission_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限级别" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.permission_grade" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.permission_grade }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级权限" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.permission_pre_grade" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.permission_pre_grade }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="dialogVisible = true">编辑</el-button>
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

    <!-- 模态框 -->
    <el-dialog title="权限修改" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList } from "@/api/permission";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      total: 1,
      list: null,
      listLoading: true,
      dialogVisible: false, 
      //默认模态框为false
      dialogVisible: false,
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
      getPermissionList(this.listQuery).then(response => {
        const items = response.data.items;
        this.list = items.map(v => {
          return v;
        });
      });
      // 延时1.5秒
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    }
  }
};
</script>
