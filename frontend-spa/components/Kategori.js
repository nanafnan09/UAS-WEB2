const Kategori = {
  data() {
    return {
      list: [],
      loading: true,
      showModal: false,
      isEdit: false,
      form: { id: null, nama_kategori: '', deskripsi: '' },
      alertMsg: '',
      alertType: ''
    };
  },
  async mounted() { await this.fetchData(); },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const res = await axios.get('/api/kategori');
        this.list = res.data.data;
      } catch (e) { this.showAlert('Gagal memuat data.', 'error'); }
      finally { this.loading = false; }
    },
    openAdd() {
      this.isEdit = false;
      this.form = { id: null, nama_kategori: '', deskripsi: '' };
      this.showModal = true;
    },
    openEdit(item) {
      this.isEdit = true;
      this.form = { ...item };
      this.showModal = true;
    },
    async save() {
      try {
        if (this.isEdit) {
          await axios.put(`/api/kategori/${this.form.id}`, this.form);
          this.showAlert('Kategori berhasil diperbarui!', 'success');
        } else {
          await axios.post('/api/kategori', this.form);
          this.showAlert('Kategori berhasil ditambahkan!', 'success');
        }
        this.showModal = false;
        await this.fetchData();
      } catch (e) { this.showAlert('Gagal menyimpan data.', 'error'); }
    },
    async hapus(id) {
      if (!confirm('Yakin ingin menghapus kategori ini?')) return;
      try {
        await axios.delete(`/api/kategori/${id}`);
        this.showAlert('Kategori berhasil dihapus!', 'success');
        await this.fetchData();
      } catch (e) { this.showAlert('Gagal menghapus data.', 'error'); }
    },
    showAlert(msg, type) {
      this.alertMsg = msg;
      this.alertType = type;
      setTimeout(() => this.alertMsg = '', 3000);
    }
  },
  template: `
    <div class="max-w-5xl mx-auto px-4 py-8" data-aos="fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-100"><i class="fa fa-tags text-emerald-400 mr-2"></i>Kategori Barang</h1>
          <p class="text-slate-400 text-sm mt-1">Kelola kategori untuk pengelompokan barang.</p>
        </div>
        <button @click="openAdd"
          class="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] hover:-translate-y-0.5">
          <i class="fa fa-plus"></i> Tambah Kategori
        </button>
      </div>

      <!-- Alert -->
      <div v-if="alertMsg" :class="alertType === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50' : 'bg-rose-500/10 text-rose-400 border-rose-500/50'"
        class="border px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2 animate-fade-in-up">
        <i :class="alertType === 'success' ? 'fa fa-check-circle' : 'fa fa-exclamation-circle'"></i>
        {{ alertMsg }}
      </div>

      <!-- Table -->
      <div class="glass-card rounded-2xl overflow-hidden shadow-xl" data-aos="fade-up" data-aos-delay="100">
        <div v-if="loading" class="text-center py-16 text-slate-500">
          <i class="fa fa-spinner fa-spin text-4xl"></i>
          <p class="mt-3">Memuat data...</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="bg-darkcard border-b border-darkborder text-slate-300 uppercase text-xs font-semibold">
              <tr>
                <th class="px-6 py-4">#</th>
                <th class="px-6 py-4">Nama Kategori</th>
                <th class="px-6 py-4">Deskripsi</th>
                <th class="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-darkborder">
              <tr v-if="list.length === 0"><td colspan="4" class="text-center py-12 text-slate-500">Belum ada data kategori.</td></tr>
              <tr v-for="(item, i) in list" :key="item.id" class="hover:bg-slate-800/50 transition-colors group">
                <td class="px-6 py-4 text-slate-500">{{ i + 1 }}</td>
                <td class="px-6 py-4 font-medium text-slate-200 group-hover:text-emerald-300 transition-colors">{{ item.nama_kategori }}</td>
                <td class="px-6 py-4 text-slate-400">{{ item.deskripsi || '-' }}</td>
                <td class="px-6 py-4 text-center space-x-2">
                  <button @click="openEdit(item)" class="bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300">
                    <i class="fa fa-edit mr-1"></i>Edit
                  </button>
                  <button @click="hapus(item.id)" class="bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300">
                    <i class="fa fa-trash mr-1"></i>Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay-anim" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:70px 16px 16px;">
        <div class="modal-card-anim" style="background:#1E293B;border:1px solid #334155;border-radius:16px;width:100%;max-width:860px;max-height:calc(100vh - 90px);overflow-y:auto;padding:28px;">
          <h2 class="text-2xl font-bold text-slate-100 mb-8 flex items-center border-b border-darkborder pb-4">
            <div class="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
              <i class="fa fa-tags text-emerald-400 text-xl"></i>
            </div>
            {{ isEdit ? 'Edit Data Kategori' : 'Tambah Kategori Baru' }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-slate-300 mb-2">Nama Kategori <span class="text-rose-500">*</span></label>
                <input v-model="form.nama_kategori" type="text" placeholder="Masukkan nama kategori" class="w-full bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-inner"/>
              </div>
            </div>
            
            <div class="space-y-6">
              <div class="h-full flex flex-col">
                <label class="block text-sm font-semibold text-slate-300 mb-2">Deskripsi Lengkap</label>
                <textarea v-model="form.deskripsi" placeholder="Masukkan deskripsi kategori (opsional)" class="w-full flex-grow bg-darkbg border border-darkborder rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition-all shadow-inner"></textarea>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-4 mt-10 pt-6 border-t border-darkborder">
            <button @click="showModal = false" class="px-6 py-3 text-sm font-medium text-slate-300 bg-darkbg hover:bg-slate-800 border border-darkborder rounded-xl transition-all duration-300">Tutup Batal</button>
            <button @click="save" class="px-8 py-3 text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:-translate-y-1"><i class="fa fa-save mr-2"></i>{{ isEdit ? 'Simpan Perubahan' : 'Simpan Data Baru' }}</button>
          </div>
        </div>
      </div>
    </div>
  `
};