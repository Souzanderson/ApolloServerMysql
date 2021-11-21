import DatabaseCrud from "../../../library/databasecrud";
const TABLE = "usuario";

export default {
  Query: {
    usuarios: async () => {
      return await new DatabaseCrud(TABLE).select({staments:`*,(SELECT dsrevenda FROM revenda WHERE id=idrevenda limit 1) as dsrevenda`});
    },
    usuario: async (_, { id }) => {
      let res = await new DatabaseCrud(TABLE).select({
        staments:`*,(SELECT dsrevenda FROM revenda WHERE id=idrevenda limit 1) as dsrevenda`,
        where: { id: id },
        limit: 1,
      });
      console.log(res[0]);

      return res[0];
    },
  },
  Mutation: {
    createUsuario: async (_, { data }) => {
      const db = new DatabaseCrud(TABLE);
      return db.insert(data);
    },
    updateUsuario: async (_, { id, data }) => {
      const db = new DatabaseCrud(TABLE);
      return db.update(data, { id });
    },
    deleteUsuario: async (_, { id }) => {
      const db = new DatabaseCrud(TABLE);
      return db.update({ isativo: 0 }, { id });
    },
  },
};
