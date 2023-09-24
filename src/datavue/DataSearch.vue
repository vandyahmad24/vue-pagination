<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Search..."
      v-model="searchTerm"
      @keyup.enter="handleSearch"
      @keyup.esc="handleReset"
    />
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
        v-if="validSearchTerm"
        @click="handleReset"
      >
        <i class="fas fa-sync-alt"></i>
      </button>
      <button
        class="btn btn-outline-secondary"
        type="button"
        :disabled="!validSearchTerm"
        @click="handleSearch"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        searchTerm: '',
      }
    },
    computed: {
      validSearchTerm() {
        return this.searchTerm.length >= 1
      },
    },
    methods: {
      handleSearch() {
        this.$emit('update:modelValue', this.searchTerm)
      },

      handleReset() {
        this.searchTerm = ''
        this.$emit('update:modelValue', this.searchTerm)
      },
    },
  }
</script>
