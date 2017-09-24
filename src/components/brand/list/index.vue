<template>
	<div>
		<form v-on:submit.prevent @submit="search" >
	        <div class="panel panel-default">
	          <div class="panel-heading">
	            <h3 class="panel-title">Search</h3>
	          </div>
	          <div class="panel-body">	         
	            <div class="row">
	            	<div class="col-md-2 form-group">
					    <label>Name</label>
					    <input type="text" v-model="brand.name" class="form-control">
					</div>
	            </div>
	          </div>
	          <div class="panel-footer">
	              <button type="submit" class="btn btn-primary">
	                  <i class="fa fa-search" aria-hidden="true"></i> Search
	              </button>
	              <button type="button" class="btn btn-default" title="Clear" @click="clear">
	                  <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Clear
	              </button>          
	          </div>
	        </div>
	    </form>
	    <datatable ref="vuetable" :show-empty="true" title="List" api-url="api/brands" :append-params="brand"
	      :fields="fields">
	      <template slot="actions">
	        <router-link class="btn btn-default" :to="{ name: 'BrandNew' }">
	          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> New
	        </router-link>
	      </template>
	      <template slot="rowrender" scope="props">
	      	  <button title="Edit" type="button" class="btn btn-primary" @click="edit(props.rowData)">
	            <span class="glyphicon glyphicon-edit"></span> <span class="visible-lg-inline">Edit</span>
	          </button>  
			  <button title="Delete" class="btn btn-danger" @click="remove(props.rowData)">
			  	<span class="glyphicon glyphicon-trash"></span> <span class="visible-lg-inline">Delete</span>
			  </button>
	      </template>
	    </datatable>
	</div>
</template>

<script src="./list.js"></script>