<template>
  <aside class="sidebar norem" :class="{ 'open': showDrawer }">
    <GameLogo />
    <p class="tagline">
      Built with
      <a
        href="https://vuejs.org/"
        title="vuejs.org"
        target="_blank"
      >
        Vue3
      </a>
    </p>
    <button @click="toggleBasicStrategy" class="toggle">
      <svg version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve">
        <path v-if="showBasicStrategy" d="M18,1H6C3.3,1,1,3.3,1,6v12c0,2.8,2.3,5,5,5h12c2.8,0,5-2.3,5-5V6C23,3.3,20.8,1,18,1z M19.1,7.3l-8.5,11.1
          c-0.3,0.4-0.7,0.6-1.2,0.6c0,0,0,0,0,0c-0.5,0-0.9-0.2-1.2-0.6l-3.3-4.6c-0.5-0.7-0.3-1.6,0.3-2.1c0.7-0.5,1.6-0.3,2.1,0.3L9.4,15
          l7.3-9.5c0.5-0.7,1.4-0.8,2.1-0.3C19.5,5.7,19.6,6.7,19.1,7.3z"/>
        <path v-else d="M18,3c1.7,0,3,1.3,3,3v12c0,1.7-1.3,3-3,3H6c-1.7,0-3-1.3-3-3V6c0-1.7,1.3-3,3-3H18 M18,1H6C3.3,1,1,3.3,1,6v12
          c0,2.8,2.3,5,5,5h12c2.8,0,5-2.3,5-5V6C23,3.3,20.8,1,18,1L18,1z"/>
      </svg>
      Show Basic Strategy Hint
    </button>
    <span class="gotoPer" @click="gotoPerson">
      Personal Page 
    </span>
    <span class="return" @click="returnHome">
      Return 
    </span>
    <div class="footer">
      <p>
        Replication From:
        <a
          href="https://twitter.com/kevinleedrum"
          title="twitter"
          target="_blank"
        >
          Kevin Lee Drum
        </a>
      </p>
    </div>
  </aside>
</template>

<script setup>
import { game } from "@/stores/game"
import GameLogo from './GameLogo.vue'
import { computed } from "vue"
import router from "@/router"
import { Dialog } from "vant"

const gameStore = game()

const showDrawer = computed(() => gameStore.showDrawer)

const showBasicStrategy = computed(() => gameStore.showBasicStrategy)

const closeDrawer = () => {
  gameStore.toggleDrawer({ show: false })
}

const toggleBasicStrategy = () => {
  gameStore.toggleBasicStrategy()
}

const returnHome = () => {
  Dialog.confirm({
    title: 'warning',
    message: '确认要退出游戏吗？'
  }).then(() => {
    router.push({path: "/home"})
  }).catch(() => {
    Dialog.close
  });
}

const gotoPerson = () => {
  router.push({path: "/person"})
}
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex !important;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width:8rem;
  font-size: .4rem;
  color: $white;
  z-index: 100;
  background: $secondary-color;
  height: 100%;
  transition: transform 0.2s ease-in;
}
@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    transform: translateX(-8rem);
  }
  .sidebar.open {
    transform: translateX(0px);
  }
}

@media (min-width: 768px) {
  .sidebar {
    width: 350PX;
    position: absolute;
    transform: translateX(-350PX);
  }
  .sidebar.open {
    transform: translateX(0px);
  }
}

@media (min-width: 1900px) {
  .sidebar {
    width: 500PX;
    position: absolute;
    transform: translateX(0px);
    transform: translateX(-500PX);
  }
}
.tagline {
  text-transform: uppercase;
  letter-spacing: 0.06rem;
}
.sidebar #logo {
  width: 85%;
}
.sidebar p {
  margin: .4rem 0;
  text-align: center;
}
.sidebar p a {
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}
.sidebar p a:hover {
  border-color: $white;
}
.toggle {
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  color: #fff;
  cursor: pointer;
  padding: .4rem;
  opacity: 0.85;
  font-size: .5rem;
}
.toggle:hover {
  opacity: 1;
}
.toggle svg {
  height: 24px;
  width: 24px;
  padding-right: 8px;
}
.footer {
  position: absolute;
  bottom: 0;
  opacity: 0.85;
}

.return, .gotoPer{
  margin-top: .2rem;
  font-size: .5rem;
  text-decoration-line: underline;
  color: #fff;
  width: 85%;
  display: block;
  padding-left: .3rem;
}
</style>
