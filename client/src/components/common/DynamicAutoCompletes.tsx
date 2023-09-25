import Button from '@/components/common/Button';
import CrossIcon from '@/assets/Icons/CrossIcon';
import { Option } from '@/types/Option';
import { useState } from 'react';
import AddIcon from '@/assets/Icons/AddIcon';
import AutoComplete from '@/components/common/AutoComplete';

interface CareersAndSubjectsProps {
  options: Option[];
  title?: string;
  placeholder?: string;
  counterId: number;
  updateCounter: () => void;
}

//button_id example = button_1,button_2...
//input_id example = dropdown_1,dropdown_2...
type CareerDropDownType = {
  label: string;
  key: string;
  button_id: string;
  input_id: string;
};

export default function DynamicAutoCompletes({
  options,
  title = '',
  placeholder = '',
  counterId,
  updateCounter,
}: CareersAndSubjectsProps) {
  const [selectedOption, setSelectedCareer] = useState<Option>({
    key: '',
    label: '',
  });
  // all the next inputs for deleting dropdowns
  const [dropDowns, setDropDowns] = useState<CareerDropDownType[]>([]);

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
  return (
    <>
      <label className='block text-sm font-medium leading-6 text-gray-900'>
        {title}
      </label>

      <div className='mb-5 flex'>
        <div className='w-[80%] md:w-[90%]'>
          <AutoComplete
            options={options}
            onChange={(option) => {
              setSelectedCareer({ key: option.key, label: option.label });
            }}
            value={selectedOption}
            key={selectedOption.key}
            disableOption={(option: Option) => {
              // debugger;
              return (
                dropDowns.findIndex((career) => {
                  return career.key === option.key;
                }) != -1
              );
            }}
            disabledText='Ya fue Seleccionada'
            placeholder={placeholder}
          />
        </div>
        <div className='w-[20%] md:w-[10%]'>
          <Button
            Icon={<AddIcon className='h-6 w-6 text-sky-500' />}
            className='border border-gray-300 bg-white hover:bg-gray-200'
            onClick={() => {
              const newInputId = 'dropdown_' + counterId.toString();
              const newButtonId = 'button_' + counterId.toString();
              setDropDowns((prevState) => [
                ...prevState,
                {
                  label: selectedOption?.label ?? '',
                  key: selectedOption?.key ?? '',
                  button_id: newButtonId,
                  input_id: newInputId,
                },
              ]);
              updateCounter();
              setSelectedCareer({ key: '', label: '' });
            }}
          />
        </div>
      </div>
      <div>
        <OptionsAdded
          dropDowns={dropDowns}
          onOptionDelete={onOptionDelete}
          options={options}
          onOptionChange={onOptionChange}
          currentlySelected={selectedOption}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}

//FUNCTIONALITY FOR OTHER DROPDOWNS
type dropDownProps = {
  dropDowns: CareerDropDownType[];
  // eslint-disable-next-line no-unused-vars
  onOptionDelete: (id: string) => void;
  options: Option[];
  // eslint-disable-next-line no-unused-vars
  onOptionChange: (inputId: string, label: string, key: string) => void;
  currentlySelected: Option;
  placeholder: string;
};
function OptionsAdded({
  dropDowns,
  onOptionDelete,
  options,
  onOptionChange,
  currentlySelected,
  placeholder,
}: dropDownProps) {
  return (
    <>
      {dropDowns.toReversed().map((dropDown) => {
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
                  // debugger;
                  return (
                    dropDowns.findIndex((career) => {
                      return (
                        career.key === option.key ||
                        option.key === currentlySelected.key
                      );
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
                Icon={<CrossIcon className='h-6 w-6 text-red-500' />}
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
