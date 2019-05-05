<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    { 
    	Model::unguard();

        $user = User::create([
           'name' => $name,
           'email' => $email,
           'password' => bcrypt($password),
        ]);
        $user->assignRole('admin');
        return $user->toArray();
    }
}
