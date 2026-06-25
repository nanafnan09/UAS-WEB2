<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\SupplierModel;

class SupplierController extends ResourceController
{
    protected $modelName = 'App\Models\SupplierModel';
    protected $format    = 'json';

    public function index()
    {
        return $this->respond(['status' => 200, 'data' => $this->model->findAll()]);
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Supplier tidak ditemukan.');
        return $this->respond(['status' => 200, 'data' => $data]);
    }

    public function create()
    {
        $input = $this->request->getJSON(true);
        if (!$this->model->save($input)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respondCreated(['status' => 201, 'message' => 'Supplier berhasil ditambahkan.']);
    }

    public function update($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Supplier tidak ditemukan.');

        $input = $this->request->getJSON(true);
        $this->model->update($id, $input);
        return $this->respond(['status' => 200, 'message' => 'Supplier berhasil diperbarui.']);
    }

    public function delete($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Supplier tidak ditemukan.');

        $this->model->delete($id);
        return $this->respond(['status' => 200, 'message' => 'Supplier berhasil dihapus.']);
    }
}