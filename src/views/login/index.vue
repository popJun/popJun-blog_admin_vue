<template>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getDevUrl } from '@/dev/devConfig'
export default {
  created() {
    this.redirLogin();
  },
  methods: {
    redirLogin() {
      if(getToken() == null){
        window.location.href=getDevUrl()+'/user/redirectLogin'
      }else{
        this.$router.push({ path: this.redirect || '/' })

      }
    }
  }
};
</script>