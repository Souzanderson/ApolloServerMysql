import DatabaseCrud from "../../../library/databasecrud";
import crypto from "crypto";

export default {
  Mutation: {
    login: async (_, { data }) => {
      const db = new DatabaseCrud("usuario");
      let hasher = crypto.createHash("sha1");
      hasher.update(data.user + data.passwd);
      const hashcode = hasher.digest("hex");
      let res = await db.select({
        staments: `*,(SELECT dsrevenda from revenda where id=idrevenda) as dsrevenda`,
        where: { hashcode: hashcode },
      });
      return res[0];
    },
  },
};
