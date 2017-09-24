import datatable from '@/components/common/DataTable'

export default {
	name: "ServerList",
	data: function() {
        return {
            server: {
                asset_id: null,
                name: null,
                price: null
            },
            apiErrors: null,
            fields: [
                  {
                    name: 'id',
                    title: 'ID',
                    titleClass: 'col-md-1',
                    filterable: true,
                  },
                  {
                    name: 'asset_id',
                    title: 'Asset',
                    titleClass: 'col-md-1',
                    filterable: true
                  },
                  {
                    name: 'brand.name',
                    title: 'Brand',
                    titleClass: 'col-md-2',
                    filterable: true
                  },
                  {
                    name: 'name',
                    title: 'Name',
                    titleClass: 'col-md-3',
                    filterable: true
                  },                  
                  {
                    name: 'price',
                    title: 'Price',
                    titleClass: 'col-md-2',
                    callback: item => parseFloat(item).toReal(),
                    filterable: true
                  },                  
                  {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'text-center col-md-3',
                    dataClass: 'text-center'
                  }
            ]
        }
    },
    created() {
        localStorage.server = '';
    },
    methods: {
        loader(url, property, params){
            this.$http.get(url, params)
            .then(response => {
              this[property] = response.body; 
            }, response => {
              this.apiErrors = response.body
            });
        },
        search() {
            this.$refs.vuetable.refresh()
        },
        edit(rowData) {
            this.$router.push({ name: 'ServerEdit', params: { id: rowData.id }})
        },
        remove(rowData) {
            this.$root.$refs.modal.confirm('Do you want to remove the item ' + rowData.name + '?', {
              yes: () => {
                this.$http.delete('api/servers/' + rowData.id)
                .then(response => {
                    this.$root.$refs.toastr.s("Server removed successfully");
                    this.search();
                }, response => {
                    this.$root.$refs.toastr.e(response.body.errors);
                });
              }
            });
        },
        clear(){
            Object.keys(this.server).forEach(key=>{ 
                if(typeof(this.server[key]) == 'string'){
                    this.server[key] = '';
                    return;
                } 

                if(typeof(this.server[key]) == 'number'){
                    this.server[key] = null;
                } 
            });

            this.errors.clear();
            this.apiErrors = null;
            this.search();
        }
    },
    components: { datatable }
}