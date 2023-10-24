import BarsIcon from '@/assets/Icons/BarsIcon';
import ClockIcon from '@/assets/Icons/ClockIcon';
import LinkIcon from '@/assets/Icons/LinkIcon';
import LocationIcon from '@/assets/Icons/LocationIcon';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import { CreateSessionAlertProps, CreateSessionData } from './Sessions';
import Button from '@/components/common/Button';
import strings from '@/locales/strings.json';
import { Dispatch, SetStateAction } from 'react';
import Alert from '@/components/common/Alert';

type CreateSessionModalProps = {
  formData: CreateSessionData;
  setFormData: Dispatch<SetStateAction<CreateSessionData>>;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  touched: any;
  alertProps: CreateSessionAlertProps;
};

export default function CreateSessionForm({
  formData,
  setFormData,
  handleSubmit,
  touched,
  alertProps,
}: CreateSessionModalProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (value.trim() === '' && value.length > 0) {
      return;
    }

    if (name === 'startTime') {
      setFormData((prevState: CreateSessionData) => ({
        ...prevState,
        ['endTime']: value,
      }));
    }
    setFormData((prevState: CreateSessionData) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateHour = (value: any) => {
    const pattern = /^[0-2][0-9]:[0-5][0-9]$/;
    if (value !== '' && !pattern.test(value)) {
      return strings.createSession.form.validateText.hourFormat;
    }
    return strings.createSession.form.validateText.default;
  };

  return (
    <form
      className='m-2 grid grid-cols-[20px,auto] grid-rows-[50px,50px,50px,50px,auto,50px,125px] gap-x-3 gap-y-8 sm:gap-y-[10px] '
      noValidate
      onSubmit={handleSubmit}
      data-testid='create-sesion'
    >
      <div className='col-span-2'>
        <input
          name='title'
          type='text'
          className='peer h-fit w-[90%] border-b border-gray-300 text-xl focus:border-gray-600 focus:outline-none'
          placeholder={strings.createSession.form.placeholders.title}
          value={formData.title}
          onChange={handleChange}
          required
        />
        {touched.title && (
          <p className='invisible text-sm text-red-600 peer-invalid:visible'>
            {strings.createSession.form.validateText.title}
          </p>
        )}
      </div>
      <ClockIcon className='mr-2 mt-2 h-5 w-5' />
      <div className='flex items-baseline justify-center gap-3'>
        <Input
          type='date'
          id='startTime'
          name='startTime'
          classNameInput='bg-backgroundInput disabled:bg-gray-200'
          minNumber={new Date().toISOString().split('T')[0]}
          value={formData.startTime}
          onChange={handleChange}
          required
          touched={touched.startTime}
          validateText={strings.createSession.form.validateText.date}
          data-testid='startTime'
        />
        <Input
          type='text'
          id='startHour'
          name='startHour'
          placeholder={strings.createSession.form.placeholders.hoursFormat}
          required
          classNameInput='bg-backgroundInput'
          classNameWrapper='mb-4'
          value={formData.startHour}
          onChange={handleChange}
          touched={touched.startHour}
          validateText={validateHour(formData.startHour)}
          pattern='[0-2][0-9]:[0-5][0-9]'
          data-testid='startHour'
        />
      </div>
      <div />
      <div className='flex items-baseline justify-center gap-3'>
        <Input
          type='date'
          id='endTime'
          name='endTime'
          classNameInput='bg-backgroundInput disabled:bg-gray-200'
          minNumber={formData.startTime}
          value={formData.endTime}
          onChange={handleChange}
          required
          touched={touched.endTime}
          validateText={strings.createSession.form.validateText.date}
          disabled={formData.startTime === ''}
          data-testid='endTime'
        />
        <Input
          type='text'
          id='endHour'
          name='endHour'
          placeholder={strings.createSession.form.placeholders.hoursFormat}
          required
          classNameInput='bg-backgroundInput disabled:bg-gray-200'
          classNameWrapper='mb-4'
          value={formData.endHour}
          onChange={handleChange}
          touched={touched.endHour}
          validateText={validateHour(formData.endHour)}
          pattern='[0-2][0-9]:[0-5][0-9]'
          disabled={formData.startTime === ''}
          data-testid='endHour'
        />
      </div>
      <LocationIcon className='mr-2 mt-2 h-5 w-5' />
      <Input
        type='text'
        id='location'
        name='location'
        placeholder={strings.createSession.form.placeholders.location}
        classNameInput='bg-backgroundInput'
        value={formData.location}
        onChange={handleChange}
        touched={touched.location}
        validateText={strings.createSession.form.validateText.default}
      />
      <BarsIcon className='mr-2 mt-1 h-5 w-5' />
      <TextArea
        id='description'
        name='description'
        placeholder={strings.createSession.form.placeholders.description}
        className='pt-3'
        classNameWrapper='mb-3'
        value={formData.description}
        onChange={handleChange}
        touched={touched.description}
        validateText={strings.createSession.form.validateText.default}
      />
      <LinkIcon className='mr-2 mt-2 h-5 w-5' />
      <Input
        type='text'
        id='meetLink'
        name='meetLink'
        placeholder={strings.createSession.form.placeholders.meetLink}
        classNameInput='bg-backgroundInput'
        value={formData.meetLink}
        onChange={handleChange}
        touched={touched.meetLink}
        validateText={strings.createSession.form.validateText.meetLink}
        pattern='.*\..*'
      />
      <div className='col-span-2 flex flex-col justify-center gap-1'>
        <Alert
          isVisible={alertProps.show}
          message={alertProps.message}
          title={alertProps.title}
          alertType={alertProps.alertType}
          withTitle={Boolean(alertProps.title)}
        />
        <div className='col-span-2 flex justify-center'>
          <Button
            text={strings.createSession.form.submitText}
            className='h-fit w-1/3 bg-primaryBlue hover:bg-hoverPrimaryBlue'
            type='submit'
          />
        </div>
      </div>
    </form>
  );
}
