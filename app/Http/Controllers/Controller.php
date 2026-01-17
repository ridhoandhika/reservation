<?php

namespace App\Http\Controllers;

abstract class Controller
{
    protected static function baseResponse(array $data, int $code = 200)
    {
        return response()->json([
            'status'  => $data['status'] ?? 200,
            'message' => $data['message'] ?? 'Success',
            'output'  => $data['output'] ?? [],
        ], $code);
    }
}
