<template>
  <!-- Begin Modal -->
  <div class="modal" :class="isCartOpen ? 'is-active' : ''">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Shopping Cart</p>
        <button @click="navigateToCart()" class="delete" aria-label="close"></button>
      </header>

      <section class="modal-card-body">

        <!-- Start - Checkout Items -->
        <div class="container">
          <form @submit="$emit('submit-form', $event)">

            <div class="field-header">
              <h5 class="title is-5 py-4">Your info</h5>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                    v-model="nameHere"
                    class="input" type="text"
                    placeholder="Name">
              </p>

            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                    v-model="phoneHere"
                    class="input"
                    type="number"
                    placeholder="Phone">
              </p>
            </div>
            <button type="submit" :disabled="valid" class="button py-4 is-info">
              Checkout
            </button>
          </form>
        </div>
        <!-- End - Checkout Items -->

        <!-- Start - Cart items -->
        <div class="container my-5">
          <div v-for="cartItems in cart" v-bind:key="cartItems.id" class="main-cart-container">
            <div class="box-left">
              <div class="main-cart-container_image">
                <figure class="image is-128x128">
                  <img alt="..." :src="'https://coursework-init-cst3145.herokuapp.com/static/' + cartItems.url">
                </figure>
              </div>
              <div class="main-cart-container_item">
                <h5 class="title is-5">Subject: {{ cartItems.subject }}</h5>
                <h6 class="">Price: {{ cartItems.price }}</h6>
                <h6 class="has-text-weight-bold">Quantity: {{ cartItems.availibility - cartItems.quantity }}</h6>
                <h6 class="">Location: {{ cartItems.location }}</h6>
              </div>
            </div>
            <div>
              <p style="cursor: pointer;" @click="$emit('remove-lessons',cartItems._id)">Remove from cart</p>
            </div>
          </div>
        </div>
        <!-- End - Cart items -->


      </section>
      <footer class="modal-card-foot">
        <button @click="navigateToCart()" class="button is-dark">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  // emits: ['update:nameItem', 'update:phoneItem'],
  props: {
    nameItem: {
      type: String,
      default: ""
    },
    phoneItem: {
      type: String,
      default: ""
    },
    cart: {
      type: new Array(),
      default: []
    },
    isCartOpen: {
      type: Boolean,
      default: false,
    },
    navigateToCart: {
      type: Function,
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    nameHere: {
      get() {
        return this.nameItem
      },
      set(value) {
        this.$emit('bindNameItem', value)
      }
    },
    phoneHere: {
      get() {
        return this.phoneItem
      },
      set(value) {
        this.$emit('bindPhoneItem', value)
      }
    }
  },
}
</script>

<style scoped>
.main-cart-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-left {
  display: flex;
  align-items: center;
}

.main-cart-container_item {
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}

</style>