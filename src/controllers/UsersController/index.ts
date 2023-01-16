import Database from "../../components/Database";
import { TUserData, TableName } from "../../components/Database/types";
import ResponseCreator from "../../components/ResponseCreator";
import UserModel from "../../models/UserModel";
import {
  IUsersController,
  TCreateUser,
  TDeleteUser,
  TGetAllUsers,
  TGetUser,
  TUpdateUser,
} from "./types";
import { getReqData } from "./utils";

class UsersController implements IUsersController {
  private db: Database;
  private rc: ResponseCreator;

  public constructor() {
    this.db = Database.getDB();
    this.db.clearDB();
    this.rc = new ResponseCreator();
  }

  public getAllUsers: TGetAllUsers = async (_req, res, _data) => {
    try {
      const users = (await this.db.get(TableName.USERS)) as Array<TUserData>;

      this.rc.status200(res, users);
    } catch {
      this.rc.status500(res);
    }
  };

  public getUser: TGetUser = async (_req, res, urlData) => {
    const id: number = Number(urlData);

    if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
      this.rc.status400(res, "Incorrect UserId");

      return;
    }

    try {
      const user = (await this.db.get(TableName.USERS, id)) as TUserData | null;

      if (user === null) {
        this.rc.status404(res, "User Does Not Exist");
      } else {
        this.rc.status200(res, user);
      }
    } catch {
      this.rc.status500(res);
    }
  };

  public createUser: TCreateUser = async (req, res, _urlData) => {
    if (req.headers["content-type"] !== "application/json") {
      this.rc.status400(
        res,
        "The 'content-type' header must be 'application/json'"
      );

      return;
    }

    let reqData;
    try {
      reqData = await getReqData(req);
    } catch {
      this.rc.status400(res, "Request Data Is Not In JSON Format");

      return;
    }

    if (reqData === null) {
      this.rc.status400(res, "Request Data Does Not Exist");

      return;
    }

    const user = UserModel.create({ ...reqData });

    if (user === null) {
      this.rc.status400(res, "Body Does Not Contain Required Fields");

      return;
    }

    try {
      const data = await this.db.post(TableName.USERS, user);

      this.rc.status201(res, data);
    } catch {
      this.rc.status500(res);
    }
  };

  public updateUser: TUpdateUser = async (req, res, urlData) => {
    const id: number = Number(urlData);

    if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
      this.rc.status400(res, "Incorrect UserId");

      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      this.rc.status400(
        res,
        "The 'content-type' header must be 'application/json'"
      );

      return;
    }

    let reqData;
    try {
      reqData = await getReqData(req);
    } catch {
      this.rc.status400(res, "Request Data Is Not In JSON Format");

      return;
    }

    if (reqData === null) {
      this.rc.status400(res, "Request Data Does Not Exist");

      return;
    }

    const user = UserModel.create({ ...reqData });

    if (user === null) {
      this.rc.status400(res, "Body Does Not Contain Required Fields");

      return;
    }

    try {
      const updatedData = await this.db.put(TableName.USERS, id, user);

      if (updatedData === null) {
        this.rc.status404(res, "User Does Not Exist");
      } else {
        this.rc.status200(res, updatedData);
      }
    } catch {
      this.rc.status500(res);
    }
  };

  public deleteUser: TDeleteUser = async (_req, res, urlData) => {
    const id: number = Number(urlData);

    if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
      this.rc.status400(res, "Incorrect UserId");

      return;
    }

    try {
      const isRemoved = await this.db.delete(TableName.USERS, id);

      if (isRemoved) {
        this.rc.status204(res);
      } else {
        this.rc.status404(res, "User Does Not Exist");
      }
    } catch {
      this.rc.status500(res);
    }
  };
}

export default UsersController;
