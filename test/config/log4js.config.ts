import * as chalk from "chalk";
import * as log4js from "log4js";

log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: `${chalk.yellow("%d")} [%x{levelColor}] [${chalk.magenta(
          "%c"
        )}]: %x{msgColor}`,
        tokens: {
          levelColor: (logEvent) => {
            return logEvent.level.levelStr === "FATAL"
              ? chalk.red(logEvent.level.levelStr)
              : logEvent.level.levelStr === "INFO"
              ? chalk.green(logEvent.level.levelStr)
              : chalk.blue(logEvent.level.levelStr);
          },
          msgColor: (logEvent) => {
            return logEvent.data[0].includes("FAIL")
              ? chalk.redBright(logEvent.data[0])
              : logEvent.data[0].includes("PASS")
              ? chalk.greenBright(logEvent.data[0])
              : chalk.white(logEvent.data[0]);
          },
        },
      },
    },
  },
  categories: {
    default: { appenders: ["out"], level: "trace" },
  },
});

const logger = log4js.getLogger("testlog");
//logger.level = log4js.levels.ALL;
export const log: log4js.Logger = logger;
