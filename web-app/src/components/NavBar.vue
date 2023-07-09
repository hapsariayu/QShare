<template>
  <nav class="w-full">
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <router-link to="/" class="btn btn-ghost normal-case text-lg"
          >Home</router-link
        >
        <router-link to="/AddOrder" class="btn btn-ghost normal-case text-lg"
          >Add Order</router-link
        >
      </div>

      <div class="flex-none gap-2">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-bordered w-24 rounded-xl md:w-auto"
          />
        </div>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
  src="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Sam"
  alt="avatar" />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            
            <li><a @click.prevent="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="border-gray-500" />
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    async logout() {
      try {
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
          title: "Logged out successfully",
        });
        localStorage.clear();
        this.changePage("login");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
