<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="客户端名字"  clearable> <i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button
        class="filter-item"
        type="primary"
        @click="dialogFormVisible = true"
        icon="el-icon-edit"
      >添加</el-button>
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
      <el-table-column label="客户端名" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.name" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户端链接" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.serivceId" class="edit-input" size="small"/>
          </template>
          <span v-else>{{ scope.row.serivceId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="dialogVisible = true">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加客户端" :visible.sync="dialogFormVisible" >
      <el-form :model="form" ref="dataForm" :rules="rules" label-width="70px" style="width: 80%; margin-left:50px;">
        <el-form-item label="客户端名:" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" width="50%"  clearable></el-input>
        </el-form-item>
        <el-form-item label="客户端连接" :label-width="formLabelWidth" prop="link">
           <el-input v-model="form.link" autocomplete="off"  width="50%"  clearable><template slot="prepend">^(https|imaps|http):</template><template slot="append">.*</template></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>

</style>
<script>
import { getCasList,addCasClient } from "@/api/cas.js";
export default {
  data() {
    return {
      total: 1,
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
          name: '',
          link: ''       
        },
        rules: {
        name: [{ required: true, message: '此项必须填写', trigger: 'blur' }],
        link: [{ required: true, message: '此项必须填写', trigger: 'blur' }]
      },
    };
  },
  
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getCasList(this.listQuery).then(response => {
        const items = response.data.items;
        this.list = items.map(v => {
          return v;
        });
        // 延时1.5秒
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    createData() {
          addCasClient(this.form).then(() => { 
            this.list.unshift(this.form)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
    },
  }
};
</script>