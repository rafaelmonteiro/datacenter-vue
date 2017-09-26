<template>
  <div>
    <form class="col-md-12" v-on:submit.prevent @submit="submit" >
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Server</h3>
          </div>
          <div class="panel-body">
            <field-validation cssClass="col-md-2" :status="errors" :custom-errors="apiErrors" label="Asset" field="asset_id">
              <input v-validate="'required'" class="form-control" v-model="server.asset_id" name="asset_id" data-vv-as="asset" type="text" />
            </field-validation> 
            <field-validation cssClass="col-md-3" :status="errors" :custom-errors="apiErrors" label="Name" field="name">
              <input v-validate="'required|max:100'" class="form-control" v-model="server.name" name="name" data-vv-as="name" type="text" />
            </field-validation> 
            <field-validation cssClass="col-md-2" :status="errors" :custom-errors="apiErrors" label="Price" field="price">
              <money v-validate="'required'" class="form-control" v-model="server.price" name="price"></money>
            </field-validation> 
            <field-validation cssClass="col-md-3" :status="errors" :custom-errors="apiErrors" label="Brand" field="brand_id">
              <select class="form-control" v-model="server.brand_id" name="server.brand_id" data-vv-as="brand">
                <option v-for="option in brands" v-bind:value="option.id">{{ option.name }}</option>
              </select>
            </field-validation>
            <field-validation cssClass="col-md-2" :status="errors" :custom-errors="apiErrors" v-if="!isUpdate" label="RAM" field="ram_id">
              <select class="form-control" v-model="server.ram_id" name="server.ram_id" data-vv-as="type">
                <option v-for="option in rams" v-bind:value="option.id">{{ option.type }} - {{ option.size }}GB</option>
              </select>
            </field-validation> 
             <div v-show="isUpdate">
                <div class="col-md-2" title="Insert RAM modules">
                  <label>&nbsp;</label>
                  <router-link class="btn btn-default btn-block" :to="{ path: '/servers/' + server.id + '/ram' }">
                    <i class="fa fa-file-text-o" aria-hidden="true"></i> RAM
                  </router-link>
                </div> 
              </div>
          </div>
          <div class="panel-footer">
              <button type="submit" class="btn btn-primary">
                  <span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Save
              </button>
              <button type="button" class="btn btn-default" @click="clear">
                  <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Clear
              </button>
              <router-link role="button" class="btn btn-default" :to="{ name: 'ServerList' }">
                  <i class="fa fa-undo" aria-hidden="true"></i> Back
              </router-link>
          </div>
        </div>
    </form>
  </div>
</template>

<script src="./store.js"></script>
