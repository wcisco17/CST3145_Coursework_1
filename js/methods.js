function addToCart(id) {
  const { lessons, cart } = this;

  const lesson = lessons.find((lesson) => lesson.id == id)
  if (lesson.availibility > 0)
    lesson.availibility--;
  if (lesson.availibility == 0)
    lesson.isSoldOut = true

  return cart.push(lesson)
}

function removeFromCart(lessonIdx) {
  const { cart } = this;

  if (lessonIdx != null && cart.length > 0) {
    const deletCartItem = cart.find((cartItem, i) => {
      if (cartItem?.id == lessonIdx) {
        cartItem.availibility += 1
        cart.splice(i, 1)
      }
    })
    return deletCartItem
  }
}

function submitForm(e) {
  e.preventDefault()

  const {
    formState: { textValue, numValue }
  } = this;

  const nameItem = this.$refs.nameItem.value;
  const phoneItem = this.$refs.phoneItem.value;

  const isTextValue = /^[a-zA-Z]+$/.test(nameItem);
  const isNumberValue = /^[1-10]+$/.test(phoneItem);
}

function navigateToCart() {
  const { isCartOpen } = this;
  if (!isCartOpen)
    this.isCartOpen = true
  else
    this.isCartOpen = false
}

const methods = {
  addToCart,
  removeFromCart,
  navigateToCart,
  submitForm
}

export default methods;

