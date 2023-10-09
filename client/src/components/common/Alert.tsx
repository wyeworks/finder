import strings from '@/locales/strings.json';

export type alertTypes = 'error' | 'warning' | 'info' | 'success';

type AlertProps = {
  isVisible: boolean;
  id?: string;
  message?: string;
  title?: string;
  type?: string;
  alertType?: alertTypes;
  withTitle?: boolean;
};

export default function Alert({
  isVisible,
  type = 'alert',
  id = 'alert',
  alertType = 'warning',
  title = getAlertTypeDefaultTitle(alertType),
  message = getAlertTypeDefaultMessage(alertType),
  withTitle = true,
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
        {withTitle && <p className='font-bold'>{title}</p>}
        <p>{message}</p>
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
