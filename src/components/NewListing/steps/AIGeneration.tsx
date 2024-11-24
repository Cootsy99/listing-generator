import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

interface AIGenerationProps {
  formData: any;
  onGenerated: (listing: string) => void;
  onSuccess: () => void;
}

export function AIGeneration({ formData, onGenerated, onSuccess }: AIGenerationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateListing = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Clean and validate the data before sending
      const cleanedImages = formData.images.map((img: string) => {
        // If it's a data URL, extract just the base64 part
        if (img.startsWith('data:image')) {
          return img.split(',')[1];
        }
        return img;
      });

      const payload = {
        property: {
          title: formData.propertyDetails.title || '',
          price: formData.propertyDetails.price || '',
          location: formData.propertyDetails.location || '',
          type: formData.propertyDetails.propertyType || 'house',
          bedrooms: String(formData.propertyDetails.bedrooms || ''),
          bathrooms: String(formData.propertyDetails.bathrooms || ''),
          squareFootage: String(formData.propertyDetails.squareFootage || ''),
          description: formData.propertyDetails.description || ''
        },
        style: formData.selectedTemplate || 'modern',
        images: cleanedImages
      };

      console.log('Sending payload:', JSON.stringify(payload));

      const response = await fetch('https://hook.eu2.make.com/cp27r1ulmyagsgyakaf5l5tixdye0x7e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate listing: ${errorText}`);
      }

      const data = await response.json();
      
      if (data.listing) {
        onGenerated(data.listing);
        onSuccess();
      } else {
        throw new Error('No listing content received from the server');
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while generating the listing');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Listing Generation</h2>
        <p className="text-gray-600 mb-8">
          Our AI will analyze your property details and create a compelling listing that highlights its best features.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center text-red-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <button
          onClick={generateListing}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Listing
            </>
          )}
        </button>
      </div>
    </div>
  );
}