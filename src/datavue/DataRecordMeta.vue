<template>
  <div class="container-page mt-2">
    <span>{{ recordMeta }}</span>
  </div>
</template>

<script>
  import { getArrayIndexes } from './utils'
  export default {
    props: {
      totalRows: {
        type: Number,
        required: true,
      },
      currentPage: {
        type: Number,
        default: 1,
      },
      perPage: {
        type: Number,
        required: true,
      },
    },
    computed: {
      recordMeta() {
        let { from, to } = getArrayIndexes(
          this.totalRows,
          this.perPage,
          this.currentPage
        )
        console.log('per from ', from)
        return `Showing ${from + 1} to ${to + 1} of ${this.totalRows} records`
      },
    },
    inject: ['totalFilteredRows'],
    mounted() {
      console.log('totalFilteredRows  ', this.totalFilteredRows)
    },
  }
</script>

<style scoped>
  .container-page {
    display: flex; /* Menggunakan display flex untuk mengatur tata letak sejajar */
    align-items: center; /* Mengatur vertikal */
  }
</style>
