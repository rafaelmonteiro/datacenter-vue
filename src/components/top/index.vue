<template>
<div>
	<nav class="navbar navbar-default header">
	  <div class="container-fluid">
	    <div v-show="brand" class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <router-link class="navbar-brand" :to="{ name: brand.name }">{{brand.menu.label}}</router-link>
	    </div>

	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    		<item-menu v-if="left.length" :items="left" css="nav navbar-nav" />	

    		<div v-if="routes.length" class="navbar-form navbar-left">
    			<div class="input-group">
    				<v-select placeholder="Find on menu" :on-change="search" :options="options"></v-select>
			    </div>
		    </div>

		    <item-menu v-if="right.length" :items="right" css="nav navbar-nav navbar-right" />	
	    </div>
	  </div>
	</nav>
	<breadcrumb :items="breadcrumb" />
</div>
</template>

<script src="./top.js"></script>
<style scoped src="./top.css"></style>
