<template>
  <div>
    <form class="col-md-12" v-on:submit.prevent @submit="submit" >
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Brand</h3>
          </div>
          <div class="panel-body">
            <field-validation :status="errors" :custom-errors="apiErrors" label="Name" field="name">
              <input v-validate="'required|max:100'" class="form-control" v-model="brand.name" name="name" data-vv-as="name" type="text" />
            </field-validation> 
          </div>
          <div class="panel-footer">
              <button type="submit" class="btn btn-primary">
                  <span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Save
              </button>
              <button type="button" class="btn btn-default" @click="clear">
                  <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Clear
              </button>
              <router-link role="button" class="btn btn-default" :to="{ name: 'BrandList' }">
                  <i class="fa fa-undo" aria-hidden="true"></i> Back
              </router-link>
          </div>
        </div>
    </form>
  </div>
</template>

<script src="./store.js"></script>
