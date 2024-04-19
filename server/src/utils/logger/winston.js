import { createLogger, format, transports, addColors } from "winston";
const { colorize, simple } = format;

const levels = {
  http: 0,
  info: 1,
  error: 2,
  fatal: 3,
};

const colors = {
  http: "cyan",
  info: "blue",
  error: "yellow",
  fatal: "red",
};

addColors(colors);

export default createLogger({
  levels,
  format: colorize(),
  transports: [
    new transports.Console({ level: "http", format: simple() }),
    new transports.File({
      level: "error",
      format: simple(),
      filename: "./src/utils/errors/errors.log",
    }),
  ],
});
