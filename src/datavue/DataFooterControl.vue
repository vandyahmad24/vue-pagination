<template>
  <div class="row align-item-center">
    <div class="col-md-3">
      <data-per-page
        :total-rows="totalRows"
        v-model="localPerPage"
      ></data-per-page>
    </div>
    <div class="col-md-4">
      <data-record-meta
        :total-rows="totalRows"
        :per-page="localPerPage"
        :current-page="localCurrentPage"
      ></data-record-meta>
    </div>
    <div class="col-md-5">
      <data-pagination
        :total-rows="totalRows"
        :per-page="localPerPage"
        position="center"
        :type="pagination"
        v-model="localCurrentPage"
      ></data-pagination>
    </div>
  </div>
</template>

<script>
  import DataPagination from './DataPagination.vue'
  import DataPerPage from './DataPerPage.vue'
  import DataRecordMeta from './DataRecordMeta.vue'

  export default {
    props: {
      totalRows: {
        type: Number,
        required: true,
      },
      perPage: {
        type: Number,
        default: 10,
      },
      currentPage: {
        type: Number,
        default: 1,
      },
      pagination: {
        type: String,
        default: 'inline',
      },
    },
    components: {
      DataRecordMeta,
      DataPagination,
      DataPerPage,
    },
    data() {
      return {
        localPerPage: this.perPage,
        localCurrentPage: this.currentPage,
      }
    },
    watch: {
      localPerPage(val) {
        this.$emit('update:perPage', val)
      },
      localCurrentPage(val) {
        this.$emit('update:currentPage', val)
      },
    },
  }
</script>
