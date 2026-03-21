<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class DashboardController extends Controller
{
    public function index()
    {
        // Example: authorize using Gate (optional, since middleware already checks role)
        Gate::authorize('view dashboard');

        return Inertia::render('Admin/Dashboard');
    }
}
