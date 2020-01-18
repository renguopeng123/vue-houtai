<template>
  <div class="home-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminHome from './admin'
import userHome from './editor'

export default {
  name: 'Home',
  components: { adminHome, userHome },
  data() {
    return {
      currentRole: 'adminHome'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('ROLE_ADMIN')) {
      this.currentRole = 'userHome'
    }
  }
}
</script>
