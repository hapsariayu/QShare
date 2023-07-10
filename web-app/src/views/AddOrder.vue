<template>
  <div>
    <NavBar />
    <!-- component -->
    <div class="flex items-center justify-center p-12">
      <!-- Author: FormBold Team -->
      <!-- Learn More: https://formbold.com -->
      <div class="mx-auto w-full max-w-[550px]">
        <form @submit.prevent="inputOrder({productName: productName, price: price, quantity: quantity})">
          <div class="mb-5">
            <label
              for="productName"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              id="productName"
              v-model="productName"
              placeholder="Smart TV 50 Inci"
              class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label
              for="price"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="5000"
              v-model="price"
              min="0"
              class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label
              for="quantity"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="5"
              v-model="quantity"
              min="0"
              class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div>
            <button
              class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "AddOrder",
  components: {
    NavBar,
  },
  data() {
    return {
      productName: "",
      price: "",
      quantity: "",
    };
  },
  methods: {
    async inputOrder(orderData) {
      try {
        if (
          this.productName === "" ||
          this.price === "" ||
          this.quantity === ""
        )
          throw { message: "Please complete your input" };

        const response = await fetch(`http://localhost:3000/orders`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token,
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Added data order successfully",
        });

        this.$router.push('/')
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
};
</script>

<style>
</style>