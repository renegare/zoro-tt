'use client';

import { Flex, Heading } from '@chakra-ui/react';
import { useAuthProvider } from '../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoggedIn() {
  const { isAuthenticated } = useAuthProvider();
  const router = useRouter();

  useEffect(() => {
    if(!isAuthenticated) {
      router.push('/login');
    }
  }, [router, isAuthenticated])
  
  return (
    <Flex>
      <Heading>Logged In</Heading>
    </Flex>
  );
}
