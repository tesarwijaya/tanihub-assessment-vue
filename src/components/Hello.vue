<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm4 offset-sm4>
        <v-card>
          <v-card-title primary-title>
            <h3 class="headline mb-0">Login Credential</h3>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Username"
                v-model="username"
                :disabled="onLoad"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                :disabled="onLoad"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :loading="onLoad"
              :disabled="onLoad"
              flat
              color="orange"
              @click="login()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      top
      :timeout="6000"
      v-model="snackbar"
    >
      {{ message }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { login as loginRequest } from '../request/authentication'
import { setOauthInfo } from '../localStorage'

export default {
  name: 'hello',
  methods: {
    login: function () {
      this.onLoad = true
      let vm = this
      loginRequest(this.username, this.password)
        .then(response => {
          setOauthInfo(response.data)
          vm.$router.push({ name: 'dashboard' })
          vm.onLoad = false
        })
        .catch(function (error) {
          vm.onLoad = false
          if (error.response) {
            vm.message = error.response.data.message
            vm.snackbar = true
          } else {
            console.log(error)
          }
        })
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      onLoad: false,
      username: '',
      password: '',
      snackbar: false,
      message: ''
    }
  }
}
</script>
