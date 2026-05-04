<?php

namespace App\Services\Larashop\ProductService;

use App\Models\Product;
use App\Models\User;
use App\Services\Larashop\ProductService\Dtos\StoreCommand;
use Illuminate\Support\Collection;

interface ProductServiceInterface
{
    /*
     * @return Collection<Product>
     */
    public function get(): Collection;
    public function store(StoreCommand $storeCommand): Product;
    /*
     * @return Collection<Product>
     */
    public function getPurchasedProductsByUser(User $user): Collection;
    /*
     * @return Collection<Product>
     */
    public function getListedProductsByUser(User $user): Collection;
}
