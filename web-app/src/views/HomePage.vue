<template>
  <div>
    <NavBar />
    <!-- component -->
    <template v-if="orders.length > 0">
      <div class="bg-white mt-5 w-3/5 mx-auto">
        <div class="overflow-x-auto border-x border-t">
          <table class="table-auto w-full">
            <thead class="border-b">
              <tr class="bg-gray-100">
                <th class="text-left p-4 font-medium">Name</th>
                <th class="text-left p-4 font-medium">Price</th>
                <th class="text-left p-4 font-medium">Quantity</th>
                <th class="text-left p-4 font-medium">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(order, i) in orders"
                :key="i"
                class="border-b hover:bg-gray-50"
              >
                <td class="p-4">{{ order.productName }}</td>
                <td class="p-4">{{ order.price }}</td>
                <td class="p-4">{{ order.quantity }}</td>
                <td class="p-4">{{ order.totalPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Hello there</h1>
            <p class="py-6">
              Looks like you havent got any orders yet. You can always add your orders in add order page, or click button below
            </p>
            <button @click.prevent="$router.push('/AddOrder')" class="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import router from "../router";
export default {
  name: "HomePage",
  components: {
    NavBar,
  },
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await fetch(`http://localhost:3000/orders`, {
          method: "get",
          headers: {
            access_token: localStorage.access_token,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }

        const data = await response.json();
        this.orders = await data;
        console.log(this.orders, "<<");
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    },
  },
  created() {
    this.fetchOrders();
  },
};
</script>

<style></style>
