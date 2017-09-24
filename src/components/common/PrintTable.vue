<template>
  <div class="btn-group">
	 <button title="Exportar dados" type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i class="fa fa-print" aria-hidden="true"></i>
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <li v-for="item in types">
        <a v-on:click.stop.prevent="print(item.value)">
          <i :class="item.icon" aria-hidden="true"></i> {{item.value}}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "print-table",
  data() {
    return {
      types:[
        { value: 'pdf', icon: 'fa fa-file-pdf-o' },
        { value: 'csv', icon: 'fa fa-file-text' },
        { value: 'xls', icon: 'fa fa-file-excel-o' },
        { value: 'xlsx', icon: 'fa fa-file-excel-o' },
      ]
    }
  },
  props: {
  	apiUrl: {
        type: String,
        required: true
    },
    fields: {
        type: Array,
        required: true
    },
    appendParams: Object,
    title: {
      type: String,
      default: 'Listagem'
    }
  },
  methods: {
  	print(extension){
      var retorno = {}, query =  '&' + jQuery.param(this.appendParams);
      this.fields.filter(i=>i.visible&&i.name.search('__slot')==-1).forEach(i=>{ 
        retorno[i.name] = i.title; 
      });

      var link = this.apiUrl + '/'+extension+'/'+ JSON.stringify(retorno)+'/'+JSON.stringify(this.title);
      link += '?token=' + localStorage.token.replace('Bearer ', '');

      var result = RegExp(/[\?\&]eager=.*?(?=\/)/g).exec(link);

      if (!result) {
        window.open(link + query);
        return;
      }

      link = link.replace(result[0],'') + '&' + result[0].slice(1); 
      window.open(link + query);
  	}
  }
}
	
</script>