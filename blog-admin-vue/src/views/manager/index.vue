<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="名称" style="width: 200px;" class="filter-item" @change="handleFilter"/>
      <el-select v-model="listQuery.active" placeholder="是否启用" clearable style="width: 120px" class="filter-item" @change="handleFilter">
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
      <el-table-column label="登录名" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.active === 1" type="success">启用</el-tag>
          <el-tag v-else-if="scope.row.active === 0" type="danger">禁用</el-tag>
          <el-tag v-else type="success">未知状态</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at | parseTime('y-M-d h:m:s') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button v-if="scope.row.active === 1" size="mini" type="danger" @click="handleModifyStatus(scope.row, 0)">禁用</el-button>
          <el-button v-if="scope.row.active === 0" size="mini" type="success" @click="handleModifyStatus(scope.row, 1)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <detail :visible="visible" :dialog-status="dialogStatus" :id="id" @close="handleClose"/>
  </div>
</template>

<script>
import { getManagerList, activeManager } from '@/api/manager'
import waves from '@/directive/waves' // 点击按钮，按钮上的波纹
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Detail from './detail'
import { parseTime } from '@/utils/filters'

const statusOptions = [{ id: 1, name: '启用' }, { id: 0, name: '禁用' }]

export default {
  name: 'ManageIndex',
  components: { Pagination, Detail },
  directives: { waves },
  filters: { parseTime },
  data () {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        active: undefined
      },
      statusOptions,
      dialogStatus: '',
      visible: false,
      id: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * 获取列表数据
     */
    async getList () {
      // 1. 设置loading状态
      this.listLoading = true

      // 2. 获取数据
      const result = await getManagerList(this.listQuery)

      // 3. 得到数据并赋值
      this.list = result.data
      this.total = result.total

      // 4. 取消loading状态
      this.listLoading = false
    },
    /**
     * 搜索数据
     */
    handleFilter () {
      console.log('handleFilter', this.listQuery)
      this.listQuery.page = 1
      this.getList()
    },
    /**
     * 修改状态：禁用和启用
     */
    async handleModifyStatus (row, active) {
      // 禁用
      if (active === 0) {
        this.$confirm('确定要禁用？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await activeManager({ id: row.id, active })
          this.$message.success('操作成功')
          // 此处做了优化，不再重新请求list
          row.active = 0
        })
      } else {
        await activeManager({ id: row.id, active })
        this.$message.success('操作成功')
        // 此处做了优化，不再重新请求list
        row.active = 1
      }
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
      this.id = row.id
      this.dialogStatus = 'update'
      this.visible = true
    },
    /**
     * 关闭dialog
     */
    handleClose (val) {
      this.visible = false

      if (val) this.getList()
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
