<template>
	<div v-if="server" title="Server Information" class="panel panel-success">
		<div class="panel-heading">
			<div class="row">
				<div class="col-sm-1 icon-warning hidden-xs"><i class="fa fa-info-circle" aria-hidden="true"></i> </div>
				<p class="col-md-2 col-sm-3">Asset ID: <span @click="edit" class="bold" >{{server.asset_id}}</span></p> 
				<p class="col-md-3 col-sm-4">Name: <span @click="edit" class="bold" >{{server.name}}</span></p> 
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "ServerStore",
	data: function() { return { server: localStorage.server ? JSON.parse(localStorage.server) : false } },
	methods: { 
		edit(rowData) {
            this.$router.push({ name: 'ServerStore', params: { id: this.server.id }})
        }
	}
}
</script>
<style scoped>
	.bold{ font-weight: bold;  }
	.icon-warning{font-size: 25px; width: 35px;}
	.col-md-2, .col-md-3{padding-top: 7px;}
	.panel-heading{ padding: 5px 15px; }
	.panel-success{ border-bottom: none; }
	span{cursor: pointer;}
</style>