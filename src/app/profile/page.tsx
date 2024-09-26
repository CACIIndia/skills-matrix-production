'use client'; // Important: This ensures that this page is treated as a client-side component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Try to get the id from localStorage
    let id = localStorage.getItem('id');

    // If no id is found in localStorage, set it to the default value '1'
    if (!id) {
      id = '1';
    }

    // Redirect to the /public-profile/[id] page
    router.replace(`/profile/${id}`);
  }, [router]);

  return null; // Return null because this page is only for redirecting
}
