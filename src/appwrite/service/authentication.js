import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class appWriteAuth {
  client = new Client();
  account;
  constructor() {
    this.account = new Account(this.client);
    this.client.setEndpoint(conf.endPoint).setProject(conf.projectId);
  }

  createAccount = async ({ name, email, password }) => {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      return userAccount;
    } catch (error) {
      console.log("authentication :: createAccount :: ", error);

      return { code: error.code, message: error.message, flag: false };
    }
  };
  loginWithEmailAndPassword = async ({ email, password }) => {
    try {
      const getUser = await this.account.createEmailSession(email, password);

      return getUser;
    } catch (error) {
      console.log(
        "authentication :: loginWithEmailAndPassword :: ",
        error.message
      );

      return { code: error.code, message: error.message, flag: false };
    }
  };

  getLoginAccount = async () => {
    try {
      const loginAccount = await this.account.get();
      return loginAccount;
    } catch (error) {
      console.log(
        "appwrite : authentication :: getLoginAccount :: ",
        error.message
      );
      return { code: error.code, message: error.message, flag: false };
    }
  };

  passwordRecoverySend = async ({ email }) => {
    try {
      const sendedLink = await this.account.createRecovery(
        email,
        `http://localhost:5173/auth/newpassword`
      );
      return sendedLink;
    } catch (error) {
      console.log(
        "appwrite : authentication :: passwordRecoverySend :: ",
        error.message
      );
      return { code: error.code, message: error.message, flag: false };
    }
  };

  updateRecoveryPass = async ({
    userId,
    secret,
    password,
    confirmPassword,
  }) => {
    try {
      const passwordData = await this.account.updateRecovery(
        userId,
        secret,
        password,
        confirmPassword
      );
      return passwordData;
    } catch (error) {
      console.log(
        "appwrite : authentication :: updateRecoveryPass :: ",
        error.message
      );
      return { code: error.code, message: error.message, flag: false };
    }
  };

  logout = async () => {
    try {
      const logoutAccount = await this.account.deleteSession("current");
      return logoutAccount;
    } catch (error) {
      console.log("appwrite : authentication :: logout :: ", error.message);
      return { code: error.code, message: error.message, flag: false };
    }
  };
}

const auth = new appWriteAuth();
export default auth;
