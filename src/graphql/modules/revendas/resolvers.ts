import DatabaseCrud from "../../../library/databasecrud";
const TABLE = "revenda";

export default {
  Query: {
    revendas: async () => {
      return await new DatabaseCrud(TABLE).select({});
    },
    revenda: async (_, { id }) => {
      let res = await new DatabaseCrud(TABLE).select({where:{id:id}, limit: 1});
      return res[0]
    },
  },
  Mutation: {
    createRevenda: async (_, { data }) => {
      const db = new DatabaseCrud(TABLE);
      return db.insert(data);
    },
    updateRevenda: async (_, { id, data }) => {
      const db = new DatabaseCrud(TABLE);
      return db.update(data, { id });
    },
    deleteRevenda: async (_, { id }) => {
      const db = new DatabaseCrud(TABLE);
      return db.update({ isativo: 0 }, { id });
    },
  },
};
