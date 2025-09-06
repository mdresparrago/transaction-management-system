<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header-modern">
      <q-toolbar>
        <q-toolbar-title
          class="flex flex-center text-white text-h5 text-bold"
          :style="$q.screen.gt.sm ? 'font-size: 24px;' : 'font-size: 18px;'"
        >
          TRANSACTION MANAGEMENT SYSTEM
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <transition name="fade">
      <div v-if="showWelcome" class="welcome-screen-modern">
        <div class="welcome-card-modern q-pa-xl">
          <q-spinner-gears size="50px" color="primary" />
          <div class="text-h5 text-primary q-mt-md">Welcome to Transaction Manager</div>
        </div>
      </div>
    </transition>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {},

  data() {
    return {}
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
  },
})
</script>

<style scoped>
.header-modern {
  background: linear-gradient(135deg, #7b90ee 0%, #60afff 100%) !important;
  color: #fff;
}

.header-modern .q-toolbar {
  padding: 0 24px;
}

.header-modern .q-toolbar-title {
  font-weight: 600;
  letter-spacing: 1px;
}
</style>
