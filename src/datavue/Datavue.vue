<template>
  <div class="card">
    <div class="card-header">
      <slot name="title" v-if="$slots.title"></slot>
    </div>
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-md-12">
          <div class="form-inline justify-content-end">
            <div class="form-group">
              <data-search v-model="searchTerm"></data-search>
            </div>
          </div>
        </div>
      </div>
      <app-alert
        v-if="!records.length"
        message="No records found!"
        type="danger"
      >
        <i class="fa fa-exclamation-triangle"></i>
      </app-alert>

      <table v-else class="table table-striped table-hover">
        <thead>
          <slot name="head" :sort="sortMethod" :sortable="sortable"></slot>
        </thead>
        <tbody>
          <slot
            name="data"
            :records="recordsPagination"
            :firstItem="firstItem"
          ></slot>
        </tbody>
      </table>
    </div>

    <div class="card-footer">
      <div class="row align-item-center">
        <div class="col-md-3">
          <data-per-page
            :total-rows="records.length"
            v-model="localPerPage"
          ></data-per-page>
        </div>
        <div class="col-md-3">
          <data-record-meta
            :total-rows="records.length"
            :per-page="localPerPage"
            :currentPage="currentPage"
          ></data-record-meta>
        </div>
        <div class="col-md-6">
          <data-pagination
            :total-rows="records.length"
            :per-page="localPerPage"
            v-model="currentPage"
            position="center"
            :type="pagination"
          ></data-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DataSearch from './DataSearch.vue'
  import DataPagination from './DataPagination.vue'
  import DataPerPage from './DataPerPage.vue'
  import DataRecordMeta from './DataRecordMeta.vue'
  import { getArrayIndexes } from './utils'
  export default {
    components: {
      DataSearch,
      DataPagination,
      DataPerPage,
      DataRecordMeta,
    },
    props: {
      searchKey: {
        type: String,
        default: 'name',
      },
      sortKey: {
        type: String,
        default: 'name',
      },
      source: {
        type: [String, Array],
        required: true,
      },
      perPage: {
        type: Number,
        default: 10,
      },
      pagination: {
        type: String,
        default: 'inline',
      },
    },

    created() {
      console.log(this.$slots)
    },
    computed: {
      recordsFilter() {
        if (!this.searchTerm) {
          return this.records
        }

        return this.records.filter((record) =>
          record[this.searchKey].match(new RegExp(this.searchTerm, 'i'))
        )
      },
      recordsSorted() {
        return this.recordsFilter.sort((a, b) => {
          const left = a[this.sort.by],
            right = b[this.sort.by]
          if (left < right) return -1 * this.sort.dir
          else if (left > right) return 1 * this.sort.dir
          else return 0
        })
      },
      sortType() {
        return this.sort.dir === 1 ? 'ascending' : 'descending'
      },
      recordsPagination() {
        let { from, to } = getArrayIndexes(
          this.records.length,
          this.localPerPage,
          this.currentPage
        )
        this.firstItem = from + 1
        return this.recordsSorted.slice(from, to + 1)
      },
    },
    data() {
      return {
        records: [],
        searchTerm: '',
        isSearching: false,
        sort: {
          dir: 1,
          by: this.sortKey,
        },
        currentPage: 1,
        localPerPage: this.perPage,
        firstItem: 1,
      }
    },
    methods: {
      sortMethod(column) {
        this.sort.by = column
        this.sort.dir = this.sort.dir * -1
      },
      sortable(column) {
        return ['sort-control', column === this.sort.by ? this.sortType : '']
      },
      fetchData() {
        if (Array.isArray(this.source)) {
          this.records = this.source
        }
      },
    },
    mounted() {
      this.fetchData()
    },
  }
</script>
