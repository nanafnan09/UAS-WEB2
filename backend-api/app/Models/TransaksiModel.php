<?php

namespace App\Models;

use CodeIgniter\Model;

class TransaksiModel extends Model
{
    protected $table         = 'transaksi';
    protected $primaryKey    = 'id';
    protected $allowedFields = ['barang_id', 'jenis', 'jumlah', 'keterangan', 'tanggal'];
    protected $useTimestamps = false;

    public function getTransaksiLengkap()
    {
        return $this->db->table('transaksi t')
            ->select('t.*, b.nama_barang, b.kode_barang')
            ->join('barang b', 'b.id = t.barang_id')
            ->orderBy('t.tanggal', 'DESC')
            ->get()
            ->getResultArray();
    }
}