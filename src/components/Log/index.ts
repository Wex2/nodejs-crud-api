import {  TClear, TGetLog, TWrite } from "./types";

class Log {
  private static logInstance: Log | null = null;

  public static getLog: TGetLog = () => {
    if (this.logInstance === null) {
      this.logInstance = new Log();
    }

    return this.logInstance;
  };

  public write: TWrite = ( msg, newLine = 1, space = 0) => {
    const { stdout } = process;

    stdout.write(
      `${" ".repeat(space)}${msg}${"\n".repeat(newLine)}`,
    );
  };

  public clear: TClear = () => console.clear();
}

export default Log;
