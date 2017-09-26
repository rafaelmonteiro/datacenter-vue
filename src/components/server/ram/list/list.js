import datatable from '@/components/common/DataTable'
import currentServer from '@/components/server/selected'
import editRam from '@/components/server/ram/store'

export default {
    name: "RamList",
    data: function() {
        return {
            apiUrl: "api/servers/" + this.$route.params.id + "/rams",
            ram: {
                type: null,
                server_id: this.$route.params.id,
                size: null
            },
            fields: [
                  {
                    name: 'id',
                    title: 'ID',
                    titleClass: 'col-md-3',
                    filterable: true,
                  },
                  {
                    name: 'type',
                    title: 'Type',
                    titleClass: 'col-md-3',
                    filterable: true
                  },
                  {
                    name: 'size',
                    title: 'Size',
                    titleClass: 'col-md-3',
                    filterable: true
                  },                  
                  {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'text-center col-md-2',
                    dataClass: 'text-center',
                    showOnVisibilityMenu: false
                  }
            ],
            server: {
                id: this.$route.params.id
            }
        }
    },
    methods: {
        search() {
            this.$refs.vuetable.refresh()
        },
        show(rowData) {
          this.ram = JSON.parse(JSON.stringify(rowData));
          window.scrollTo(0,0);
        },
        remove(rowData) {
            this.$root.$refs.modal.confirm('Do you want to remove RAM \'' + rowData.id + '\' ?', {
              yes: () => {
                this.$http.delete('api/servers/' + this.$route.params.id + '/rams/' + rowData.id)
                .then(response => {
                    this.$root.$refs.toastr.s("RAM module successfully removed");
                    this.search();
                }, response => {
                    this.$root.$refs.toastr.e(response.body.errors);
                });
              }
            });
        },
    },
    components: { datatable, editRam, currentServer }
}
