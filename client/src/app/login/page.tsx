import { Button, Flex, Heading, Input } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex>
      <Heading>Login</Heading>

      <Input name="email" />
      <Input type="password" name="password" />

      <Button>Login</Button>
    </Flex>
  )
}
