<?php

return [
    'allowed_keys' => array_filter(
        explode(',', env('APP_X_API_KEY', ''))
    ),
];
