import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { BusinessEntity } from "./BusinessEntity";
import { UsersAccount } from "./UsersAccount";

@Index("fintech_fint_code_key", ["fintCode"], { unique: true })
@Index("fintech_pkey", ["fintEntityId"], { unique: true })
@Index("fintech_fint_name_key", ["fintName"], { unique: true })
@Entity("fintech", { schema: "payment" })
export class Fintech {
  @Column("integer", { primary: true, name: "fint_entity_id" })
  fintEntityId: number;

  @Column("character varying", {
    name: "fint_code",
    nullable: true,
    unique: true,
    length: 10,
  })
  fintCode: string | null;

  @Column("character varying", {
    name: "fint_name",
    nullable: true,
    unique: true,
    length: 55,
  })
  fintName: string | null;

  @Column("timestamp without time zone", {
    name: "fint_modified_date",
    nullable: true,
  })
  fintModifiedDate: Date | null;

  @OneToOne(() => BusinessEntity, (businessEntity) => businessEntity.fintech)
  @JoinColumn([{ name: "fint_entity_id", referencedColumnName: "entityId" }])
  fintEntity: BusinessEntity;

  @OneToMany(
    () => UsersAccount,
    (usersAccount) => usersAccount.usacBankEntity_2
  )
  usersAccounts: UsersAccount[];
}
