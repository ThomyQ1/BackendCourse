import { createLogger, format, transports, addColors } from "winston";
const { colorize, simple } = format;

const levels = {
  http: 0,
  info: 1,
  error: 2,
  fatal: 3,
};

export default createLogger({
  levels,
  format: colorize(),
  transports: [new transports.Console({ level: "http", format: simple() })],
});
