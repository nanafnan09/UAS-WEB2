<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserModel;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Handle OPTIONS preflight dulu
        if ($request->getMethod() === 'options') {
            return service('response')
                ->setStatusCode(200)
                ->setHeader('Access-Control-Allow-Origin', '*')
                ->setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With')
                ->setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        }

        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader || strpos($authHeader, 'Bearer ') !== 0) {
            return service('response')
                ->setStatusCode(401)
                ->setHeader('Access-Control-Allow-Origin', '*')
                ->setJSON(['status' => 401, 'message' => 'Unauthorized: Token tidak ditemukan.']);
        }

        $token = trim(substr($authHeader, 7));
        $userModel = new UserModel();
        $user = $userModel->where('token', $token)->first();

        if (!$user) {
            return service('response')
                ->setStatusCode(401)
                ->setHeader('Access-Control-Allow-Origin', '*')
                ->setJSON(['status' => 401, 'message' => 'Unauthorized: Token tidak valid.']);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        return $response;
    }
}