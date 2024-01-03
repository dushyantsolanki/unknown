import conf from "../conf/conf";
import { Client, Account, Storage, ID } from "appwrite";

class appWriteStorage {
  client = new Client();
  account;
  storag;
  constructor() {
    this.account = new Account(this.client);
    this.storag = new Storage(this.client);
    this.client.setEndpoint(conf.endPoint).setProject(conf.projectId);
  }

  createFile = async ({ file }) => {
    try {
      const uploadFile = await this.storag.createFile(
        conf.bucketId,
        ID.unique(),
        file
      );

      return uploadFile;
    } catch (error) {
      console.log("appwrite : storage :: createFile :: ", error.message);
      return { code: error.code, message: error.message, flag: false };
    }
  };

  listAllFiles = async () => {
    try {
      const allFile = await this.storag.listFiles(conf.bucketId);

      return allFile;
    } catch (error) {
      console.log("appwrite : storage :: listAllFiles :: ", error.message);
      return { code: error.code, message: error.message, flag: false };
    }
  };

  getOneFile = async ({ fileId }) => {
    try {
      const getFileData = await this.storag.getFilePreview(
        conf.bucketId,
        fileId
      );

      return getFileData;
    } catch (error) {
      console.log("appwrite : storage :: getOneFile :: ", error.message);
      return { code: error.code, message: error.message, flag: false };
    }
  };
}

const bucket = new appWriteStorage();
export default bucket;
