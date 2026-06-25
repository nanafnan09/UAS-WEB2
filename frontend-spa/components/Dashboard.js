const Dashboard = {
  data() {
    return {
      summary: { total_barang: 0, total_kategori: 0, total_supplier: 0, total_transaksi: 0 },
      loading: true
    };
  },
  async mounted() {
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
    <div style="max-width:1280px;margin:0 auto;padding:32px 16px;">
      <!-- Header -->
      <div style="margin-bottom:32px;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <h1 style="color:#f1f5f9;font-size:1.875rem;font-weight:900;display:flex;align-items:center;gap:12px;margin:0;">
            <i class="fa fa-gauge" style="color:#818cf8;"></i>Dashboard Admin
          </h1>
          <p style="color:#94a3b8;font-size:0.875rem;margin:8px 0 0;">Selamat datang! Berikut ringkasan inventaris terkini.</p>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" style="text-align:center;padding:80px;color:#64748b;">
        <i class="fa fa-spinner fa-spin" style="font-size:2.5rem;"></i>
        <p style="margin-top:12px;">Memuat data...</p>
      </div>

      <!-- Stats Cards -->
      <div v-else>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px;margin-bottom:40px;">
          <div class="card-anim hover-lift" style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-top:4px solid #6366f1;border-radius:16px;padding:24px;cursor:default;">
            <p style="color:#94a3b8;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin:0 0 12px;">Total Barang</p>
            <p style="color:#818cf8;font-size:3rem;font-weight:900;margin:0;">{{ summary.total_barang }}</p>
            <p style="color:#64748b;font-size:0.75rem;margin:16px 0 0;display:flex;align-items:center;gap:8px;"><i class="fa fa-box"></i> Item tercatat</p>
          </div>
          <div class="card-anim hover-lift" style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-top:4px solid #10b981;border-radius:16px;padding:24px;cursor:default;">
            <p style="color:#94a3b8;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin:0 0 12px;">Kategori</p>
            <p style="color:#10b981;font-size:3rem;font-weight:900;margin:0;">{{ summary.total_kategori }}</p>
            <p style="color:#64748b;font-size:0.75rem;margin:16px 0 0;display:flex;align-items:center;gap:8px;"><i class="fa fa-tags"></i> Jenis kategori</p>
          </div>
          <div class="card-anim hover-lift" style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-top:4px solid #f59e0b;border-radius:16px;padding:24px;cursor:default;">
            <p style="color:#94a3b8;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin:0 0 12px;">Supplier</p>
            <p style="color:#f59e0b;font-size:3rem;font-weight:900;margin:0;">{{ summary.total_supplier }}</p>
            <p style="color:#64748b;font-size:0.75rem;margin:16px 0 0;display:flex;align-items:center;gap:8px;"><i class="fa fa-truck"></i> Mitra supplier</p>
          </div>
          <div class="card-anim hover-lift" style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-top:4px solid #f43f5e;border-radius:16px;padding:24px;cursor:default;">
            <p style="color:#94a3b8;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin:0 0 12px;">Transaksi</p>
            <p style="color:#f43f5e;font-size:3rem;font-weight:900;margin:0;">{{ summary.total_transaksi }}</p>
            <p style="color:#64748b;font-size:0.75rem;margin:16px 0 0;display:flex;align-items:center;gap:8px;"><i class="fa fa-right-left"></i> Riwayat masuk/keluar</p>
          </div>
        </div>

        <!-- Quick Access -->
        <div style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-radius:16px;padding:32px;">
          <h2 style="color:#e2e8f0;font-size:1.25rem;font-weight:700;margin:0 0 24px;display:flex;align-items:center;gap:8px;">
            <i class="fa fa-bolt" style="color:#f59e0b;"></i> Akses Cepat
          </h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px;">
            <router-link to="/barang" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;background:#0F172A;border:1px solid #334155;border-radius:16px;text-decoration:none;transition:all 0.3s;" onmouseover="this.style.borderColor='rgba(99,102,241,0.5)';this.style.background='rgba(99,102,241,0.1)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#334155';this.style.background='#0F172A';this.style.transform='translateY(0)'">
              <div style="width:56px;height:56px;border-radius:50%;background:rgba(99,102,241,0.2);display:flex;align-items:center;justify-content:center;">
                <i class="fa fa-box" style="color:#818cf8;font-size:1.5rem;"></i>
              </div>
              <span style="color:#cbd5e1;font-size:0.875rem;font-weight:600;">Kelola Barang</span>
            </router-link>
            <router-link to="/kategori" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;background:#0F172A;border:1px solid #334155;border-radius:16px;text-decoration:none;transition:all 0.3s;" onmouseover="this.style.borderColor='rgba(16,185,129,0.5)';this.style.background='rgba(16,185,129,0.1)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#334155';this.style.background='#0F172A';this.style.transform='translateY(0)'">
              <div style="width:56px;height:56px;border-radius:50%;background:rgba(16,185,129,0.2);display:flex;align-items:center;justify-content:center;">
                <i class="fa fa-tags" style="color:#10b981;font-size:1.5rem;"></i>
              </div>
              <span style="color:#cbd5e1;font-size:0.875rem;font-weight:600;">Kelola Kategori</span>
            </router-link>
            <router-link to="/supplier" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;background:#0F172A;border:1px solid #334155;border-radius:16px;text-decoration:none;transition:all 0.3s;" onmouseover="this.style.borderColor='rgba(245,158,11,0.5)';this.style.background='rgba(245,158,11,0.1)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#334155';this.style.background='#0F172A';this.style.transform='translateY(0)'">
              <div style="width:56px;height:56px;border-radius:50%;background:rgba(245,158,11,0.2);display:flex;align-items:center;justify-content:center;">
                <i class="fa fa-truck" style="color:#f59e0b;font-size:1.5rem;"></i>
              </div>
              <span style="color:#cbd5e1;font-size:0.875rem;font-weight:600;">Kelola Supplier</span>
            </router-link>
            <router-link to="/transaksi" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;background:#0F172A;border:1px solid #334155;border-radius:16px;text-decoration:none;transition:all 0.3s;" onmouseover="this.style.borderColor='rgba(244,63,94,0.5)';this.style.background='rgba(244,63,94,0.1)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#334155';this.style.background='#0F172A';this.style.transform='translateY(0)'">
              <div style="width:56px;height:56px;border-radius:50%;background:rgba(244,63,94,0.2);display:flex;align-items:center;justify-content:center;">
                <i class="fa fa-right-left" style="color:#f43f5e;font-size:1.5rem;"></i>
              </div>
              <span style="color:#cbd5e1;font-size:0.875rem;font-weight:600;">Catat Transaksi</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  `
};