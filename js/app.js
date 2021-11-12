import { lessons } from "./data.js";
import methods from './methods.js';

const lessonsApp = {
  el: '#app',
  data: {
    lessons,
    cart: [],
    isCartOpen: false,
    formState: {
      textValue: true,
      numValue: false
    }
  },
  methods,
  computed: {}
}

export default lessonsApp;
