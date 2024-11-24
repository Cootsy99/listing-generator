import React from 'react';
import { MoreVertical, Eye } from 'lucide-react';

interface ListingCardProps {
  listing: {
    id: number;
    title: string;
    status: string;
    lastModified: string;
    image: string;
  };
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative h-48">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <button className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            listing.status === 'published'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Last modified: {listing.lastModified}
        </p>
        <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Eye className="w-4 h-4 mr-2" />
          View Listing
        </button>
      </div>
    </div>
  );
}