const Barang = {
  data() {
    return {
      list: [], kategoris: [], suppliers: [],
      loading: true, showModal: false, isEdit: false,
      form: { id: null, kode_barang: '', nama_barang: '', kategori_id: '', supplier_id: '', stok: 0, harga: 0, satuan: '' },
      alertMsg: '', alertType: '', search: ''
    };
  },
  computed: {
    filtered() {
      if (!this.search) return this.list;
      const q = this.search.toLowerCase();
      return this.list.filter(b =>
        b.nama_barang.toLowerCase().includes(q) ||
        b.kode_barang.toLowerCase().includes(q) ||
        b.nama_kategori?.toLowerCase().includes(q)
      );
    }
  },
  async mounted() {
    await Promise.all([this.fetchData(), this.fetchKategori(), this.fetchSupplier()]);
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try { const res = await axios.get('/api/barang'); this.list = res.data.data; }
      catch (e) { this.showAlert('Gagal memuat data.', 'error'); }
      finally { this.loading = false; }
    },
    async fetchKategori() {
      const res = await axios.get('/api/kategori'); this.kategoris = res.data.data;
    },
    async fetchSupplier() {
      const res = await axios.get('/api/supplier'); this.suppliers = res.data.data;
    },
    openAdd() {
      this.isEdit = false;
      this.form = { id: null, kode_barang: '', nama_barang: '', kategori_id: '', supplier_id: '', stok: 0, harga: 0, satuan: '' };
      this.showModal = true;
    },
    openEdit(item) {
      this.isEdit = true;
      this.form = { ...item };
      this.showModal = true;
    },
    async save() {
      try {
        if (this.isEdit) { await axios.put(`/api/barang/${this.form.id}`, this.form); this.showAlert('Barang diperbarui!', 'success'); }
        else { await axios.post('/api/barang', this.form); this.showAlert('Barang ditambahkan!', 'success'); }
        this.showModal = false; await this.fetchData();
      } catch (e) { this.showAlert(e.response?.data?.message || 'Gagal menyimpan.', 'error'); }
    },
    async hapus(id) {
      if (!confirm('Yakin ingin menghapus barang ini?')) return;
      try { await axios.delete(`/api/barang/${id}`); this.showAlert('Barang dihapus!', 'success'); await this.fetchData(); }
      catch (e) { this.showAlert('Gagal menghapus.', 'error'); }
    },
    showAlert(msg, type) { this.alertMsg = msg; this.alertType = type; setTimeout(() => this.alertMsg = '', 3500); },
    formatRupiah(num) { return 'Rp ' + Number(num).toLocaleString('id-ID'); }
  },
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8" data-aos="fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-100"><i class="fa fa-box text-indigo-400 mr-2"></i>Data Barang</h1>
          <p class="text-slate-400 text-sm mt-1">Kelola seluruh data inventaris barang.</p>
        </div>
        <button @click="openAdd" class="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.5)] hover:-translate-y-0.5">
          <i class="fa fa-plus"></i> Tambah Barang
        </button>
      </div>

      <div v-if="alertMsg" :class="alertType === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50' : 'bg-rose-500/10 text-rose-400 border-rose-500/50'"
        class="border px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2 animate-fade-in-up">
        <i :class="alertType === 'success' ? 'fa fa-check-circle' : 'fa fa-exclamation-circle'"></i> {{ alertMsg }}
      </div>

      <!-- Search -->
      <div class="mb-6" data-aos="fade-up">
        <div class="relative max-w-sm group">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"><i class="fa fa-search"></i></span>
          <input v-model="search" type="text" placeholder="Cari barang atau kategori..."
            class="w-full bg-darkcard border border-darkborder pl-10 pr-4 py-2.5 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-lg"/>
        </div>
      </div>

      <div class="glass-card rounded-2xl overflow-x-auto shadow-xl" data-aos="fade-up" data-aos-delay="100">
        <div v-if="loading" class="text-center py-16 text-slate-500"><i class="fa fa-spinner fa-spin text-4xl"></i><p class="mt-3">Memuat data...</p></div>
        <table v-else class="w-full text-sm text-left whitespace-nowrap">
          <thead class="bg-darkcard border-b border-darkborder text-slate-300 uppercase text-xs font-semibold">
            <tr>
              <th class="px-6 py-4">#</th>
              <th class="px-6 py-4">Kode</th>
              <th class="px-6 py-4">Nama Barang</th>
              <th class="px-6 py-4">Kategori</th>
              <th class="px-6 py-4">Supplier</th>
              <th class="px-6 py-4 text-center">Stok</th>
              <th class="px-6 py-4 text-right">Harga</th>
              <th class="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-darkborder">
            <tr v-if="filtered.length === 0"><td colspan="8" class="text-center py-12 text-slate-500">Tidak ada data barang.</td></tr>
            <tr v-for="(item, i) in filtered" :key="item.id" class="hover:bg-slate-800/50 transition-colors group">
              <td class="px-6 py-4 text-slate-500">{{ i + 1 }}</td>
              <td class="px-6 py-4"><span class="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs px-2 py-1 rounded font-mono">{{ item.kode_barang }}</span></td>
              <td class="px-6 py-4 font-medium text-slate-200 group-hover:text-indigo-300 transition-colors">{{ item.nama_barang }}</td>
              <td class="px-6 py-4 text-slate-400">{{ item.nama_kategori }}</td>
              <td class="px-6 py-4 text-slate-400">{{ item.nama_supplier }}</td>
              <td class="px-6 py-4 text-center">
                <span :class="item.stok <= 5 ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'" class="text-xs px-3 py-1 border rounded-full font-semibold">
                  {{ item.stok }} {{ item.satuan }}
                </span>
              </td>
              <td class="px-6 py-4 text-right text-slate-300 font-medium">{{ formatRupiah(item.harga) }}</td>
              <td class="px-6 py-4 text-center space-x-2">
                <button @click="openEdit(item)" class="bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300"><i class="fa fa-edit mr-1"></i>Edit</button>
                <button @click="hapus(item.id)" class="bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300"><i class="fa fa-trash mr-1"></i>Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay-anim" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:70px 16px 16px;">
        <div class="modal-card-anim" style="background:#1E293B;border:1px solid #334155;border-radius:16px;width:100%;max-width:1050px;max-height:calc(100vh - 90px);overflow-y:auto;padding:28px;">
          <h2 class="text-2xl font-bold text-slate-100 mb-8 flex items-center border-b border-darkborder pb-4">
            <div class="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
              <i class="fa fa-box text-indigo-400 text-xl"></i>
            </div>
            {{ isEdit ? 'Edit Data Barang' : 'Tambah Barang Baru' }}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Col 1 -->
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-slate-300 mb-2">Kode Barang <span class="text-rose-500">*</span></label>
                <input v-model="form.kode_barang" type="text" placeholder="Contoh: BRG001" class="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner"/>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-300 mb-2">Nama Barang <span class="text-rose-500">*</span></label>
                <input v-model="form.nama_barang" type="text" placeholder="Nama lengkap barang" class="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner"/>
              </div>
            </div>
            
            <!-- Col 2 -->
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-slate-300 mb-2">Kategori Barang <span class="text-rose-500">*</span></label>
                <select v-model="form.kategori_id" class="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner">
                  <option value="" class="bg-darkcard">-- Pilih Kategori --</option>
                  <option v-for="k in kategoris" :key="k.id" :value="k.id" class="bg-darkcard">{{ k.nama_kategori }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-300 mb-2">Pilih Supplier <span class="text-rose-500">*</span></label>
                <select v-model="form.supplier_id" class="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner">
                  <option value="" class="bg-darkcard">-- Pilih Supplier --</option>
                  <option v-for="s in suppliers" :key="s.id" :value="s.id" class="bg-darkcard">{{ s.nama_supplier }}</option>
                </select>
              </div>
            </div>
            
            <!-- Col 3 -->
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="flex-1">
                  <label class="block text-sm font-semibold text-slate-300 mb-2">Stok Awal</label>
                  <input v-model.number="form.stok" type="number" min="0" class="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner"/>
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-semibold text-slate-300 mb-2">Satuan</label>
                  <input v-model="form.satuan" type="text" placeholder="Unit/Kg/Pcs" class="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner"/>
                </div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-300 mb-2">Harga (Rp)</label>
                <input v-model.number="form.harga" type="number" min="0" class="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner"/>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end gap-4 mt-10 pt-6 border-t border-darkborder">
            <button @click="showModal = false" class="px-6 py-3 text-sm font-medium text-slate-300 bg-darkbg hover:bg-slate-800 border border-darkborder rounded-xl transition-all duration-300">Tutup Batal</button>
            <button @click="save" class="px-8 py-3 text-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:-translate-y-1"><i class="fa fa-save mr-2"></i>{{ isEdit ? 'Simpan Perubahan' : 'Simpan Data Baru' }}</button>
          </div>
        </div>
      </div>
    </div>
  `
};