<template>
  <div class="app-container">
    <div style="margin-top:30px;">
      <div>
        <span v-permission="['ROLE_ADMIN']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">ROLE_ADMIN</el-tag> can see this
        </span>
        <el-tag v-permission="['ROLE_ADMIN']" class="permission-sourceCode" type="info">
          v-permission="['ROLE_ADMIN']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['ROLE_USER']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">ROLE_USER</el-tag> can see this
        </span>
        <el-tag v-permission="['ROLE_USER']" class="permission-sourceCode" type="info">
          v-permission="['ROLE_USER']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['ROLE_ADMIN','ROLE_USER']" class="permission-alert">
          Both
          <el-tag class="permission-tag" size="small">ROLE_ADMIN</el-tag> and
          <el-tag class="permission-tag" size="small">ROLE_USER</el-tag> can see this
        </span>
        <el-tag v-permission="['ROLE_ADMIN','ROLE_USER']" class="permission-sourceCode" type="info">
          v-permission="['ROLE_ADMIN','ROLE_USER']"
        </el-tag>
      </div>
    </div>

    <div style="margin-top:60px;">
      <code>
        {{ $t('permission.tips') }}
        <br> e.g.
      </code>

      <el-tabs type="border-card" style="width:550px;">
        <el-tab-pane v-if="checkPermission(['ROLE_ADMIN'])" label="ROLE_ADMIN">
          ROLE_ADMIN can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['ROLE_ADMIN'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['ROLE_USER'])" label="ROLE_USER">
          ROLE_USER can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['ROLE_USER'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['ROLE_ADMIN','ROLE_USER'])" label="Admin-OR-USER">
          Both ROLE_ADMIN or ROLE_USER can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['ROLE_ADMIN','ROLE_USER'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import permission from '@/directive/permission/index.js' // 权限判断指令
  import checkPermission from '@/utils/permission' // 权限判断函数

  export default {
    name: 'DirectivePermission',
    components: {},
    directives: {
      permission
    },
    data() {
      return {
      }
    },
    methods: {
      checkPermission
    }
  }
</script>

<style lang="scss" scoped>
  .app-container {
    /deep/ .permission-alert {
      width: 320px;
      margin-top: 15px;
      background-color: #f0f9eb;
      color: #67c23a;
      padding: 8px 16px;
      border-radius: 4px;
      display: inline-block;
    }

    /deep/ .permission-sourceCode {
      margin-left: 15px;
    }

    /deep/ .permission-tag {
      background-color: #ecf5ff;
    }
  }
</style>