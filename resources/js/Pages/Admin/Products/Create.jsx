import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductForm from '@/Components/ProductForm';

export default function Create({ brands }) {
    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
                            <ProductForm
                                brands={brands}
                                submitUrl="/admin/products"
                                method="post"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
