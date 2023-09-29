class Logger {
  static debug(...data: any[]) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('[DEBUG]', ...data);
    }
  }

  static warn(...message: any[]) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[WARNING]', ...message);
    }
  }

  static error(...data: any[]) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('[ERROR]', ...data);
    }
  }
  static async logResponse(response: any) {
    const { status, statusText, url } = response;
    //If boy is parseable as a json do it if not give text
    const readableBody = await response
      .clone()
      .json()
      .catch(() => response.text());
    Logger.debug(
      'Response:',
      '\nStatus: ',
      status,
      '\nStatus Text: ',
      statusText,
      '\nUrl: ',
      url,
      '\nBody: ',
      readableBody
    );
  }

  static tabulate(obj: object) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.table(obj);
    }
  }

  static clear = () => {
    // eslint-disable-next-line no-console
    console.clear();
  };
}

export { Logger };
