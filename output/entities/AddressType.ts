import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsersAddress } from "./UsersAddress";

@Index("address_type_pkey", ["adtyId"], { unique: true })
@Index("address_type_adty_name_key", ["adtyName"], { unique: true })
@Entity("address_type", { schema: "master" })
export class AddressType {
  @PrimaryGeneratedColumn({ type: "integer", name: "adty_id" })
  adtyId: number;

  @Column("character varying", {
    name: "adty_name",
    nullable: true,
    unique: true,
    length: 15,
  })
  adtyName: string | null;

  @Column("timestamp without time zone", {
    name: "adty_modified_date",
    nullable: true,
  })
  adtyModifiedDate: Date | null;

  @OneToMany(() => UsersAddress, (usersAddress) => usersAddress.etadAdty)
  usersAddresses: UsersAddress[];
}
