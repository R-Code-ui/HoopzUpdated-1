<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\CartItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // 🔥 MERGE SESSION CART INTO DATABASE
        $sessionCart = session()->get('cart', []);

        foreach ($sessionCart as $item) {
            $existing = CartItem::where('user_id', Auth::id())
                ->where('product_id', $item['id'])
                ->first();

            if ($existing) {
                $existing->quantity += $item['quantity'];
                $existing->save();
            } else {
                CartItem::create([
                    'user_id'    => Auth::id(),
                    'product_id' => $item['id'],
                    'quantity'   => $item['quantity'],
                ]);
            }
        }

        // Clear session cart after merging
        session()->forget('cart');

        // ✅ REDIRECT BASED ON USER ROLE / PERMISSION
        // Check if the user is admin (has 'manage products' permission)
        if (Auth::user()->can('manage products')) {
            // Admin: go to admin dashboard
            return redirect()->route('admin.dashboard');
        }

        // Regular user: go to products page (or intended URL)
        return redirect()->intended('/products');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
