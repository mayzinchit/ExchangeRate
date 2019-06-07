Vue.component('datepicker', {
    name: 'datepicker',
    template: `
    <div ref="date" class="ui action input">
        <button class="ui icon button" data-toggle>
            <i class="calendar icon"></i>
        </button>
        <input type="text" :name="name" :placeholder="placeholder" :readonly="readonly" @change="selectedRate($event.target.value)" data-input/>
        <button class="ui inverted icon button" :disabled="!value" data-clear>
            <i class="remove red icon"></i>
        </button>
    </div>`,
    props: {
        name: String,
        value: {
            require: true
        },
        placeholder: String,
        readonly: Boolean
    },
    date() {
        return {
          datepicker: null
        }
    },
    mounted() {
        if (!this.datepicker) {
          this.datepicker = flatpickr('.ui.input', {
            // altInput: true,
            altFormat: "F j, Y",
            dateFormat: "d-m-Y",
            wrap: true
          })
        }
    },
    destroyed() {
        this.datepicker.destroy()
        this.datepicker = null
    },
    methods:{
        selectedRate(target){
            this.$emit('input',target);
            console.log('http://forex.cbm.gov.mm/api/history/' + this.value);
            axios.get('https://cors-anywhere.herokuapp.com/' + 'http://forex.cbm.gov.mm/api/history/' + target).then(({data}) => {
                vm.info = data;
                console.log(vm.info);
            });
        }
    }
});

var vm = new Vue({
    el: "#root",
    data:{
        date:new Date().toISOString().substr(0, 10),
        info: [],
        keep: []
    },
    created(){
        axios.get('https://cors-anywhere.herokuapp.com/' + 'http://forex.cbm.gov.mm/api/latest').then(({data}) => {
                this.info = data;
                // console.log(this.info);
        });
        axios.get('https://cors-anywhere.herokuapp.com/' + 'http://forex.cbm.gov.mm/api/currencies').then(({data}) => {
                this.keep = data;
                // console.log(this.keep);
        });
    }
});
