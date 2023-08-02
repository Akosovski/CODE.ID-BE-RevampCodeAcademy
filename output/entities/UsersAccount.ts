import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Bank } from "./Bank";
import { Fintech } from "./Fintech";
import { Users } from "./Users";

@Index("users_account_usac_account_number_key", ["usacAccountNumber"], {
  unique: true,
})
@Index("users_account_pkey", ["usacBankEntityId", "usacUserEntityId"], {
  unique: true,
})
@Entity("users_account", { schema: "payment" })
export class UsersAccount {
  @Column("integer", { primary: true, name: "usac_bank_entity_id" })
  usacBankEntityId: number;

  @Column("integer", { primary: true, name: "usac_user_entity_id" })
  usacUserEntityId: number;

  @Column("character varying", {
    name: "usac_account_number",
    nullable: true,
    unique: true,
    length: 25,
  })
  usacAccountNumber: string | null;

  @Column("numeric", { name: "usac_saldo", nullable: true })
  usacSaldo: string | null;

  @Column("character varying", {
    name: "usac_type",
    nullable: true,
    length: 15,
  })
  usacType: string | null;

  @Column("timestamp without time zone", {
    name: "usac_start_date",
    nullable: true,
  })
  usacStartDate: Date | null;

  @Column("timestamp without time zone", {
    name: "usac_end_date",
    nullable: true,
  })
  usacEndDate: Date | null;

  @Column("timestamp without time zone", {
    name: "usac_modified_date",
    nullable: true,
  })
  usacModifiedDate: Date | null;

  @Column("character varying", {
    name: "usac_status",
    nullable: true,
    length: 15,
  })
  usacStatus: string | null;

  @ManyToOne(() => Bank, (bank) => bank.usersAccounts, { onDelete: "CASCADE" })
  @JoinColumn([
    { name: "usac_bank_entity_id", referencedColumnName: "bankEntityId" },
  ])
  usacBankEntity: Bank;

  @ManyToOne(() => Fintech, (fintech) => fintech.usersAccounts, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "usac_bank_entity_id", referencedColumnName: "fintEntityId" },
  ])
  usacBankEntity_2: Fintech;

  @ManyToOne(() => Users, (users) => users.usersAccounts)
  @JoinColumn([
    { name: "usac_user_entity_id", referencedColumnName: "userEntityId" },
  ])
  usacUserEntity: Users;
}
