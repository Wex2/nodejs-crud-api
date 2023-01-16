import { access, mkdir, readFile, writeFile } from "fs/promises";
import { resolve } from "path";

import { TableName, TGetTable, TUpdateTable } from "./types";

const initTableData = "{}";

export const findTable = async (tableName: TableName) => {
  const pathToFolder = resolve(__dirname, `./tables`);

  if (!(await exist(pathToFolder))) {
    await mkdir(pathToFolder);
  }

  const pathToTable = resolve(pathToFolder, `${tableName}.json`);

  if (!(await exist(pathToTable))) {
    await writeFile(pathToTable, initTableData);
  }

  return pathToTable;
};

export const exist = async (path: string) => {
  try {
    await access(path);

    return true;
  } catch {
    return false;
  }
};

export const getTable: TGetTable = async (tableName) => {
  return new Promise(async (res) => {
    try {
      const pathToTable = await findTable(tableName);

      let data = await readFile(pathToTable);

      const table = JSON.parse(data.toString());

      res(table);
    } catch {
      res(null);
    }
  });
};

export const updateTable: TUpdateTable = async (tableName, data) => {
  return new Promise(async (res) => {
    try {
      const pathToTable = await findTable(tableName);
      const dataLikeJson = JSON.stringify(data, null, 2);

      await writeFile(pathToTable, dataLikeJson);

      res(true);
    } catch {
      res(false);
    }
  });
};
