'use client';

import { Hero } from '@/components/ui/Hero';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleExploreLibrary = () => {
    router.push('/library');
  };

  return <Hero onExplore={handleExploreLibrary} />;
}

