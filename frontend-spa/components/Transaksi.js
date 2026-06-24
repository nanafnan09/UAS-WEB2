const Transaksi = {
  data() {
    return {
      list: [], barangs: [],
      loading: true, showModal: false,
      form: { barang_id: '', jenis: 'masuk', jumlah: 1, keterangan: '' },
      alertMsg: '', alertType: ''
    };
  },
  async mounted() {
    await Promise.all([this.fetchData(), this.fetchBarang()]);
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try { const res = await axios.get('/api/transaksi'); this.list = res.data.data; }
      catch (e) { this.showAlert('Gagal memuat transaksi.', 'error'); }
      finally { this.loading = false; }
    },
    async fetchBarang() {
      const res = await axios.get('/api/barang'); this.barangs = res.data.data;
    },
    openAdd() {
      this.form = { barang_id: '', jenis: 'masuk', jumlah: 1, keterangan: '' };
      this.showModal = true;
    },
    async save() {
      try {
        await axios.post('/api/transaksi', this.form);
        this.showAlert('Transaksi berhasil dicatat!', 'success');
        this.showModal = false;
        await this.fetchData();
        await this.fetchBarang();
      } catch (e) { this.showAlert(e.response?.data?.message || 'Gagal mencatat transaksi.', 'error'); }
    },
    async hapus(id) {
      if (!confirm('Hapus riwayat transaksi ini?')) return;
      try { await axios.delete(`/api/transaksi/${id}`); this.showAlert('Transaksi dihapus!', 'success'); await this.fetchData(); }
      catch (e) { this.showAlert('Gagal menghapus.', 'error'); }
    },
    showAlert(msg, type) { this.alertMsg = msg; this.alertType = type; setTimeout(() => this.alertMsg = '', 3500); },
    formatTanggal(tgl) {
      return new Date(tgl).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    }
  },
  template: `
    <div class="max-w-6xl mx-auto px-4 py-8" data-aos="fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-100"><i class="fa fa-right-left text-rose-400 mr-2"></i>Histori Transaksi</h1>
          <p class="text-slate-400 text-sm mt-1">Catat pergerakan stok barang masuk dan keluar.</p>
        </div>
        <button @click="openAdd" class="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(244,63,94,0.3)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.5)] hover:-translate-y-0.5">
          <i class="fa fa-plus"></i> Catat Transaksi
        </button>
      </div>

      <div v-if="alertMsg" :class="alertType === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50' : 'bg-rose-500/10 text-rose-400 border-rose-500/50'"
        class="border px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2 animate-fade-in-up">
        <i :class="alertType === 'success' ? 'fa fa-check-circle' : 'fa fa-exclamation-circle'"></i> {{ alertMsg }}
      </div>

      <div class="glass-card rounded-2xl overflow-x-auto shadow-xl" data-aos="fade-up" data-aos-delay="100">
        <div v-if="loading" class="text-center py-16 text-slate-500"><i class="fa fa-spinner fa-spin text-4xl"></i><p class="mt-3">Memuat data...</p></div>
        <table v-else class="w-full text-sm text-left whitespace-nowrap">
          <thead class="bg-darkcard border-b border-darkborder text-slate-300 uppercase text-xs font-semibold">
            <tr>
              <th class="px-6 py-4">#</th>
              <th class="px-6 py-4">Tanggal</th>
              <th class="px-6 py-4">Barang</th>
              <th class="px-6 py-4 text-center">Jenis</th>
              <th class="px-6 py-4 text-center">Jumlah</th>
              <th class="px-6 py-4">Keterangan</th>
              <th class="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-darkborder">
            <tr v-if="list.length === 0"><td colspan="7" class="text-center py-12 text-slate-500">Belum ada riwayat transaksi.</td></tr>
            <tr v-for="(item, i) in list" :key="item.id" class="hover:bg-slate-800/50 transition-colors group">
              <td class="px-6 py-4 text-slate-500">{{ i + 1 }}</td>
              <td class="px-6 py-4 text-slate-400">{{ formatTanggal(item.tanggal) }}</td>
              <td class="px-6 py-4">
                <span class="font-medium text-slate-200 group-hover:text-rose-300 transition-colors">{{ item.nama_barang }}</span>
                <span class="ml-2 text-xs text-slate-500 font-mono">({{ item.kode_barang }})</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span :class="item.jenis === 'masuk' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'" class="text-xs px-3 py-1 border rounded-full font-semibold uppercase">
                  <i :class="item.jenis === 'masuk' ? 'fa fa-arrow-down' : 'fa fa-arrow-up'" class="mr-1"></i>{{ item.jenis }}
                </span>
              </td>
              <td class="px-6 py-4 text-center font-bold text-slate-300">{{ item.jumlah }}</td>
              <td class="px-6 py-4 text-slate-500">{{ item.keterangan || '-' }}</td>
              <td class="px-6 py-4 text-center">
                <button @click="hapus(item.id)" class="bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300"><i class="fa fa-trash mr-1"></i>Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal v6 -->
      <div v-if="showModal" class="modal-overlay-anim" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:70px 16px 16px;">
        <div class="modal-card-anim" style="background:#1E293B;border:1px solid #334155;border-radius:16px;width:100%;max-width:860px;max-height:calc(100vh - 90px);overflow-y:auto;padding:28px;">

          <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #334155;">
            <span style="width:40px;height:40px;background:rgba(244,63,94,0.2);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fa fa-right-left" style="color:#fb7185;"></i></span>
            <h2 style="color:#f1f5f9;font-size:1.25rem;font-weight:800;margin:0;">Catat Transaksi Stok</h2>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
            <div>
              <label style="display:block;color:#cbd5e1;font-size:0.8rem;font-weight:600;margin-bottom:6px;">Barang <span style="color:#f43f5e;">*</span></label>
              <select v-model="form.barang_id" style="width:100%;background:#0F172A;border:1px solid #334155;border-radius:10px;padding:10px 14px;color:#e2e8f0;font-size:0.85rem;outline:none;box-sizing:border-box;">
                <option value="">-- Pilih Barang --</option>
                <option v-for="b in barangs" :key="b.id" :value="b.id">{{ b.nama_barang }} (Stok: {{ b.stok }})</option>
              </select>

              <label style="display:block;color:#cbd5e1;font-size:0.8rem;font-weight:600;margin-top:16px;margin-bottom:6px;">Jenis Transaksi <span style="color:#f43f5e;">*</span></label>
              <div style="background:#0F172A;border:1px solid #334155;border-radius:10px;padding:12px 16px;display:flex;gap:24px;">
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                  <input type="radio" v-model="form.jenis" value="masuk" />
                  <span style="color:#94a3b8;font-size:0.85rem;"><i class="fa fa-arrow-down" style="color:#10b981;margin-right:5px;"></i>Barang Masuk</span>
                </label>
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                  <input type="radio" v-model="form.jenis" value="keluar" />
                  <span style="color:#94a3b8;font-size:0.85rem;"><i class="fa fa-arrow-up" style="color:#f43f5e;margin-right:5px;"></i>Barang Keluar</span>
                </label>
              </div>
            </div>

            <div>
              <label style="display:block;color:#cbd5e1;font-size:0.8rem;font-weight:600;margin-bottom:6px;">Jumlah <span style="color:#f43f5e;">*</span></label>
              <input v-model.number="form.jumlah" type="number" min="1" style="width:100%;background:#0F172A;border:1px solid #334155;border-radius:10px;padding:10px 14px;color:#e2e8f0;font-size:0.85rem;outline:none;box-sizing:border-box;"/>

              <label style="display:block;color:#cbd5e1;font-size:0.8rem;font-weight:600;margin-top:16px;margin-bottom:6px;">Keterangan</label>
              <textarea v-model="form.keterangan" rows="3" placeholder="Keterangan opsional" style="width:100%;background:#0F172A;border:1px solid #334155;border-radius:10px;padding:10px 14px;color:#e2e8f0;font-size:0.85rem;outline:none;resize:none;box-sizing:border-box;"></textarea>
            </div>
          </div>

          <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid #334155;">
            <button @click="showModal = false" style="padding:10px 20px;background:#0F172A;color:#94a3b8;border:1px solid #334155;border-radius:10px;cursor:pointer;font-size:0.85rem;">Batal</button>
            <button @click="save" style="padding:10px 24px;background:linear-gradient(to right,#e11d48,#f43f5e);color:white;border:none;border-radius:10px;cursor:pointer;font-size:0.85rem;font-weight:700;"><i class="fa fa-save" style="margin-right:6px;"></i>Simpan Transaksi</button>
          </div>
        </div>
      </div>
    </div>
  `
};