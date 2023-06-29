interface PropType {
    name: string
}

const Tag = ({ name }: PropType) => {
  return (
    <div className="bg-[#C6C6C6] justify-center items-center rounded-3xl">
      <p className="p-1">{name}</p>
    </div>
  );
}

export default Tag