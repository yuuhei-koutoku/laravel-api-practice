<?php

namespace App\Http\Controllers\Larashop\API;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\APIBusinessLogicException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Larashop\API\Product\IndexRequest;
use App\Http\Requests\Larashop\API\Product\StoreRequest;
use App\Http\Requests\Larashop\API\Product\ShowRequest;
use App\Http\Resources\Larashop\API\ProductCollection;
use App\Http\Resources\Larashop\API\ProductResource;
use App\Services\Larashop\ProductService\Dtos\StoreCommand;
use App\Services\Larashop\ProductService\ProductServiceInterface;
use App\Services\Larashop\ProductService\Exceptions\IncompleteSellerInfoException;

use Illuminate\Http\Request;

class ProductController extends Controller
{

    /**
    * @var ProductServiceInterface
    */
    private $productService;

    /**
     * @param  ProductServiceInterface  $productService
     * @return void
     */
    public function __construct(
        ProductServiceInterface $productService
    )
    {
        $this->productService = $productService;
    }

    /**
     * 商品一覧取得API
     *
     * @param  IndexRequest  $request
     * @return ProductCollection
     */
    // public function index(IndexRequest $request)
    // {
    //     $products = $this->productService->get();

    //     return new ProductCollection($products);
    // }

    /**
     * 出品API
     *
     * @param  StoreRequest  $request
     * @return ProductResource
     */
    public function store(StoreRequest $request)
    {
        $params = $request->safe();
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $storeCommand = new StoreCommand(
            $user,
            $params['name'],
            $params['description'],
            $params['price'],
            $params['images'],
        );
        try {
            $product = $this->productService->store($storeCommand);
        } catch (IncompleteSellerInfoException $e) {
            throw new APIBusinessLogicException($e->getMessage(), 400);
        }

        return new ProductResource($product);
    }

    /**
     * 商品一覧取得API
     *
     * @param  ShowRequest  $request
     * @return ProductResource
     */
    // public function show(ShowRequest $request, Product $product)
    // {
    //     return new ProductResource($product);
    // }
}
