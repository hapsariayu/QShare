<template>
  <div id="regist-page">
    <div class="flex items-center min-h-screen">
      <div class="container mx-auto">
        <div class="max-w-md mx-auto my-10">
          <div class="text-center">
            <h1
              class="my-3 text-3xl font-semibold text-gray-700 dark:text-black-200"
            >
              Register
            </h1>
            <p class="text-gray-500 dark:text-black-400">
              Register to create your new account
            </p>
          </div>
          <div class="m-7">
            <form
              @submit.prevent="
                register({
                  username: username,
                  password: password,
                  email: email,
                })
              "
            >
              <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >Username</label
                >
                <input
                  name="username"
                  id="username"
                  v-model="username"
                  placeholder="Type your username"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-200 dark:text-white dark:placeholder-gray-800 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >Email</label
                >
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@company.com"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-200 dark:text-white dark:placeholder-gray-800 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div class="mb-6">
                <div class="flex justify-between mb-2">
                  <label
                    for="password"
                    class="text-sm text-gray-600 dark:text-gray-400"
                    >Password</label
                  >
                </div>
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-200 dark:text-white dark:placeholder-gray-800 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>

              <div class="mb-6">
                <button
                  type="submit"
                  class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register(userData) {
      try {
        if (this.username === "" || this.email === "" || this.password === "")
          throw { message: "Please compelete your input" };
        const response = await fetch(
          `http://localhost:3000/costumers/register`,
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if(!response.ok) {
            const text = await response.text()
            console.log(text);
            throw new Error(text)
        } 
        const data = await response.json()
        console.log(data);
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
          title: "Registered successfully, please log in with your new account",
        });
        this.$router.push("/login");
      } catch (error) {
        console.log(error, "<<<");
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

<style></style>
