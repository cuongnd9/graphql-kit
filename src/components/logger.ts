import { createLogger, transports, format } from 'winston';

type Level = 'error' | 'warn' | 'info';
type DefaultMeta = {
  layer?: string;
  component?: string;
  fileName?: string;
};

const getLogger = (level: Level = 'info', defaultMeta?: DefaultMeta) => {
  const { Console } = transports;
  const {
    combine, timestamp, json, splat,
  } = format;
  const logger = createLogger({
    level,
    format: combine(
      splat(),
      timestamp(),
      json()
    ),
    defaultMeta,
    transports: [
      new Console(),
    ],
  });
  return logger;
};

const logger = (defaultMeta?: DefaultMeta) => ({
  error(...rest: any[]) {
    getLogger('error', defaultMeta).error(rest);
  },
  warn(...rest: any[]) {
    getLogger('warn', defaultMeta).warn(rest);
  },
  info(...rest: any[]) {
    getLogger('info', defaultMeta).info(rest);
  },
});

export default logger;
