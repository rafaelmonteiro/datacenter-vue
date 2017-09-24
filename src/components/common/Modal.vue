<template>
    <div id="modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">{{config.title}}</h4>
                </div>
                <div class="modal-body">
                    <p>{{message}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="yes()" class="btn btn-primary">{{config.labelYes}}</button>
                    <button type="button" @click="no()" class="btn btn-default" data-dismiss="modal">{{config.labelNo}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal",
    data() {
        return {
            message: '',
            config: {}
        }
    },
    methods: {
        confirm(message, config = {}) {
            this.message = message
            config.title = config.title ? config.title : 'Warning' 
            config.labelYes = config.labelYes ? config.labelYes : 'Yes' 
            config.labelNo = config.labelNo ? config.labelNo : 'No' 
            
            this.config = config;
            jQuery('#modal').modal('show');
        },
        yes(){
            jQuery('#modal').modal('hide');
            if (this.config.yes) { this.config.yes(); }
        },
        no(){
            if (this.config.no) { this.config.no(); }
        }
    }
}
</script>
