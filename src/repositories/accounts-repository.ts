import Account from "../models/Account";
import database from "../database";

const accountsRepository = {
  addNew: (account: Account, callback: (id?: number) => void) => {
    const sql = "INSERT INTO accounts (name) VALUES (?)";
    const params = [account.name];
    database.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },
  getById: (id: number, callback: (account?: Account) => void) => {
    const sql = "SELECT * FROM accounts WHERE id = ?";
    const params = [id];
    database.get(sql, params, (_err, row) => callback(row as Account));
  },
};

export default accountsRepository;
