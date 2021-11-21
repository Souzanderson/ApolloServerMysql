import mysql from "mysql";

export default class DatabaseCrud {
  private cursor: mysql.Connection;
  private table:string;

  constructor(table = "") {
    this.table = table;
    this.cursor = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "12345",
      database: "estoke_zero",
    });
  }

  public setTable(table) {
    this.table = table;
    return this
  }

  public async select({
    staments = "*",
    where = "",
    order_by = "",
    limit = 0,
  }: {
    staments?: string;
    where?: any;
    order_by?: string;
    limit?: number;
  }): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.cursor.connect();

      let sql = `SELECT ${staments} FROM ${this.table}`;
      if (where != "") {
        sql +=
          " where " +
          Object.keys(where)
            .map((key) => `${key}= '${where[key]}'`)
            .join(" and ");
      }
      if (order_by != "") sql += ` order by ${order_by}`;
      if (limit > 0) sql += ` limit ${limit}`;
      this.cursor.query(sql, (error, results, fields) => {
        if (error) reject(error);
        try {
          let res = JSON.parse(JSON.stringify(results));
          resolve(res);
        } catch (e) {
          reject([]);
        }
      });
    });
  }

  public insert(object: any) {
    return new Promise((resolve, reject) => {
      this.cursor.connect();
      this.cursor.query(
        `INSERT INTO ${this.table} SET ?`,
        object,
        (error, results, fields) => {
          if (error) reject(false);
          try {
            let res = JSON.parse(JSON.stringify(results));
            resolve(!!res.affectedRows);
          } catch (e) {
            reject(false);
          }
        }
      );
    });
  }

  public update(object: any, where: any) {
    return new Promise((resolve, reject) => {
      let sql =
        `UPDATE ${this.table} SET ` +
        Object.keys(object)
          .map((key) => `${key}= '${object[key]}'`)
          .join(",");
      sql +=
        " where " +
        Object.keys(where)
          .map((key) => `${key}= '${where[key]}'`)
          .join(" and ");

      this.cursor.connect();

      this.cursor.query(sql, (error, results, fields) => {
        if (error) resolve(false);
        try {
          let res = JSON.parse(JSON.stringify(results));
          resolve(!!res.affectedRows);
        } catch (e) {
          resolve(false);
        }
      });
    });
  }

  public delete(where: any) {
    return new Promise((resolve, reject) => {
      let sql =
        `DELETE FROM ${this.table} WHERE ` +
        Object.keys(where)
          .map((key) => `${key} = '${where[key]}'`)
          .join(" and ");

      this.cursor.connect();
      this.cursor.query(sql, (error, results, fields) => {
        if (error) reject(false);
        try {
          let res = JSON.parse(JSON.stringify(results));
          resolve(!!res.affectedRows);
        } catch (e) {
          reject(false);
        }
      });
    });
  }
}
