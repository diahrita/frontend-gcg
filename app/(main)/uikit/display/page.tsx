'use client';

import React from 'react';

const Display = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-sm text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informasi Penting</h2>
                <p className="text-gray-600">Ini adalah contoh tampilan untuk menampilkan informasi. Anda bisa menambahkan detail lebih lanjut sesuai kebutuhan.</p>
                <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Selengkapnya</button>
            </div>
        </div>
    );
};

export default Display;
