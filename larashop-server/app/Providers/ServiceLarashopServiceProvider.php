<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ServiceLarashopServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            \App\Services\Larashop\AuthService\AuthServiceInterface::class,
            \App\Services\Larashop\AuthService\AuthService::class
        );
        // $this->app->bind(
        //     \App\Services\Larashop\DealService\DealServiceInterface::class,
        //     \App\Services\Larashop\DealService\DealService::class
        // );
        // $this->app->bind(
        //     \App\Services\Larashop\ImageService\ImageServiceInterface::class,
        //     \App\Services\Larashop\ImageService\ImageService::class
        // );
        // $this->app->bind(
        //     \App\Services\Larashop\ProductService\ProductServiceInterface::class,
        //     \App\Services\Larashop\ProductService\ProductService::class
        // );
        // $this->app->bind(
        //     \App\Services\Larashop\UserService\UserServiceInterface::class,
        //     \App\Services\Larashop\UserService\UserService::class
        // );

        // envがtestingか、services.stripe.secretが設定されていない場合はStripeServiceのモックを返す
        // if (app()->environment('testing') || empty(config('services.stripe.secret'))) {
        //     $this->app->bind(
        //         \App\Services\Larashop\StripeService\StripeServiceInterface::class,
        //         \App\Services\Larashop\StripeService\StripeServiceMock::class
        //     );
        // } else {
        //     $this->app->bind(
        //         \App\Services\Larashop\StripeService\StripeServiceInterface::class,
        //         \App\Services\Larashop\StripeService\StripeService::class
        //     );
        // }


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
