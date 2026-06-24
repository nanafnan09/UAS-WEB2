const Login = {
  data() {
    return {
      form: { username: '', password: '' },
      loading: false,
      error: ''
    };
  },
  methods: {
    async doLogin() {
      this.loading = true;
      this.error = '';
      try {
        const res = await axios.post('/api/login', this.form);
        const { token, nama } = res.data.data;

        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('namaAdmin', nama);

        window.dispatchEvent(new Event('auth-change'));
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.response?.data?.message || 'Login gagal. Coba lagi.';
      } finally {
        this.loading = false;
      }
    }
  },
  template: `
    <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-darkbg relative overflow-hidden px-4">
      <!-- Animated Background Elements -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1.5s;"></div>

      <div class="glass-card rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10 animate-fade-in-up">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="bg-darkcard border border-darkborder rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
            <i class="fa-solid fa-boxes-stacked text-indigo-400 text-3xl"></i>
          </div>
          <h1 class="text-2xl font-bold text-white">E-Inventory System</h1>
          <p class="text-slate-400 text-sm mt-1">Masuk sebagai Administrator</p>
        </div>

        <!-- Alert Error -->
        <div v-if="error" class="bg-rose-500/10 border border-rose-500/50 text-rose-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 animate-fade-in-up">
          <i class="fa fa-circle-exclamation"></i>
          <span class="text-sm">{{ error }}</span>
        </div>

        <!-- Form -->
        <div class="space-y-5">
          <div class="group">
            <label class="block text-sm font-medium text-slate-300 mb-1 transition-colors group-focus-within:text-indigo-400">Username</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                <i class="fa fa-user"></i>
              </span>
              <input v-model="form.username" type="text"
                placeholder="Masukkan username"
                @keyup.enter="doLogin"
                class="w-full bg-darkbg pl-10 pr-4 py-2.5 border border-darkborder rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-sm"/>
            </div>
          </div>

          <div class="group">
            <label class="block text-sm font-medium text-slate-300 mb-1 transition-colors group-focus-within:text-indigo-400">Password</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                <i class="fa fa-lock"></i>
              </span>
              <input v-model="form.password" type="password"
                placeholder="Masukkan password"
                @keyup.enter="doLogin"
                class="w-full bg-darkbg pl-10 pr-4 py-2.5 border border-darkborder rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-sm"/>
            </div>
          </div>

          <button @click="doLogin" :disabled="loading"
            class="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.5)] hover:-translate-y-0.5">
            <i v-if="loading" class="fa fa-spinner fa-spin"></i>
            <i v-else class="fa fa-sign-in-alt"></i>
            {{ loading ? 'Memproses...' : 'Masuk ke Sistem' }}
          </button>
        </div>

        <p class="text-center text-xs text-slate-500 mt-6">
          Default: admin / admin123
        </p>
      </div>
    </div>
  `
};