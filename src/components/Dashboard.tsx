import React from 'react';
import { Plus, History, FileText, Upload } from 'lucide-react';
import { ListingCard } from './ListingCard';

export function Dashboard() {
  const recentListings = [
    {
      id: 1,
      title: "Modern Beachfront Villa",
      status: "draft",
      lastModified: "2024-03-15",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      id: 2,
      title: "City Center Apartment",
      status: "published",
      lastModified: "2024-03-14",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=600&h=400"
    }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Property Listings</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          New Listing
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Listings</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <History className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Published This Month</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Social Shares</p>
              <p className="text-2xl font-semibold">156</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}