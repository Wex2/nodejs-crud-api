import { resolve } from "path";
import { rm } from "fs/promises";

import {
  IDatabase,
  TClearDB,
  TDelete,
  TGet,
  TGetDB,
  TPost,
  TPut,
  TTableOneValue,
  TTableValueAsArray,
} from "./types";
import { getTable, updateTable } from "./utils";

class Database implements IDatabase {
  private static dbInstance: Database | null = null;

  public static getDB: TGetDB = () => {
    if (this.dbInstance === null) {
      this.dbInstance = new Database();
    }

    return this.dbInstance;
  };

  public clearDB: TClearDB = async () => {
    const pathToDir = resolve(__dirname, "tables");

    try {
      await rm(pathToDir, { recursive: true });
    } catch {}
  };

  public get: TGet = async (tableName, id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const table = await getTable(tableName);
        if (table === null) {
          reject();

          return;
        }

        if (id === undefined) {
          resolve(Object.values(table) as TTableValueAsArray<typeof tableName>);

          return;
        }

        const value = table[id];
        if (value === undefined) {
          resolve(null);
        }

        resolve(value as TTableOneValue<typeof tableName>);
      } catch {
        reject();
      }
    });
  };

  public post: TPost = async (tableName, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const table = await getTable(tableName);

        if (table === null) {
          reject();

          return;
        }

        const recordCount = Object.keys(table).length;

        table[recordCount + 1] = data;

        const isUpdated = await updateTable(tableName, table);

        if (isUpdated) {
          resolve(data);

          return;
        }
        reject();
      } catch {
        reject();
      }
    });
  };

  public put: TPut = async (tableName, id, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const table = await getTable(tableName);

        if (table === null) {
          reject();

          return;
        }

        const oldData = table[id];

        if (oldData === undefined) {
          resolve(null);

          return;
        }

        table[id] = data;

        const isUpdated = await updateTable(tableName, table);

        if (isUpdated) {
          resolve(data);

          return;
        }

        reject();
      } catch {
        reject();
      }
    });
  };

  public delete: TDelete = async (tableName, id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const table = await getTable(tableName);

        if (table === null) {
          reject();

          return;
        }

        const data = table[id];

        if (data === undefined) {
          resolve(false);

          return;
        }

        delete table[id];

        const isUpdated = await updateTable(tableName, table);

        if (isUpdated) {
          resolve(true);

          return;
        }

        reject();
      } catch {
        reject();
      }
    });
  };
}

export default Database;
