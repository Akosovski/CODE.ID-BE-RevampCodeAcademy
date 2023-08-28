/* eslint-disable prettier/prettier */
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("users_address_pkey", ["etadAddrId"], { unique: true })
@Entity("users_address", { schema: "users" })
export class UsersAddress {
  @Column("integer", { primary: true, name: "etad_addr_id" })
  etadAddrId: number;

  @Column("timestamp without time zone", {
    name: "etad_modified_date",
    nullable: true,
  })
  etadModifiedDate: Date | null;

  @Column("integer", { name: "etad_adty_id", nullable: true })
  etadAdtyId: number | null;

  @ManyToOne(() => Users, (users) => users.usersAddresses)
  @JoinColumn([
    { name: "etad_entity_id", referencedColumnName: "userEntityId" },
  ])
  etadEntity: Users;
}

