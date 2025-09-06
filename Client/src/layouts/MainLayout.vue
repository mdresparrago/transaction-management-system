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
      <div v-if="showWelcome" class="welcome-screen">
        <div class="welcome-card-modern q-pa-xl">
          <q-spinner-gears size="50px" color="deep-purple-5" />
          <div class="text-h5 text-deep-purple-5 q-mt-md">Welcome to Transaction Manager</div>
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

  data() {
    return {
      showWelcome: true,
    }
  },

  mounted() {
    setTimeout(() => {
      this.showWelcome = false
    }, 1000)
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

.welcome-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(123, 144, 238, 0.95) 0%, rgba(96, 175, 255, 0.95) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.welcome-card-modern {
  background: rgba(255, 255, 255, 0.729);
  backdrop-filter: blur(30px);
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
