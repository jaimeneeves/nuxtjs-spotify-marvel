<template>
  <b-card :title="title"
    :img-src="coverImg"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2">
    <b-card-text>
      <div>{{description}}</div>
      <div v-if="startYear && endYear" class="text-black-50 mt-3">
        Ano: {{startYear}} à {{endYear}}
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    id: {
      required: true
    },
    coverImg: {
      required: true
    },
    title: {
      required: true
    },
    description: {
      required: true
    },
    startYear: {
      required: false
    },
    endYear: {
      required: false
    }
  }
}
</script>
