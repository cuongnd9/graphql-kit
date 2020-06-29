import { createLogger, transports, format } from 'winston';
import { flatten } from 'lodash';

import config from './config';

type Level = 'error' | 'warn' | 'info';
type DefaultMeta = {
  layer?: string;
  component?: string;
  fileName?: string;
};

const getLogger = (level: Level = 'info', defaultMeta?: DefaultMeta) => {
  const { Console } = transports;
  const {
    combine, timestamp, json, splat, errors,
  } = format;
  const logger = createLogger({
    level,
    format: combine(
      errors({ stack: true }),
      splat(),
      timestamp(),
      json(),
    ),
    defaultMeta,
    transports: [
      new Console(),
    ],
  });
  return logger;
};

const formatRest = (...rest: any[]) => {
  const flattenRest = flatten(rest);
  flattenRest.forEach((element, index) => {
    if (element instanceof Error) {
      flattenRest.splice(index, 1);
      flattenRest.push(`${element.name}: ${element.message}`);
      if (config.nodeEnv === 'development') {
        flattenRest.push(element.stack);
      }
    }
  });
  return flattenRest;
};

const logger = (defaultMeta?: DefaultMeta) => ({
  error(...rest: any[]) {
    getLogger('error', defaultMeta).error(formatRest(rest));
  },
  warn(...rest: any[]) {
    getLogger('warn', defaultMeta).warn(formatRest(rest));
  },
  info(...rest: any[]) {
    getLogger('info', defaultMeta).info(formatRest(rest));
  },
});

export default logger;
