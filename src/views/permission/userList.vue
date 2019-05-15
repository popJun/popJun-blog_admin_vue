<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="用户名"/>
      <el-select placeholder="角色" clearable style="width: 100px" class="filter-item">
        <el-option label="管理员" key="admin" value="admin"/>
      </el-select>
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
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.name" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属角色" width="170" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.role_name"  size="small" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
          <span v-else>{{ scope.row.role_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="110" align="center" sortable="custom">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.nike_name" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.nike_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="180" align="center" sortable="custom">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.created_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近登录" width="180" align="center" sortable="custom">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.updated_time }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="90" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="small-padding fixed-width" label="操作" align="center" width="300">
        <template slot-scope="scope">
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
          <el-button type="danger" @click="handleDistrRole">禁用</el-button>
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
    <el-dialog title="分配角色" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from "@/api/permission";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        正常: "success",
        禁用: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      total: 1,
      list: null,
      listLoading: true,
      //默认模态框为false
      dialogVisible: false,
      //参数
      listQuery: {
        page: 1,
        limit: 20
      },
      //角色
      options: [
        {
          value: "超级管理员",
          label: "超级管理员"
        },
        {
          value: "用户",
          label: "用户"
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getUserList(this.listQuery).then(response => {
        const items = response.data.items;
        this.list = items.map(v => {
          this.$set(v, "edit", false);
          return v;
        });
        // 延时1.5秒
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleDistrRole() {
      this.dialogVisible = true;
    }
  }
};
</script>   
