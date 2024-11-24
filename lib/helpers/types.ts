export type Entity = "users";
export type Method = "get" | "post" | "put" | "patch" | "delete";
export type WithId = { id: number };
export type User = {
  id?: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export type Resource = User;
