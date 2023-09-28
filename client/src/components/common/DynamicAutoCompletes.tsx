import Button from '@/components/common/Button';
import { Option } from '@/types/Option';
import { useEffect, useState } from 'react';
import AddIcon from '@/assets/Icons/AddIcon';
import AutoComplete from '@/components/common/AutoComplete';
import TrashIcon from '@/assets/Icons/TrashIcon';

interface DynamicAutoCompletesProp {
  options: Option[];
  title?: string;
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  onChangeActualOptions?: (id: string[]) => void;
  defaultOptions?: Option[];
  //used for creating custom ids
  dropDownIds: string;
  buttonIds: string;
}

//button_id example = button_1,button_2...
//input_id example = dropdown_1,dropdown_2...
type dropDownType = {
  label: string;
  key: string;
  button_id: string;
  input_id: string;
};

export default function DynamicAutoCompletes({
  options,
  title = '',
  placeholder = '',
  onChangeActualOptions,
  buttonIds,
  dropDownIds,
  defaultOptions = [],
}: DynamicAutoCompletesProp) {
  // all the next inputs for deleting dropdowns
  const [counterId, SetCounterId] = useState<number>(0);
  const [dropDowns, setDropDowns] = useState<dropDownType[]>([]);

  useEffect(() => {
    let count = counterId;
    defaultOptions.forEach((option) => {
      const newInputId = dropDownIds + count.toString();
      const newButtonId = buttonIds + count.toString();
      count = count + 1;
      setDropDowns((prevState) => [
        ...prevState,
        {
          label: option.label,
          key: option.key,
          button_id: newButtonId,
          input_id: newInputId,
        },
      ]);
    });
    SetCounterId(count);
  }, []);

  const onOptionDelete = function (id: string) {
    const dropDownsAux = dropDowns.filter((dropDown) => {
      return dropDown.button_id != id;
    });
    setDropDowns(dropDownsAux);
  };

  const onOptionChange = function (
    inputId: string,
    label: string,
    key: string
  ) {
    const dropDownsAux = dropDowns.map((dropDown) => {
      if (dropDown.input_id === inputId) {
        dropDown.label = label;
        dropDown.key = key;
      }
      return dropDown;
    });
    setDropDowns(dropDownsAux);
  };

  useEffect(() => {
    onChangeActualOptions?.(
      dropDowns.map((dropDown) => {
        return dropDown.key;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDowns]);
  return (
    <>
      <label className='block text-sm font-medium leading-6 text-gray-900'>
        {title}
      </label>
      <div>
        <OptionsAdded
          dropDowns={dropDowns}
          onOptionDelete={onOptionDelete}
          options={options}
          onOptionChange={onOptionChange}
          placeholder={placeholder}
        />
      </div>
      <div className='mb-5 flex'>
        <div className='w-[100%] md:w-[100%]'>
          <Button
            Icon={<AddIcon className='h-6 w-6 text-sky-500' />}
            className='border border-gray-300 bg-white hover:bg-gray-200'
            onClick={() => {
              const newInputId = { dropDownIds } + counterId.toString();
              const newButtonId = { buttonIds } + counterId.toString();
              setDropDowns((prevState) => [
                ...prevState,
                {
                  label: '',
                  key: '',
                  button_id: newButtonId,
                  input_id: newInputId,
                },
              ]);
              SetCounterId(counterId + 1);
            }}
          />
        </div>
      </div>
    </>
  );
}

//FUNCTIONALITY FOR OTHER DROPDOWNS
type dropDownProps = {
  dropDowns: dropDownType[];
  // eslint-disable-next-line no-unused-vars
  onOptionDelete: (id: string) => void;
  options: Option[];
  // eslint-disable-next-line no-unused-vars
  onOptionChange: (inputId: string, label: string, key: string) => void;
  // currentlySelected: Option;
  placeholder: string;
};
function OptionsAdded({
  dropDowns,
  onOptionDelete,
  options,
  onOptionChange,
  // currentlySelected,
  placeholder,
}: dropDownProps) {
  return (
    <>
      {dropDowns.map((dropDown) => {
        return (
          <div
            className='mb-5 flex'
            key={'div-career-container' + dropDown.input_id}
          >
            <div className='w-[80%] md:w-[90%]'>
              <AutoComplete
                value={{ key: dropDown.key, label: dropDown.label }}
                options={options}
                disableOption={(option: Option) => {
                  return (
                    dropDowns.findIndex((career) => {
                      return career.key === option.key;
                    }) != -1
                  );
                }}
                onChange={(option: Option) => {
                  onOptionChange(dropDown.input_id, option.label, option.key);
                }}
                disabledText='Ya fue seleccionada'
                placeholder={placeholder}
              />
            </div>
            <div className='w-[20%] md:w-[10%]'>
              <Button
                Icon={<TrashIcon className='h-6 w-6 text-red-500' />}
                className='border border-gray-300 bg-white hover:bg-gray-200'
                onClick={() => {
                  onOptionDelete(dropDown.button_id);
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
