type TagProps = {
  type: 'Administrador' | 'Miembro'; // when conect to back this value will be back roles
};

function getBackgroundColor(type: string) {
  if (type === 'Administrador') return '#BCEDFF';
  return '#9ca3af';
}

export default function Tag({ type }: TagProps) {
  const backgroundColor = getBackgroundColor(type);
  return (
    <div
      className={`rounded-lg  bg-[${backgroundColor}] w-fit bg-gray-400 p-1  text-sm `}
    >
      {type}
    </div>
  );
}
