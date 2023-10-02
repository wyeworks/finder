type TagProps = {
  type: 'Administrador' | 'Miembro'; // when conect to back this value will be back roles
};

function getBackgroundColor(type: string) {
  if (type === 'Administrador') return 'bg-[#BCEDFF]';
  return 'bg-gray-300';
}

export default function Tag({ type }: TagProps) {
  const backgroundColor = getBackgroundColor(type);
  return (
    <div
      className={`w-fit rounded-lg p-1  text-sm  ${backgroundColor} font-light`}
    >
      {type}
    </div>
  );
}
