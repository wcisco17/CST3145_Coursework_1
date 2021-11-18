import computed from './computed.js';
import { lessons } from "./data.js";
import methods from './methods.js';

const lessonsApp = {
  el: '#app',
  data: {
    lessons,
    cart: [],
    isCartOpen: false,
    isSuccessOrder: false,
    search: '',
    selected: '',
    order: 'Ascending',
    values: ['all', 'subject', 'location', 'price', 'availibility'],
    formState: {
      phoneItem: "",
      nameItem: "",
      valid: true,
    }
  },

  updated() {
    const { nameItem, phoneItem } = this.formState

    const isTextValue = /^[a-zA-Z]+$/.test(nameItem);
    const isNumberValue = /^[1-9]+$/.test(phoneItem);

    if (isTextValue && isNumberValue) this.formState.valid = false
    else
      this.formState.valid = true
  },
  methods,
  computed
}

export default lessonsApp;
