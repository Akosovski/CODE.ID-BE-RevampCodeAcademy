import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsersRoles } from "./UsersRoles";

@Index("roles_pkey", ["roleId"], { unique: true })
@Entity("roles", { schema: "users" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "integer", name: "role_id" })
  roleId: number;

  @Column("character varying", {
    name: "role_name",
    nullable: true,
    length: 35,
  })
  roleName: string | null;

  @Column("character varying", {
    name: "role_type",
    nullable: true,
    length: 15,
  })
  roleType: string | null;

  @Column("timestamp without time zone", {
    name: "role_modified_date",
    nullable: true,
  })
  roleModifiedDate: Date | null;

  @OneToMany(() => UsersRoles, (usersRoles) => usersRoles.usroRole)
  usersRoles: UsersRoles[];
}
