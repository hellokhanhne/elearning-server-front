interface ICreateRole {
  role_title: string;
  role_desc: string;
}

interface IRole extends ICreateRole {
  role_id: number;
}

export type { IRole, ICreateRole };
