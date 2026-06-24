// =============================================
// AXIOS GLOBAL CONFIG
// =============================================
const BASE_URL = 'http://localhost:8080';

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('namaAdmin');
      window.location.hash = '#/login';
    }
    return Promise.reject(error);
  }
);

// =============================================
// ROUTER
// =============================================
const { createRouter, createWebHashHistory } = VueRouter;

const routes = [
  { path: '/',          component: Home },
  { path: '/login',     component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/kategori',  component: Kategori,  meta: { requiresAuth: true } },
  { path: '/supplier',  component: Supplier,  meta: { requiresAuth: true } },
  { path: '/barang',    component: Barang,    meta: { requiresAuth: true } },
  { path: '/transaksi', component: Transaksi, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 }; }
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

// =============================================
// ROOT APP
// =============================================
const { createApp, nextTick } = Vue;

// Refresh AOS setiap kali route berubah
router.afterEach(() => {
  nextTick(() => {
    if (typeof AOS !== 'undefined') {
      AOS.refreshHard();
    }
  });
});

const AppRoot = {
  data() {
    return { viewKey: Date.now() };
  },
  mounted() {
    // Update viewKey setelah router selesai proses navigasi (bukan hashchange)
    // agar tidak ada race condition
    router.afterEach(() => {
      nextTick(() => {
        this.viewKey = Date.now();
      });
    });
  },
  template: `
    <div class="flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow">
        <transition name="page" mode="out-in">
          <router-view :key="viewKey"></router-view>
        </transition>
      </main>
    </div>
  `,
  components: { Navbar }
};

createApp(AppRoot).use(router).mount('#app');