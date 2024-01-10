import { BaseEntity } from "./BaseEntity";

export interface User extends BaseEntity {
  name: string;
  lastname: string;
  age: number;
  email: string;
  role: number;
}
