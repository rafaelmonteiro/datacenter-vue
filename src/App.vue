<template>
  <div id="tudo">
    <ajax-intercept @finish="finish" ></ajax-intercept>
  	<top v-if="auth" />
	  <div class="container-fluid" id="body">
	     <transition name="fade" mode="out-in"><router-view></router-view></transition>
	  </div>
  </div>
</template>

<script>

import top from '@/components/top'
import ajaxIntercept from 'vue-ajax-intercept'

export default {
  name: 'app',
  computed: {
    auth(){
      return this.$root.$data.isAuthenticated;
    },
    system(){
      return this.$root.$data.system.name;
    }
  },
  methods: {
    finish(param){
      var data = {};

      try{
        data = JSON.parse(param.responseText);
      }
      catch(e){ }

      if (param.status == 401 && data.error != 'invalid_credentials') {
        this.$root.$refs.toastr.e("Session expired");
        this.$root.$data.isAuthenticated = false;
        localStorage.token = '';
        this.$router.push('/')
        return;
      }

      if (param.status == 403) {
        this.$router.push('/forbidden')
        return;
      }

      if (param.status == 503) {
        this.$router.push('/maintenance')
        return;
      }
    }
  },
  components: { top, ajaxIntercept }
}
</script>

<style>
#tudo{
  min-height: 100vh;
  position: relative;
}
.footer{
  height: 50px;
  width:100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
#body{
  padding-bottom: 50px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
.form-control{
  text-align: left !important;
}
</style>
