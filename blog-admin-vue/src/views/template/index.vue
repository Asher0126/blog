<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.status" placeholder="是否启用" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">启用/禁用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <detail :visible="visible" :dialog-status="dialogStatus" @close="handleClose"/>
  </div>
</template>

<script>
import { fetchList } from '@/api/template'
import waves from '@/directive/waves' // 点击按钮，按钮上的波纹
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Detail from './detail'

export default {
  name: 'ManageIndex',
  components: { Pagination, Detail },
  directives: { waves },
  data () {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        status: undefined
      },
      statusOptions: [{ id: 1, name: '启用' }, { id: 2, name: '禁用' }],
      dialogStatus: '',
      visible: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * 获取列表数据
     */
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      })
    },
    /**
     * 搜索数据
     */
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    /**
     * 修改状态：禁用和启用
     */
    handleModifyStatus (row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    /**
     * 展示添加dialog
     */
    handleCreate () {
      this.dialogStatus = 'create'
      this.visible = true
    },
    /**
     * 展示修改dialog
     */
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.visible = true
    },
    /**
     * 关闭dialog
     */
    handleClose () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
.app-container {
  .filter-container {
    margin-bottom: 12px;
  }
  .filter-item {
    margin-right: 5px;
  }
}
</style>
