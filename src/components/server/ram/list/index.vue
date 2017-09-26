<template>
  <div>
  	<current-server></current-server>
  	
    <edit-ram :ram="ram" @change="search" />

    <datatable ref="vuetable" title="RAM" :api-url="apiUrl" :append-params="server" :fields="fields">
      <template slot="rowrender" scope="props">
          <button class="btn btn-danger" @click="remove(props.rowData)"><span class="glyphicon glyphicon-trash"></span> Delete</button>
      </template>
    </datatable>
  </div>
</template>

<script src="./list.js"></script>
