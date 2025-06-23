'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Image from 'next/image';

export default function SupabaseTest() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data, error } = await supabase.from('cars').select('*');
        if (error) {
          setError(error.message);
          setCars([]);
        } else {
          setCars(data || []);
        }
      } catch (err) {
        setError('Failed to fetch cars');
        setCars([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  if (error) {
    return (
      <div className="p-4 m-4 border rounded bg-red-50">
        <h2 className="text-xl font-bold mb-2">Error Loading Cars</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 m-4">
      <h2 className="text-2xl font-bold mb-4">Available Cars</h2>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-gray-600">Loading cars...</p>
        </div>
      ) : cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="border rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src={car.image_url}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                <p className="text-gray-600 mb-2">{car.brand} {car.model}</p>
                <p className="text-gray-700 mb-2">{car.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-blue-600">₹{car.price_per_day}/day</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {car.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No cars available at the moment.</p>
        </div>
      )}
    </div>
  );
} 