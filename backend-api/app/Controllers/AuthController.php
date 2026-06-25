<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;
use App\Models\BarangModel;
use App\Models\KategoriModel;
use App\Models\SupplierModel;
use App\Models\TransaksiModel;

class AuthController extends ResourceController
{
    protected $format = 'json';

    public function login()
    {
        $input = $this->request->getJSON(true);
        $username = $input['username'] ?? '';
        $password = $input['password'] ?? '';

        $userModel = new UserModel();
        $user = $userModel->where('username', $username)->first();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->respond([
                'status'  => 401,
                'message' => 'Username atau password salah!'
            ], 401);
        }

        // Generate token sederhana
        $token = bin2hex(random_bytes(32));
        $userModel->update($user['id'], ['token' => $token]);

        return $this->respond([
            'status'  => 200,
            'message' => 'Login berhasil!',
            'data'    => [
                'token' => $token,
                'nama'  => $user['nama'],
            ]
        ]);
    }

    public function summary()
    {
        $barangModel    = new BarangModel();
        $kategoriModel  = new KategoriModel();
        $supplierModel  = new SupplierModel();
        $transaksiModel = new TransaksiModel();

        return $this->respond([
            'status' => 200,
            'data'   => [
                'total_barang'    => $barangModel->countAll(),
                'total_kategori'  => $kategoriModel->countAll(),
                'total_supplier'  => $supplierModel->countAll(),
                'total_transaksi' => $transaksiModel->countAll(),
            ]
        ]);
    }
}