<template>
  <div class="card">
    <div class="card-header">
      <slot name="title" v-if="$slots.title"></slot>
    </div>
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-md-6">
          <slot name="actionBar" :checkedItems="checkedItems"></slot>
        </div>
        <div class="col-md-6">
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
          <slot
            name="head"
            :sort="sortMethod"
            :sortable="sortable"
            :checkAll="checkAll"
            :isCheckedAll="isCheckedAll"
          ></slot>
        </thead>
        <tbody>
          <slot
            name="data"
            :records="recordsPagination"
            :firstItem="firstItem"
            :isChecked="isChecked"
            :checkItem="checkItem"
          ></slot>
        </tbody>
      </table>
    </div>

    <div class="card-footer">
      <data-footer-control
        v-model:per-page="localPerPage"
        v-model:current-page="currentPage"
        :total-rows="records.length"
      >
        ></data-footer-control
      >
    </div>
  </div>
</template>

<script>
  import DataSearch from './DataSearch.vue'
  import DataFooterControl from './DataFooterControl.vue'
  import { getArrayIndexes, getFromHistory } from './utils'
  import { computed } from 'vue'

  export default {
    components: {
      DataSearch,
      DataFooterControl,
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
      isCheckedAll() {
        return (
          this.recordsPagination &&
          this.recordsPagination.length === this.checkedItems.size
        )
      },
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
      checkAll(e) {
        if (e.target.checked) {
          this.recordsPagination.forEach((record) =>
            this.checkedItems.add(record)
          )
        } else {
          this.checkedItems.clear()
        }
        console.log('check all ', this.checkedItems.size)
      },
      isChecked(record) {
        return this.checkedItems.has(record)
      },
      checkItem(record) {
        if (this.isChecked(record)) {
          this.checkedItems.delete(record)
        } else {
          this.checkedItems.add(record)
        }
        console.log('checkItem ', this.checkedItems.size)
      },
    },
    mounted() {
      this.fetchData()

      window.onpopstate = () => {
        this.currentPage = getFromHistory('page', 1)
      }
    },

    provide() {
      return {
        paginationType: this.pagination,
        totalFilteredRows: computed(() => this.records.length),
      }
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
        currentPage: getFromHistory('page', 1),
        localPerPage: getFromHistory('per_page', this.perPage),
        firstItem: 1,
        checkedItems: new Set(),
      }
    },
  }
</script>
