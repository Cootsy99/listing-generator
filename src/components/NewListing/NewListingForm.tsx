import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, Home, Palette, FileText, Sparkles } from 'lucide-react';
import { PropertyDetails } from './steps/PropertyDetails';
import { ImageUpload } from './steps/ImageUpload';
import { TemplateSelection } from './steps/TemplateSelection';
import { Preview } from './steps/Preview';
import { AIGeneration } from './steps/AIGeneration';

const STEPS = [
  { id: 'details', title: 'Property Details', icon: Home },
  { id: 'images', title: 'Upload Images', icon: Upload },
  { id: 'template', title: 'Select Template', icon: Palette },
  { id: 'generate', title: 'AI Generation', icon: Sparkles },
  { id: 'preview', title: 'Preview & Generate', icon: FileText }
];

export function NewListingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    propertyDetails: {
      title: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      squareFootage: '',
      description: '',
      location: '',
      propertyType: 'house'
    },
    images: [],
    selectedTemplate: 'modern',
    generatedListing: ''
  });

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PropertyDetails
            data={formData.propertyDetails}
            onChange={(data) => updateFormData('propertyDetails', data)}
          />
        );
      case 1:
        return (
          <ImageUpload
            images={formData.images}
            onChange={(images) => updateFormData('images', images)}
          />
        );
      case 2:
        return (
          <TemplateSelection
            selected={formData.selectedTemplate}
            onChange={(template) => updateFormData('selectedTemplate', template)}
          />
        );
      case 3:
        return (
          <AIGeneration
            formData={formData}
            onGenerated={(listing) => updateFormData('generatedListing', listing)}
            onSuccess={handleNext}
          />
        );
      case 4:
        return <Preview formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create New Listing</h1>
        <div className="flex justify-between items-center">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${
                index !== STEPS.length - 1 ? 'flex-1' : ''
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  index <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              {index !== STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        {renderStep()}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`flex items-center px-4 py-2 rounded-lg ${
            currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === STEPS.length - 1}
          className={`flex items-center px-4 py-2 rounded-lg ${
            currentStep === STEPS.length - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {currentStep === STEPS.length - 1 ? 'Finish' : 'Next'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
}