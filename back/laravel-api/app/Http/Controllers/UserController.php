<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;



class UserController extends Controller
{
    // Get user by username
    public function getUser($username)
    {
        $user = DB::table('user')->where('username', $username)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }

    public function getEmail($email)
    {
        $user = DB::table('user')->where('email', $email)->first();

        if (!$user) {
            return response()->json(['error' => 'email not found'], 404);
        }

        return response()->json($user, 200);
    }

// Register a new user
public function register(Request $request)
{
    // Validate the incoming request data
    $validated = $request->validate([
        'username' => 'required|max:255',
        'email' => 'required|email|max:255',
        'password' => 'required|min:6',
    ]);

    // Check if the username already exists
    $existingUser = DB::table('user')->where('username', $request->username)->first();
    if ($existingUser) {
        return response()->json(['error' => 'Username already exists'], 400);
    }

    // Check if the email already exists
    $existingEmail = DB::table('user')->where('email', $request->email)->first();
    if ($existingEmail) {
        return response()->json(['error' => 'Email already exists'], 400);
    }

    // Hash the password
    $hashedPassword = Hash::make($request->password);

    // Insert the new user into the database
    DB::table('user')->insert([
        'username' => $request->username,
        'email' => $request->email,
        'password' => $hashedPassword,
    ]);

    // Return a successful response
    return response()->json(['message' => 'User registered successfully'], 201);
}


    // Login a user
    public function login(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        // Retrieve the user by username
        $user = DB::table('user')->where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        return response()->json(['message' => 'Login successful'], 200);
    }


    // Login a user
    public function googleauth(Request $request)
{
    // Validate the incoming request data
    $validated = $request->validate([
        'username' => 'required',
        'email' => 'required|email',
        'id' => 'required', // Google ID
    ]);

    // Check if the user exists in the database
    $user = DB::table('user')->where('username', $request->username)->first();

    if ($user) {
        // User exists, return a login success response
        return response()->json(['message' => 'User logged in successfully'], 200);
    } else {
        // User does not exist, register a new user
        DB::table('user')->insert([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->id), // Hash Google ID as a placeholder password
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'User registered and login successfully'], 201);
    }
}


public function edit(Request $request)
{
    // Validate the input data
    $validated = $request->validate([
        'id' => 'required|integer|exists:user,id', // Ensure the ID exists in the 'user' table
        'username' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'password' => 'required|string',
    ]);

    // Check if the user exists
    $user = DB::table('user')->where('id', $validated['id'])->first();

    if (!$user) {
        // Return an error if the user is not found
        return response()->json(['error' => 'User not found'], 404);
    }

    // Update the user in the database
    $updated = DB::table('user')
        ->where('id', $validated['id'])
        ->update([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']), // Encrypt the password
            'updated_at' => now(), // Optional: Update the timestamp
        ]);

    if ($updated) {
        // Return a success response if the update was successful
        return response()->json(['message' => 'User updated successfully'], 200);
    } else {
        // Handle the unlikely case of no rows being updated
        return response()->json(['error' => 'Failed to update user'], 500);
    }
}


}


