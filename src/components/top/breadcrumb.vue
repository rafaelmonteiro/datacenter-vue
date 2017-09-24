<template>
	<ol class="breadcrumb">
	  <li>{{$root.$data.system.acronym}}</li>
	  <li v-for="item in items" v-bind:class="{ active: item.active }">
	  	<router-link v-if="!item.active" :to="{ name: item.link }">{{ item.label }}</router-link>
	  	<span v-else>{{ item.label }}</span>
  	  </li>
	</ol>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: {
  	items: {
      type: Array,
      required: true
    }
  }
}
</script>
