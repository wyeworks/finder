import Input from '@/components/common/Input';
import MemberCard from './MemberCard';
import FilterIcon from '@/assets/Icons/FilterIcon';

// Member and exampleUsers are temporary to show de ui without back end data
export type Member = {
  name: string;
  email: string;
  role: 'Miembro' | 'Administrador';
};

const exampleUsers: Member[] = [
  {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'Miembro',
  },
  {
    name: 'María González',
    email: 'maria@example.com',
    role: 'Administrador',
  },
  {
    name: 'Luis Rodríguez',
    email: 'luis@example.com',
    role: 'Miembro',
  },
  {
    name: 'Ana López',
    email: 'ana@example.com',
    role: 'Administrador',
  },
  {
    name: 'Carlos Martínez',
    email: 'carlos@example.com',
    role: 'Miembro',
  },
  {
    name: 'Laura Sánchez',
    email: 'laura@example.com',
    role: 'Miembro',
  },
  {
    name: 'Pedro Ramirez',
    email: 'pedro@example.com',
    role: 'Miembro',
  },
  {
    name: 'Isabel Pérez',
    email: 'isabel@example.com',
    role: 'Administrador',
  },
  {
    name: 'Antonio García',
    email: 'antonio@example.com',
    role: 'Miembro',
  },
  {
    name: 'Carmen Torres',
    email: 'carmen@example.com',
    role: 'Miembro',
  },
];

export default function Members() {
  return (
    <div>
      {/* Requests */}
      <div className='grid grid-rows-[40px,60px,auto]'>
        <h2 className=' p-2 text-lg font-bold'>Solicitudes</h2>
        <div className='max-w-[100%] border border-solid border-gray-200 sm:max-w-none'>
          <Input
            id='filter-input-request'
            name='filter-input-request'
            type='text'
            placeholder='Filtrar Solicitudes'
            Icon={<FilterIcon className='h-5 w-5' />}
            maxWidth={false}
            classNameWrapper='m-3'
          />
        </div>
        <div className=' max-h-72 overflow-auto border-b border-solid border-gray-200'>
          {exampleUsers.map((user, index) => {
            return (
              <div key={index}>
                <MemberCard member={user} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Members */}
      <div className='mb-10 grid grid-rows-[40px,60px,auto]'>
        <h2 className=' p-2 text-lg font-bold'>Miembros</h2>
        <div className='max-w-[100%] border border-solid border-gray-200 sm:max-w-none'>
          <Input
            id='filter-input-members'
            name='filter-input-members'
            type='text'
            placeholder='Filtrar Miembros'
            Icon={<FilterIcon className='h-5 w-5' />}
            maxWidth={false}
            classNameWrapper='m-3'
          />
        </div>
        <div className=' max-h-72 overflow-auto border-b border-solid border-gray-200'>
          {exampleUsers.map((user, index) => {
            return (
              <div key={index}>
                <MemberCard member={user} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
