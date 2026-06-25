<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use App\Filters\AuthFilter;
use App\Filters\CorsFilter;

class Filters extends BaseConfig
{
    public array $aliases = [
        'csrf'          => \CodeIgniter\Filters\CSRF::class,
        'toolbar'       => \CodeIgniter\Filters\DebugToolbar::class,
        'honeypot'      => \CodeIgniter\Filters\Honeypot::class,
        'invalidchars'  => \CodeIgniter\Filters\InvalidChars::class,
        'secureheaders' => \CodeIgniter\Filters\SecureHeaders::class,
        'cors'          => CorsFilter::class,
        'auth'          => AuthFilter::class,
    ];

    public array $globals = [
        'before' => [
            'cors',
        ],
        'after' => [],
    ];

    // JANGAN pakai $methods karena akan memblokir semua POST termasuk login
    public array $methods = [];

    // Proteksi hanya pada route tertentu saja
    public array $filters = [
        'auth' => [
            'before' => [
                'api/kategori*',
                'api/supplier*',
                'api/barang*',
                'api/transaksi*',
            ]
        ]
    ];
}