<template>
  <v-app>
    <main>
      <v-content>
        <v-fade-transition>
          <router-view></router-view>
        </v-fade-transition>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Vue App root'
      }
    }
  }

</script>
