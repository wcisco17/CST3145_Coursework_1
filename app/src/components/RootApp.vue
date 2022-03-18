<script>
import Lessons from '@/components/Lessons';
import Checkout from '@/components/Checkout';

export default {
  name: 'RootApp',
  components: {Checkout, Lessons},
  data() {
    return {
      lessons: {
        data: [],
        error: {message: null},
        loading: false,
      },
      cart: [],
      isCartOpen: false,
      isSuccessOrder: false,
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
    const isTextValue = /^[a-zA-Z]+$/.test(this.nameItem);
    const isNumberValue = /^[1-9]+$/.test(this.phoneItem);
    if (isTextValue && isNumberValue) this.valid = false
    else this.valid = true
  },
  methods: {
    navigateToCart() {
      if (!this.isCartOpen) this.isCartOpen = true
      else this.isCartOpen = false
    },
    reload() {
      return window.location.reload()
    },
    async addToCart(id) {
      const lesson = this.lessons.data.find((lesson) => lesson._id === id)

      if (lesson) {
        let updateValues = (lesson.quantity != null) ? lesson.quantity : lesson.availibility
        try {
          const orders = await fetch('https://coursework-init-cst3145.herokuapp.com/add_order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify(
                {id: lesson._id, quantity: (updateValues) -= 1, removeLesson: false}
            )
          })
          if (orders.status === 200) {
            return this.reload()
          }
        } catch (err) {
          throw new Error(`Error: ${err}`)
        }
      }
    },

    async removeLessons(id) {
      const lesson = this.lessons.data.find((lesson) => lesson._id === id);
      if (lesson) {
        try {
          const updatedOrders = await fetch('https://coursework-init-cst3145.herokuapp.com/add_order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
              id: lesson._id,
              quantity: lesson.availibility,
              removeLesson: true
            })
          })

          if (updatedOrders.status === 200) {
            return this.reload()
          }
        } catch (err) {
          throw new Error(`Error ${err}`)
        }
      }
    },

    async submitForm(e) {
      e.preventDefault()
      let result = null
      const name = this.nameItem;
      const phone = Number(this.phoneItem);
      const isTextValue = /^[a-zA-Z]+$/.test(name);
      const isNumberValue = /^[1-9]+$/.test(phone);

      if (!isNumberValue || !isTextValue) {
        this.valid = true
        result = null;
      } else
        result = {name, phone}

      if (result) {
        try {
          const orders = await fetch('https://coursework-init-cst3145.herokuapp.com/update_lessons', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if (orders.status === 200) {
            this.isSuccessOrder = true;
            return this.reload()
          }
        } catch (err) {
          throw new Error(`Error: ${err}`)
        }
      }
    },
  },

}
</script>

<template>
  <div class="hello">
    <section class="section">
      <div class="container mt-1">
        <div class="header-container">

          <div class="is-fluid mb-5">
            <h1 class="title">
              Course List
            </h1>
            <p class="pt-2 subtitle">
              All of the <strong>Lessons</strong> available this year.
            </p>
          </div>


          <div class="cart">
            <!-- Start - Cart Button -->
            <div @click="navigateToCart()" v-if="cart.length !== 0" class="cart-count">
              <div>
                Cart
              </div>
              <div style="padding-left: 10px;">
                <p>{{ cart.length }}</p>
              </div>
            </div>
            <!-- End - Cart Button -->

          </div>
        </div>

        <Lessons
            :lessons="this.lessons"
            @add-to-cart="addToCart"
        />
      </div>
    </section>

    <Checkout
        :cart="this.cart"
        :isCartOpen="this.isCartOpen"
        :navigateToCart="this.navigateToCart"
        :valid="this.valid"

        :nameItem="nameItem"
        @bindNameItem="nameItem = $event"

        @bindPhoneItem="phoneItem = $event"
        :phoneItem="phoneItem"

        @submit-form="submitForm"
        @remove-lessons="removeLessons"
    />
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.header-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.header-container .cart {
  cursor: pointer;
}

.is-show {
  display: none;
}

.cart .cart-count {
  background-color: #3e8ed0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px;
  border-radius: 100px;
  color: white;
  position: relative;
  left: 4px;
}

.select-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
}

.select-container_cus1 {
  margin-right: 25px;
}

.search-box-container {
  margin-bottom: 35px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 3em;
  align-items: flex-start;
}

.spaces-bought {
  font-weight: 900;
}

@media screen and (max-width: 992px) {
  .card-container {
    grid-template-columns: repeat(2, auto);
  }
}

@media screen and (max-width: 600px) {
  .card-container {
    grid-template-columns: repeat(1, auto);
  }
}
</style>
