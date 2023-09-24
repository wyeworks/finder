class Logger {
  static debug(...data: any[]) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('[DEBUG]', ...data);
    }
  }

  static warn(message: string) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[WARNING]', message);
    }
  }

  static error(...data: any[]) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('[ERROR]', ...data);
    }
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
