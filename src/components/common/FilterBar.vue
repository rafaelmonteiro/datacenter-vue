<template lang="html">
    <div class="filterBar">
      <div class="form-inline">
        <div class="input-group">
            <select v-if="filterableFields.length > 1" class="form-control" v-model="fieldName">
                <option v-for="field in filterableFields" :value="field.name">{{ field.title ? field.title : field.name | capitalize }}</option>
            </select>
            <input type="text" v-model="filterText" class="form-control" @keyup.enter="!filtered ? filter() : clear()" placeholder="Filter">
            <div class="input-group-btn">
                <button v-if="!filtered" class="btn btn-default" @click="filter"><span class="glyphicon glyphicon-search"></span></button>
                <button v-else class="btn btn-default" @click="clear"><span class="glyphicon glyphicon-remove"></span></button>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    data () {
      return {
        filterText: '',
        fieldName: '',
        filtered: false
      }
    },
    props: {
        fields: Array
    },
    computed: {
        filterableFields() {
            return this.fields.filter(field => field.filterable)
        }
    },
    mounted() {
        this.fieldName = this.filterableFields[0].name
    },
    methods: {
        filter() {
            this.$events.fire('filter-set', [ this.filterText, this.fieldName ])
            this.filtered = true
        },
        clear() {
            this.filterText = ''
            this.filtered = false
            this.$events.fire('filter-reset', this.fieldName)
        }
    },
    filters: {
        capitalize: function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
}
</script>

<style scoped>
.filterBar select{ width: auto !important }
.filterBar .input-group{ display: block}
.filterBar input{ width: auto !important }
</style>
