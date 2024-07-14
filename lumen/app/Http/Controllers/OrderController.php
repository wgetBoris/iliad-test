<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::all());
    }

    public function show($id)
    {
        $order = Order::with('products')->find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return response()->json($order);
    }

    public function store(Request $request)
    {

        $this->validate($request, [
            'name' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
            'products' => 'required|array', // Assuming products is an array of product data
            'products.*.name' => 'required|string',
            'products.*.price' => 'required|numeric',
        ]);


        try {
            // Create the order
            $order = Order::create([
                'name' => $request->name,
                'description' => $request->description,
                'date' => $request->date,
            ]);

            // Attach products to the order
            foreach ($request->products as $productData) {
                $product = Product::create([
                    'name' => $productData['name'],
                    'price' => $productData['price'],
                    'order_id' => $order->id, // Associate product with the order
                ]);
                $order->products()->save($product);
            }

            return response()->json($order, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create order'], 500);
        }
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'string',
            'description' => 'string',
            'date' => 'date',
        ]);

        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->update($request->all());
        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();
        return response()->json(['message' => 'Order deleted']);
    }
}
