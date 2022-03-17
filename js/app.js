import {methods} from './methods.js';

const lessonsApp = {
    el: '#app',
    data: {
        lessons: {
            data: [],
            error: {message: null},
            loading: false,
        },
        cart: [],
        isCartOpen: false,
        isSuccessOrder: false,
        formState: {
            phoneItem: "",
            nameItem: "",
            valid: true,
        }
    },

    async mounted() {
        await Promise.all([
            fetch('https://coursework-init-cst3145.herokuapp.com/lessons', {method: 'GET'}),
            fetch('https://coursework-init-cst3145.herokuapp.com/orders', {method: 'GET'})
        ]).then(async data => {
            const [lessons, orders] = data;
            const lessonsResult = await lessons.json();
            const ordersResult = await orders.json();

            if (lessonsResult.lessons.length >= 0) {
                this.lessons = {
                    data: lessonsResult.lessons,
                    error: {message: null},
                    loading: false
                }
            } else {
                this.lessons = {
                    data: [],
                    error: {message: 'No items in db'},
                    loading: false
                }
            }
            this.cart = ordersResult;
        })

    },

    updated() {
        const {nameItem, phoneItem} = this.formState

        const isTextValue = /^[a-zA-Z]+$/.test(nameItem);
        const isNumberValue = /^[1-9]+$/.test(phoneItem);

        if (isTextValue && isNumberValue) this.formState.valid = false
        else this.formState.valid = true
    },
    methods,
}

export default lessonsApp;