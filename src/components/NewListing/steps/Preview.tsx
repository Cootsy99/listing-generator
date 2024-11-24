import React from 'react';
import { FileText, Share2 } from 'lucide-react';

interface PreviewProps {
  formData: any;
}

export function Preview({ formData }: PreviewProps) {
  return (
    <div className="space-y-8">
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{formData.propertyDetails.title}</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">{formData.propertyDetails.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-medium">{formData.propertyDetails.price}</p>
          </div>
        </div>
        <div className="prose max-w-none">
          {formData.generatedListing ? (
            <div dangerouslySetInnerHTML={{ __html: formData.generatedListing }} />
          ) : (
            <p className="text-gray-500 italic">No listing generated yet.</p>
          )}
        </div>
        
        {formData.images.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6 mt-6">
            {formData.images.slice(0, 3).map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <FileText className="w-5 h-5 mr-2" />
          Save Listing
        </button>
        <button className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Share2 className="w-5 h-5 mr-2" />
          Share Listing
        </button>
      </div>
    </div>
  );
}