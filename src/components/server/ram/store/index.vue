<template>
  <div>
    <form v-on:submit.prevent @submit="submit" >
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">{{ isUpdate ? 'Edit' : 'Insert' }} RAM</h3>
          </div>
          <div class="panel-body">
            <field-validation cssClass="col-md-2" :status="errors" :custom-errors="apiErrors" label="RAM" field="ram.id">
              <select v-validate="'required'" class="form-control" v-model="ram.id" name="ram.id" data-vv-as="type">
                <option v-for="option in rams" v-bind:value="option.id">{{ option.type }} - {{ option.size }}GB</option>
              </select>
            </field-validation>
          </div>
          <div class="panel-footer">
              <button type="submit" class="btn btn-primary">
                  <span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Save
              </button>             
          </div>
        </div>
    </form>
  </div>
</template>

<script src="./store.js"></script>
