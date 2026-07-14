'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { SolutionCardViewModel } from '@/lib/content/fs-content';

interface SolutionCardProps {
  viewModel: SolutionCardViewModel;
}

export default function SolutionCard({ viewModel }: SolutionCardProps) {
  const [selectedImage, setSelectedImage] = useState(viewModel.selectedImage);

  const handleThumbnailClick = (image: typeof selectedImage) => {
    if (image) {
      setSelectedImage(image);
    }
  };

  return (
    <div className="block bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Upper Region: Enlarged Image */}
      <div className="relative aspect-video bg-slate-100">
        {selectedImage ? (
          <Image
            src={selectedImage.publicPath}
            alt={`${viewModel.name} product image`}
            fill
            className="object-contain"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Middle Region: Thumbnail Gallery */}
      {viewModel.images.length > 0 && (
        <div className="flex gap-2 p-3 bg-slate-50 overflow-x-auto">
          {viewModel.images.map((image) => (
            <button
              key={image.fileName}
              onClick={() => handleThumbnailClick(image)}
              className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                image === selectedImage
                  ? 'border-blue-600 shadow-sm'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
              aria-label={`View ${image.fileName}`}
              aria-selected={image === selectedImage}
              role="tab"
            >
              <Image
                src={image.publicPath}
                alt=""
                fill
                className="object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lower Region: Name, Summary, CTA */}
      <div className="p-4">
        <h4 className="font-semibold text-slate-900 mb-1">{viewModel.name}</h4>
        <p className="text-sm text-slate-600 mb-3">{viewModel.summary}</p>
        
        {viewModel.showProductDetails && viewModel.productUrl && (
          <a
            href={viewModel.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View product details
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </div>
  );
}
