<template></template>

<script>
import { getToken } from '@/utils/auth'
export default {
  created() {
    this.redirLogin();
  },
  methods: {
    redirLogin() {
      if(getToken() == null){
        window.location.href='http://cas.client1.com:9100/user/redirectLogin'
      }
    }
  }
};
</script>