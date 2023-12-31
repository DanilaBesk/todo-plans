'use client';

import { Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { unsplash } from '@/lib/unsplash';
import Image from 'next/image';
import { cn } from '@/lib/utils';

import { defaultImages } from '@/constants/images';
import { toast } from 'sonner';
import Link from 'next/link';
import { FormError } from './form-error';

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[]>;
}
export interface IImage {
  id: string;
  urls: { thumb: string; full: string };
  links: { html: string };
  user: { name: string };
}
export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>([
    defaultImages,
  ]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });
        if (result && result?.response) {
          const responseImages = result.response as Array<Record<string, any>>;
          setImages(responseImages);
        } else {
          console.error('Failed to get images from Unsplash');
        }
      } catch (error) {
        console.log(error);
        toast.error('error in loading images');
        setImages(defaultImages);
      } finally {
        setIsloading(false);
      }
    };

    fetchImages();
  }, []);
  if (isLoading)
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
              pending && 'opacity-50 hover:opacity-50 cursor-auto'
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              fill
              className="object-cover rounded-md"
              alt="Unsplash Image"
            />
            {selectedImageId === image.id && (
              <div className="absolute flex items-center justify-center h-full w-full inset-y-0 bg-black/30s">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/10"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormError id="image" errors={errors} />
    </div>
  );
};
