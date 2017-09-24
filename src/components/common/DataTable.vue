<template>
  <div>
    <div v-if="!totalRows && showEmpty" class="panel panel-default">
      <div v-if="!!title" class="panel-heading">
        <h3 class="panel-title">{{title}}</h3>
      </div>
      <div class="panel-body">No results found</div>
    </div>
    <div v-show="totalRows" class="panel panel-default">
      <div v-if="!!title" class="panel-heading">
        <h3 class="panel-title">{{title}}</h3>
      </div>
      <div class="panel-body">
        <!-- <print-table :title="title" :fields="fieldsDefinition" :api-url="restUrl" :append-params="params" class="pull-right hidden-xs"></print-table> -->
        <div class="actions pull-left"><slot name="actions"></slot></div>
        <filter-bar :fields="fieldsDefinition" class="pull-right" v-if="useFilter"></filter-bar>
        <column-visible :fields.sync="fieldsDefinition" class="pull-right hidden-xs"></column-visible>
        

        <vuetable ref="vuetable"
            :api-url="restUrl"
            :api-mode="true"
            :fields="fieldsDefinition"
            :css="css.table"
            :data-path="dataPath"
            :data="data"
            :http-options="auth"
            :pagination-path="paginationPath"
            :per-page="itemsPerPage"
            :append-params="params"
            :muti-sort="multiSort"
            :multi-sort-key="multiSortKey"
            @vuetable:pagination-data="onPaginationData"
            @vuetable:load-success="onSuccess">
            <template slot="actions" scope="props">
              <slot name="rowrender" :rowData="props.rowData"></slot>
            </template>
        </vuetable>
      </div>

      <div class="panel-footer">
        <pagination-info ref="paginationInfo"
            :css="css.paginationInfo"
            class="pull-left">
        </pagination-info>

        <pagination ref="pagination"
            :css="css.pagination"
            :icons="css.icons"
            @vuetable-pagination:change-page="onChangePage">
        </pagination>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>

import Vue from 'vue'
import vuetable from 'vuetable-2/src/components/Vuetable'
import pagination from 'vuetable-2/src/components/VuetablePagination'
import paginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import filterBar from '@/components/common/FilterBar'
import columnVisible from '@/components/common/ColumnVisible'
import printTable from '@/components/common/PrintTable'
import vueEvents from 'vue-events'
Vue.use(vueEvents)

export default {
  name: "data-table",
  components: { vuetable, printTable, pagination, paginationInfo, filterBar, columnVisible },
  data() {
    return {
      fieldsDefinition: this.fields,
      totalRows: 0
    }
  },
  props: {
    refresh: {
      type: Function,
      default(){ this.$refs.vuetable.refresh() }
    },
    useFilter: {
        type: Boolean,
        default: true
    },
    title: String,
    apiUrl: String,
    apiMode: {
        type: Boolean,
        default: true
    },
    showEmpty: {
        type: Boolean,
        default: false
    },
    reference: String,
    appendParams: Object,
    fields: Array,
    multiSort: {
        type: Boolean,
        default: true
    },
    multiSortKey: {
        type: String,
        default: 'ctrl'
    },
    dataPath: {
        type: String,
        default: "data"
    },
    data: {
        type: Array,
        required: false
    },
    paginationPath: {
        type: String,
        default: ""
    },
    css: {
      type: Object,
      default: function () {
        return {
            table: {
              tableClass: 'col-md-12 col-xs-12 table table-striped table-hover',
              ascendingIcon: 'glyphicon glyphicon-chevron-up',
              descendingIcon: 'glyphicon glyphicon-chevron-down'
            },
            pagination: {
              wrapperClass: 'pagination pull-right',
              activeClass: 'btn-primary',
              disabledClass: 'disabled',
              pageClass: 'btn btn-border',
              linkClass: 'btn btn-border',
              icons: {
                first: 'glyphicon glyphicon-step-backward',
                prev: 'glyphicon glyphicon-chevron-left',
                next: 'glyphicon glyphicon-chevron-right',
                last: 'glyphicon glyphicon-step-forward',
              }
            }
        }
      }
    },
    itemsPerPage: {
        type: Number,
        default: 20
    }
  },
  computed: {
    restUrl() { return this.$http.options.root +'/'+this.apiUrl },
    auth() { return { 'headers': { 'Authorization': localStorage.token } }},
    params() { return this.appendParams }
  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page)
    },
    onSuccess(response){
      this.totalRows = response.data.total;
    },
    onFilterSet (filterParams) {
        let filterText = filterParams[0]
        let fieldName = filterParams[1]

        if (! filterText || ! fieldName) return

        this.appendParams[fieldName] = filterText;
        Vue.nextTick( () => this.$refs.vuetable.refresh())
    },
    onFilterReset (fieldName) {
        this.appendParams[fieldName] = '';
        Vue.nextTick( () => this.$refs.vuetable.refresh())
    },
    onColumnVisibilityChanged () {
        this.$refs.vuetable.normalizeFields()
    },
  },
  mounted() {
    this.$events.$on('filter-set', e => this.onFilterSet(e))
    this.$events.$on('filter-reset', e => this.onFilterReset(e))
    this.$events.$on('column-visibility:changed', e => this.onColumnVisibilityChanged(e))
  },
}
</script>
<style scoped>
.pagination {
  margin: 0;
}
.btn.btn-border {
  border: 1px solid;
  margin-right: 2px;
}
.vuetable-pagination-info {
  margin-top: 8px !important;
}
.actions{ margin-bottom: 4px;  }
</style>
