<template>
  <div>
      <div class="jumbotron">
        <h1>Maintenance mode</h1>
        <p>{{ message }}</p>

        <p v-if="retryAfter">We will be available at {{ willBeAvailableAt | moment("DD/MM/Y") }} {{ willBeAvailableAt | moment(" H:mm")}}</p>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Maintenance',
  created() {
      this.checkForMaintenance()
  },
  data() {
      return {
          message: '',
          retryAfter: '',
          willBeAvailableAt: '',
          wentDownAt: ''
      }
  },
  methods: {
    checkForMaintenance(event) {
        this.$http.get('maintenance')
        .then(response => {
            this.$router.go(-1)
        }, response => {
            this.message = response.body.error
            this.retryAfter = response.body.retryAfter
            this.willBeAvailableAt = response.body.willBeAvailableAt ? response.body.willBeAvailableAt.date : ''
            this.wentDownAt = response.body.wentDownAt ? response.body.wentDownAt.date : ''
        });
    }
  }
}
</script>
