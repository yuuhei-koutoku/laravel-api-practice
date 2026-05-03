<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ServiceAdminServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // $this->app->bind(
        //     \App\Services\Admin\AuthService\AuthServiceInterface::class,
        //     \App\Services\Admin\AuthService\AuthService::class
        // );
        // $this->app->bind(
        //     \App\Services\Admin\DealService\DealServiceInterface::class,
        //     \App\Services\Admin\DealService\DealService::class
        // );
        // $this->app->bind(
        //     \App\Services\Admin\UserService\UserServiceInterface::class,
        //     \App\Services\Admin\UserService\UserService::class
        // );
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
