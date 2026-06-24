const Home = {
  data() {
    return {
      summary: { total_barang: 0, total_kategori: 0, total_supplier: 0, total_transaksi: 0 },
      loading: true,
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
    };
  },
  async mounted() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    try {
      const res = await axios.get('/api/summary');
      this.summary = res.data.data;
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  },
  template: `
    <div style="background:#0F172A;min-height:calc(100vh - 64px);">
      <!-- Hero -->
      <div style="position:relative;overflow:hidden;background:#0F172A;color:#f1f5f9;padding:80px 24px;text-align:center;border-bottom:1px solid #334155;">
        <div style="position:absolute;top:-96px;right:-96px;width:384px;height:384px;background:rgba(99,102,241,0.1);border-radius:50%;filter:blur(80px);pointer-events:none;"></div>
        <div style="position:absolute;bottom:-96px;left:-96px;width:384px;height:384px;background:rgba(168,85,247,0.1);border-radius:50%;filter:blur(80px);pointer-events:none;"></div>

        <div style="max-width:768px;margin:0 auto;position:relative;z-index:10;">
          <div style="width:96px;height:96px;background:#1E293B;border:1px solid #334155;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 32px;box-shadow:0 0 20px rgba(79,70,229,0.3);" class="hero-icon-anim float-anim">
            <i class="fa-solid fa-boxes-stacked" style="color:#818cf8;font-size:3rem;"></i>
          </div>
          <h1 class="hero-title-anim" style="font-size:clamp(2rem,5vw,3.5rem);font-weight:900;margin-bottom:24px;background:linear-gradient(135deg,#818cf8,#a78bfa,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1.2;">
            Sistem Manajemen Inventaris
          </h1>
          <p class="hero-desc-anim" style="color:#94a3b8;font-size:1.1rem;margin-bottom:40px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7;">
            Kelola data barang, kategori, supplier, dan histori transaksi masuk/keluar secara terpusat, aman, dan efisien.
          </p>
          <div class="hero-btn-anim">
            <router-link v-if="!isLoggedIn" to="/login"
              style="display:inline-flex;align-items:center;justify-content:center;background:linear-gradient(to right,#4f46e5,#6366f1);color:white;font-weight:700;padding:14px 32px;border-radius:9999px;font-size:1.1rem;text-decoration:none;box-shadow:0 0 15px rgba(79,70,229,0.4);transition:all 0.3s;">
              Masuk ke Panel Admin
              <i class="fa fa-arrow-right" style="margin-left:10px;"></i>
            </router-link>
            <router-link v-else to="/dashboard"
              style="display:inline-flex;align-items:center;justify-content:center;background:linear-gradient(to right,#059669,#10b981);color:white;font-weight:700;padding:14px 32px;border-radius:9999px;font-size:1.1rem;text-decoration:none;box-shadow:0 0 15px rgba(16,185,129,0.4);transition:all 0.3s;">
              Ke Dashboard Admin
              <i class="fa fa-gauge" style="margin-left:10px;"></i>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Summary Cards -->
      <div style="max-width:1280px;margin:0 auto;padding:64px 24px;">
        <div style="text-align:center;margin-bottom:48px;" class="section-title-anim">
          <h2 style="color:#f1f5f9;font-size:1.75rem;font-weight:800;display:inline-flex;align-items:center;gap:12px;">
            <i class="fa fa-chart-bar" style="color:#818cf8;"></i>Ringkasan Data Inventaris
          </h2>
          <div style="width:80px;height:4px;background:#6366f1;margin:16px auto 0;border-radius:99px;"></div>
        </div>

        <div v-if="loading" style="text-align:center;padding:40px;color:#64748b;">
          <i class="fa fa-spinner spin-anim" style="font-size:2.5rem;"></i>
        </div>

        <div v-else style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;">
          <div class="card-anim hover-lift" style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-radius:16px;padding:24px;border-top:4px solid #6366f1;cursor:default;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div>
                <p style="color:#94a3b8;font-size:0.875rem;font-weight:500;margin:0 0 4px;">Total Barang</p>
                <p style="color:#818cf8;font-size:2.5rem;font-weight:900;margin:0;">{{ summary.total_barang }}</p>
              </div>
              <div style="background:rgba(99,102,241,0.1);padding:16px;border-radius:12px;border:1px solid rgba(99,102,241,0.2);">
                <i class="fa fa-box" style="color:#818cf8;font-size:1.5rem;"></i>
              </div>
            </div>
          </div>

          <div class="card-anim hover-lift" style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-radius:16px;padding:24px;border-top:4px solid #10b981;cursor:default;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div>
                <p style="color:#94a3b8;font-size:0.875rem;font-weight:500;margin:0 0 4px;">Total Kategori</p>
                <p style="color:#10b981;font-size:2.5rem;font-weight:900;margin:0;">{{ summary.total_kategori }}</p>
              </div>
              <div style="background:rgba(16,185,129,0.1);padding:16px;border-radius:12px;border:1px solid rgba(16,185,129,0.2);">
                <i class="fa fa-tags" style="color:#10b981;font-size:1.5rem;"></i>
              </div>
            </div>
          </div>

          <div class="card-anim hover-lift" style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-radius:16px;padding:24px;border-top:4px solid #f59e0b;cursor:default;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div>
                <p style="color:#94a3b8;font-size:0.875rem;font-weight:500;margin:0 0 4px;">Total Supplier</p>
                <p style="color:#f59e0b;font-size:2.5rem;font-weight:900;margin:0;">{{ summary.total_supplier }}</p>
              </div>
              <div style="background:rgba(245,158,11,0.1);padding:16px;border-radius:12px;border:1px solid rgba(245,158,11,0.2);">
                <i class="fa fa-truck" style="color:#f59e0b;font-size:1.5rem;"></i>
              </div>
            </div>
          </div>

          <div class="card-anim hover-lift" style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-radius:16px;padding:24px;border-top:4px solid #f43f5e;cursor:default;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div>
                <p style="color:#94a3b8;font-size:0.875rem;font-weight:500;margin:0 0 4px;">Total Transaksi</p>
                <p style="color:#f43f5e;font-size:2.5rem;font-weight:900;margin:0;">{{ summary.total_transaksi }}</p>
              </div>
              <div style="background:rgba(244,63,94,0.1);padding:16px;border-radius:12px;border:1px solid rgba(244,63,94,0.2);">
                <i class="fa fa-right-left" style="color:#f43f5e;font-size:1.5rem;"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer style="background:#1E293B;border-top:1px solid #334155;color:#64748b;text-align:center;padding:32px;margin-top:48px;">
        <p style="font-size:0.875rem;margin:0;">© 2026 E-Inventory System — Premium Dark Edition</p>
      </footer>
    </div>
  `
};