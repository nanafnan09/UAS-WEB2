<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\TransaksiModel;
use App\Models\BarangModel;

class TransaksiController extends ResourceController
{
    protected $modelName = 'App\Models\TransaksiModel';
    protected $format    = 'json';

    public function index()
    {
        return $this->respond([
            'status' => 200,
            'data'   => $this->model->getTransaksiLengkap()
        ]);
    }

    public function create()
    {
        $input = $this->request->getJSON(true);

        // Update stok barang otomatis
        $barangModel = new BarangModel();
        $barang = $barangModel->find($input['barang_id']);
        if (!$barang) return $this->failNotFound('Barang tidak ditemukan.');

        $stokBaru = $barang['stok'];
        if ($input['jenis'] === 'masuk') {
            $stokBaru += (int)$input['jumlah'];
        } else {
            if ($barang['stok'] < $input['jumlah']) {
                return $this->fail('Stok tidak mencukupi!', 400);
            }
            $stokBaru -= (int)$input['jumlah'];
        }

        $input['tanggal'] = date('Y-m-d H:i:s');
        $this->model->save($input);
        $barangModel->update($input['barang_id'], ['stok' => $stokBaru]);

        return $this->respondCreated(['status' => 201, 'message' => 'Transaksi berhasil dicatat.']);
    }

    public function delete($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Transaksi tidak ditemukan.');
        $this->model->delete($id);
        return $this->respond(['status' => 200, 'message' => 'Transaksi berhasil dihapus.']);
    }
}