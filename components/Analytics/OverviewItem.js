import { Card, CardHeader, CardBody, Heading, Text } from "@chakra-ui/react";

export default function OverViewItem({ header, number }) {
  return (
    <Card w='19%' boxShadow='rgba(0, 27, 71, 0.08) 0px 3px 8px'>
      <CardHeader>
        <Heading size='sm' color='#283d52'>{header}</Heading>
      </CardHeader>
      <CardBody>
        <Text color='#283d52'>{number}</Text>
      </CardBody>
    </Card>
  )
}