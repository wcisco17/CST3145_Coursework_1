<template>
  <!-- Start - Card Container -->
  <div class="card-container">

    <div v-for="lesson in lessons.data" v-bind:key="lesson.id" class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img alt="Placeholder image"
               v-bind:src="'https://coursework-init-cst3145.herokuapp.com/static/' + lesson.url">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <figure class="image is-48x48">
              <i class="fas fa-2x fa-quidditch"></i>
            </figure>
            <p class="title is-4">Subject: {{ lesson.subject }}</p>
            <p class="subtitle pt-5">Location: {{ lesson.location }}</p>
            <p class="subtitle pt-5">Price: {{ lesson.price }}</p>
            <p class="subtitle pt-5">Space: {{
                lesson.quantity != null ? (lesson.quantity) : (lesson.availibility)
              }}</p>
          </div>
        </div>
        <div class="content">
          <button @click="$emit('add-to-cart',lesson._id)"
                  :disabled="lesson.availibility <= 0 || lesson.quantity >= 5 || lesson.quantity <= 0"
                  class="button is-info">Add to
            cart
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- End - Card Container -->
</template>

<script>
export default {
  name: "Lessons",
  props: {
    lessons: {
      data: [],
      error: {message: null},
      loading: false,
    },
  }
}
</script>

<style scoped>

</style>