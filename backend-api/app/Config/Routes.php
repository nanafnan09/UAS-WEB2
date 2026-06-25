<?php

use CodeIgniter\Router\RouteCollection;

// Handle CORS Preflight
$routes->options('(:any)', function() {});

// Public routes
$routes->post('api/login', 'AuthController::login');
$routes->get('api/summary', 'AuthController::summary');

// Protected routes (Resource Controllers)
$routes->resource('api/kategori', ['controller' => 'KategoriController']);
$routes->resource('api/supplier', ['controller' => 'SupplierController']);
$routes->resource('api/barang',   ['controller' => 'BarangController']);
$routes->resource('api/transaksi',['controller' => 'TransaksiController']);