<?php

namespace App\Models;

use CodeIgniter\Model;

class BarangModel extends Model
{
    protected $table         = 'barang';
    protected $primaryKey    = 'id';
    protected $allowedFields = ['kode_barang', 'nama_barang', 'kategori_id', 'supplier_id', 'stok', 'harga', 'satuan'];
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = '';

    // Join dengan kategori dan supplier
    public function getBarangLengkap()
    {
        return $this->db->table('barang b')
            ->select('b.*, k.nama_kategori, s.nama_supplier')
            ->join('kategori k', 'k.id = b.kategori_id')
            ->join('supplier s', 's.id = b.supplier_id')
            ->get()
            ->getResultArray();
    }

    public function getBarangById($id)
    {
        return $this->db->table('barang b')
            ->select('b.*, k.nama_kategori, s.nama_supplier')
            ->join('kategori k', 'k.id = b.kategori_id')
            ->join('supplier s', 's.id = b.supplier_id')
            ->where('b.id', $id)
            ->get()
            ->getRowArray();
    }
}