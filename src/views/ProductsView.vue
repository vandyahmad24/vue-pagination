<template>
  <div class="container py-5">
    <div class="card">
      <div class="card-header">
        <h2>Manage Products</h2>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-12">
            <div class="form-inline justify-content-end">
              <div class="form-group">
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
              </div>
            </div>
          </div>
        </div>

        <app-alert
          v-if="!products.length"
          message="No products found!"
          type="danger"
        ></app-alert>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th :class="sortableColumn" @click="sortDir = sortDir * -1">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productsSorted" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        <nav>
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item" v-for="page in pages" :key="`page-${page}`">
              <a class="page-link" href="#">{{ page }}</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Intelligent Granite Table",
          category: "Tools",
          price: "787.00",
        },
        {
          id: 2,
          name: "Handcrafted Rubber Hat",
          category: "Games",
          price: "232.00",
        },
        {
          id: 3,
          name: "Rustic Concrete Salad",
          category: "Jewelery",
          price: "115.00",
        },
        {
          id: 4,
          name: "Gorgeous Concrete Pizza",
          category: "Garden",
          price: "250.00",
        },
        {
          id: 5,
          name: "Refined Plastic Shoes",
          category: "Health",
          price: "844.00",
        },
        {
          id: 6,
          name: "Awesome Metal Soap",
          category: "Tools",
          price: "326.00",
        },
        {
          id: 7,
          name: "Intelligent Fresh Mouse",
          category: "Home",
          price: "783.00",
        },
        {
          id: 8,
          name: "Licensed Soft Keyboard",
          category: "Music",
          price: "361.00",
        },
        {
          id: 9,
          name: "Fantastic Rubber Pants",
          category: "Garden",
          price: "786.00",
        },
        {
          id: 10,
          name: "Awesome Rubber Ball",
          category: "Automotive",
          price: "696.00",
        },
      ],
      searchTerm: "",
      pages: 3,
      isSearching: false,
      sortDir: 1,
    };
  },

  methods: {
    handleSearch() {
      this.isSearching = true;
    },

    handleReset() {
      this.searchTerm = "";
      this.isSearching = false;
    },
  },

  computed: {
    validSearchTerm() {
      return this.searchTerm.length >= 1;
    },

    productsFiltered() {
      if (!this.isSearching) {
        return this.products;
      }

      return this.products.filter((product) =>
        product.name.match(new RegExp(this.searchTerm, "i"))
      );
    },

    productsSorted() {
      return this.productsFiltered.sort(
        (a, b) => (a.price - b.price) * this.sortDir
      );
    },

    sortableColumn() {
      return ["sort-control", this.sortDir === 1 ? "ascending" : "descending"];
    },
  },
};
</script>
