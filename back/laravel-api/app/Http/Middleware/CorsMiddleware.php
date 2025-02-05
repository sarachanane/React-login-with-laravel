<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    public function handle($request, Closure $next)
    {
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*') // Allow all origins or specify your frontend URL
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Allowed methods
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    }
}
