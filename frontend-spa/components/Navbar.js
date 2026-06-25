const Navbar = {
  data() {
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
      namaAdmin: localStorage.getItem('namaAdmin') || 'Admin',
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('namaAdmin');
      this.isLoggedIn = false;
      window.location.hash = '#/';
    },
    goTo(path) {
      // Gunakan hash navigation langsung — paling reliable
      window.location.hash = '#' + path;
    },
    refreshAuth() {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.namaAdmin = localStorage.getItem('namaAdmin') || 'Admin';
    }
  },
  mounted() {
    this._authHandler = () => this.refreshAuth();
    window.addEventListener('auth-change', this._authHandler);
    // Update auth state setiap kali hash berubah
    window.addEventListener('hashchange', this._authHandler);
  },
  beforeUnmount() {
    window.removeEventListener('auth-change', this._authHandler);
    window.removeEventListener('hashchange', this._authHandler);
  },
  template: `
    <nav class="bg-darkbg/80 backdrop-blur-md shadow-lg border-b border-darkborder sticky top-0 z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-3 cursor-pointer group" @click="goTo('/')">
            <i class="fa-solid fa-boxes-stacked text-indigo-400 text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"></i>
            <span class="text-slate-100 text-xl font-bold tracking-wide group-hover:text-indigo-300 transition-colors duration-300">
              E-Inventory
            </span>
          </div>

          <!-- Nav Links -->
          <div class="hidden md:flex items-center space-x-1">
            <a href="#/" @click.prevent="goTo('/')"
              class="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer no-underline">
              <i class="fa fa-home mr-1 text-indigo-400"></i> Beranda
            </a>

            <template v-if="isLoggedIn">
              <a href="#/dashboard" @click.prevent="goTo('/dashboard')"
                class="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer no-underline">
                <i class="fa fa-gauge mr-1 text-indigo-400"></i> Dashboard
              </a>
              <a href="#/barang" @click.prevent="goTo('/barang')"
                class="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer no-underline">
                <i class="fa fa-box mr-1 text-emerald-400"></i> Barang
              </a>
              <a href="#/kategori" @click.prevent="goTo('/kategori')"
                class="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer no-underline">
                <i class="fa fa-tags mr-1 text-amber-400"></i> Kategori
              </a>
              <a href="#/supplier" @click.prevent="goTo('/supplier')"
                class="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer no-underline">
                <i class="fa fa-truck mr-1 text-rose-400"></i> Supplier
              </a>
              <a href="#/transaksi" @click.prevent="goTo('/transaksi')"
                class="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer no-underline">
                <i class="fa fa-right-left mr-1 text-purple-400"></i> Transaksi
              </a>

              <div class="flex items-center ml-4 pl-4 border-l border-darkborder space-x-3">
                <span class="text-slate-200 text-sm font-medium">
                  <i class="fa fa-user-circle mr-1 text-indigo-300"></i>{{ namaAdmin }}
                </span>
                <button @click="logout"
                  class="bg-rose-500/10 text-rose-400 border border-rose-500/50 hover:bg-rose-500 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:-translate-y-0.5">
                  <i class="fa fa-sign-out-alt mr-1"></i> Logout
                </button>
              </div>
            </template>

            <template v-else>
              <a href="#/login" @click.prevent="goTo('/login')"
                class="bg-indigo-600 text-white hover:bg-indigo-500 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 shadow-[0_0_10px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 cursor-pointer no-underline">
                <i class="fa fa-sign-in-alt mr-1"></i> Login Admin
              </a>
            </template>
          </div>
        </div>
      </div>
    </nav>
  `
};