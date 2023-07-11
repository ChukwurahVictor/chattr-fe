import { Tag, TagLabel } from '@chakra-ui/react';

interface PropType {
    name: string
}

const Pill = ({ name }: PropType) => {
  return (
    <Tag
      size={"lg"}
      key={"lg"}
      borderRadius="full"
      variant="solid"
      colorScheme="purple"
    >
      <TagLabel>{name}</TagLabel>
    </Tag>
  );
}

export default Pill;