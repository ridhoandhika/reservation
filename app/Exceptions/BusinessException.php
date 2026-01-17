<?php

namespace App\Exceptions;

use Exception;

class BusinessException extends Exception
{
    protected int $status;

    public function __construct(
        string $message = 'Business error',
        int $status = 400
    ) {
        parent::__construct($message);
        $this->status = $status;
    }

    public function getStatus(): int
    {
        return $this->status;
    }
}
