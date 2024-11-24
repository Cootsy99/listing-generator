import React from 'react';
import { Check } from 'lucide-react';

interface TemplateSelectionProps {
  selected: string;
  onChange: (template: string) => void;
}

const TEMPLATES = [
  {
    id: 'modern',
    title: 'Modern & Minimalist',
    description: 'Clean and contemporary style focusing on sleek features and modern amenities.',
    preview: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: 'luxury',
    title: 'Luxury & Elegant',
    description: 'Sophisticated language highlighting premium features and exclusive details.',
    preview: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: 'cozy',
    title: 'Warm & Inviting',
    description: 'Friendly and welcoming tone emphasizing comfort and livability.',
    preview: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300&h=200'
  }
];

export function TemplateSelection({ selected, onChange }: TemplateSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            onClick={() => onChange(template.id)}
            className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
              selected === template.id
                ? 'border-blue-600 shadow-lg'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <img
              src={template.preview}
              alt={template.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
            {selected === template.id && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}