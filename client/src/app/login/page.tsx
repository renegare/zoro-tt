'use client';

import { Button, Flex, Heading, Input } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'

export default function Home() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = useCallback((data: any) => {

    router.replace('/loggedin');
  }, []);
  
  return (
    <Flex>
      <Heading>Login</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('email')} />
        <Input type="password" {...register('password')} />

        <Button type="submit">Login</Button>
      </form>
    </Flex>
  );
}
