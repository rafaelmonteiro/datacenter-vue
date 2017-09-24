<template>
  <div id="form-message">
      <div v-if="message != null" class="alert alert-success" role="alert">
          <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> {{ message }}
      </div>
  </div>
</template>
<script>
export default {
  name: "form-message",
  props: {
      message: String
  }
}
</script>
