import DatabaseCrud from "../../../library/databasecrud";
const TABLE = "produto as p";

export default {
  Query: {
    produtos: async () => {
      const db = new DatabaseCrud();
      return await db
        .setTable(TABLE)
        .select({
          staments: `*, (SELECT dsrevenda FROM revenda where id=p.idrevenda  limit 1) as dsrevenda`,
        });
    },
    produto: async (_, { id }) => {
      const db = new DatabaseCrud();
      let res = await db.setTable(TABLE).select({
        staments: `*, (SELECT dsrevenda FROM revenda where id=p.idrevenda limit 1) as dsrevenda`,
        where: { iderp: id.iderp, idrevenda: id.idrevenda, idlote: id.idlote },
        limit: 1,
      });
      return res[0];
    },
  },
  Mutation: {
    createProduto: async (_, { data }) => {
      const db = new DatabaseCrud();
      return db.setTable(TABLE).insert(data);
    },
    updateProduto: async (_, { id, data }) => {
      const db = new DatabaseCrud();
      return db.setTable(TABLE).update(data, {
        iderp: id.iderp,
        idrevenda: id.idrevenda,
        idlote: id.idlote,
      });
    },
    deleteProduto: async (_, { id }) => {
      const db = new DatabaseCrud();
      return db
        .setTable(TABLE)
        .update(
          { isativo: 0 },
          { iderp: id.iderp, idrevenda: id.idrevenda, idlote: id.idlote }
        );
    },
  },
};
