import strings from '@/locales/strings.json';

export type alertTypes = 'error' | 'warning' | 'info' | 'success';

type AlertProps = {
  isVisible: boolean;
  id?: string;
  message?: string;
  title?: string;
  type?: string;
  alertType?: alertTypes;
};

export default function Alert({
  isVisible,
  title,
  message,
  type = 'alert',
  id = 'alert',
  alertType = 'warning',
}: AlertProps) {
  if (isVisible) {
    return (
      <div
        data-testid={id}
        className={`mt-2 h-fit content-center overflow-auto border-l-4  p-3 text-sm ${getAlertTypeStyle(
          alertType
        )}`}
        role={type}
      >
        <p className='font-bold'>
          {title ?? getAlertTypeDefaultTitle(alertType)}
        </p>
        <p>{message ?? getAlertTypeDefaultMessage(alertType)}</p>
      </div>
    );
  }
}

function getAlertTypeStyle(alertType: alertTypes) {
  switch (alertType) {
    case 'error':
      return 'border-red-500 bg-red-100 text-red-600';
    case 'warning':
      return 'border-yellow-500 bg-yellow-100 text-orange-600';
    case 'info':
      return 'border-blue-500 bg-blue-100 text-blue-600';
    case 'success':
      return 'border-green-500 bg-green-100 text-green-600';
  }
}

function getAlertTypeDefaultTitle(alertType: alertTypes) {
  switch (alertType) {
    case 'error':
      return strings.common.error.defaultError;
    case 'warning':
      return strings.common.warning.defaultWarning;
    case 'info':
      return strings.common.info.defaultInfo;
    case 'success':
      return strings.common.success.defaultSuccess;
  }
}

function getAlertTypeDefaultMessage(alertType: alertTypes) {
  switch (alertType) {
    case 'error':
      return strings.common.error.unexpectedError;
    case 'warning':
      return strings.common.warning.warningMessage;
    case 'info':
      return strings.common.info.infoMessage;
    case 'success':
      return strings.common.success.successMessage;
  }
}
