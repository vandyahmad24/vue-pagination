<template>
  <div class="container-page">
    <label>Show</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', parseInt($event.target.value))"
      class="form-control custom-select mr-1 ml-1"
      style="width: 70px"
    >
      <option v-for="size in pageSizes" :key="`size-sie-${size}`" :value="size">
        {{ size }}
      </option>
    </select>
    <span>Records</span>
  </div>
</template>

<script>
  export default {
    props: {
      totalRows: {
        type: Number,
        required: true,
      },
      modelValue: {
        type: Number,
        required: true,
      },
    },
    computed: {
      pageSizes() {
        let pages = Math.ceil(this.totalRows / this.limit)
        console.log('pages ', pages)
        let pageSizes = []
        for (let i = 1; i <= pages; i++) {
          pageSizes.push(i * this.limit)
        }
        return pageSizes
      },
    },
    data() {
      return {
        // localPerPage: this.modelValue,
        limit: this.modelValue,
      }
    },
    // watch: {
    //   localPerPage(value) {
    //     this.$emit('update:modelValue', value)
    //   },
    // },
  }
</script>

<style scoped>
  .container-page {
    display: flex; /* Menggunakan display flex untuk mengatur tata letak sejajar */
    align-items: center; /* Mengatur vertikal */
  }
</style>
