<template>
	<div class="panel panel-default login">
	  <div class="panel-body">
	    <div class="page-header">
		 	<div class="row">
			  <div class="pull-left">
			  	<div class="form-group">
		 			<h1>{{$root.$data.system.acronym}} <br /> <small>{{$root.$data.system.description}}</small></h1>
		 		</div>
			  </div>
			  <div class="pull-right"><img class="logo" src="../../assets/logo.png"></div>
			  <div class="clearfix"></div>
			</div>
		</div>
		<form v-on:submit.prevent @submit="validate" >
			<field-validation :status="errors" :custom-errors="apiErrors" label="Username" field="username">
              <input v-validate="'required|min:8|max:8'" class="form-control" v-model="user.username" name="username" data-vv-as="Username" type="text" />             	
            </field-validation> 
            <field-validation :status="errors" :custom-errors="apiErrors" label="Password" field="password">
              <input v-validate="'required'" class="form-control" v-model="user.password" name="password" data-vv-as="Password" type="password" />
            </field-validation> 	
			<div class="form-group">
			    <button type="submit" class="btn btn-primary"><i class="fa fa-sign-in" aria-hidden="true"></i> Log In</button>
			</div>
		</form>
	  </div>
	</div>
</template>

<script src="./login.js"></script>
<style scoped src="./login.css"></style>
