<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminUsersController extends Controller
{
    public function index(Request $request)
    {
        $actor = $request->user();

        if (! $this->canViewUsers($actor)) {
            return response()->json(['message' => 'Accès refusé.'], 403);
        }

        $query = User::query()->orderByDesc('id');

        if ($request->filled('q')) {
            $q = trim((string) $request->input('q'));
            $query->where(function ($sub) use ($q) {
                $sub->where('name', 'like', "%{$q}%")
                    ->orWhere('email', 'like', "%{$q}%");
            });
        }

        return response()->json($query->paginate(20));
    }

    public function store(Request $request)
    {
        $actor = $request->user();

        if (! $this->canCreateUsers($actor)) {
            return response()->json(['message' => 'Accès refusé.'], 403);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'role' => ['required', Rule::in(['super_admin', 'admin', 'editor'])],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ], [
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
        ]);

        if ($actor->role === 'admin' && $validated['role'] !== 'editor') {
            return response()->json(['message' => 'Un admin ne peut créer que des utilisateurs éditeurs.'], 403);
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json($user, 201);
    }

    public function update(Request $request, User $user)
    {
        $actor = $request->user();

        if (! $this->canUpdateUser($actor, $user)) {
            return response()->json(['message' => 'Accès refusé.'], 403);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'role' => ['sometimes', 'required', Rule::in(['super_admin', 'admin', 'editor'])],
        ]);

        if ($actor->role === 'admin') {
            if ($user->role !== 'editor') {
                return response()->json(['message' => 'Un admin ne peut modifier que des utilisateurs éditeurs.'], 403);
            }
            if (array_key_exists('role', $validated) && $validated['role'] !== 'editor') {
                return response()->json(['message' => 'Un admin ne peut attribuer que le rôle éditeur.'], 403);
            }
        }

        $user->fill($validated);
        $user->save();

        return response()->json($user);
    }

    public function toggleActive(Request $request, User $user)
    {
        $actor = $request->user();

        if ($actor->id === $user->id) {
            return response()->json(['message' => 'Vous ne pouvez pas désactiver votre propre compte.'], 422);
        }

        if (! $this->canToggleActive($actor, $user)) {
            return response()->json(['message' => 'Accès refusé.'], 403);
        }

        $user->is_active = ! $user->is_active;
        $user->save();

        return response()->json($user);
    }

    private function canViewUsers(?User $actor): bool
    {
        if (! $actor) {
            return false;
        }

        return in_array($actor->role, ['super_admin', 'admin'], true);
    }

    private function canCreateUsers(?User $actor): bool
    {
        if (! $actor) {
            return false;
        }

        return in_array($actor->role, ['super_admin', 'admin'], true);
    }

    private function canUpdateUser(?User $actor, User $target): bool
    {
        if (! $actor) {
            return false;
        }

        if ($actor->role === 'super_admin') {
            return true;
        }

        if ($actor->role === 'admin') {
            return $target->role === 'editor';
        }

        return false;
    }

    private function canToggleActive(?User $actor, User $target): bool
    {
        if (! $actor) {
            return false;
        }

        if ($actor->role === 'super_admin') {
            return true;
        }

        if ($actor->role === 'admin') {
            return $target->role === 'editor';
        }

        return false;
    }
}
