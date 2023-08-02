import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("transaction_payment_trpa_code_number_key", ["trpaCodeNumber"], {
  unique: true,
})
@Index("transaction_payment_pkey", ["trpaId"], { unique: true })
@Entity("transaction_payment", { schema: "payment" })
export class TransactionPayment {
  @PrimaryGeneratedColumn({ type: "integer", name: "trpa_id" })
  trpaId: number;

  @Column("character varying", {
    name: "trpa_code_number",
    nullable: true,
    unique: true,
    length: 55,
  })
  trpaCodeNumber: string | null;

  @Column("character varying", {
    name: "trpa_order_number",
    nullable: true,
    length: 25,
  })
  trpaOrderNumber: string | null;

  @Column("numeric", { name: "trpa_debit", nullable: true })
  trpaDebit: string | null;

  @Column("numeric", { name: "trpa_credit", nullable: true })
  trpaCredit: string | null;

  @Column("character varying", {
    name: "trpa_type",
    nullable: true,
    length: 15,
  })
  trpaType: string | null;

  @Column("character varying", {
    name: "trpa_note",
    nullable: true,
    length: 255,
  })
  trpaNote: string | null;

  @Column("timestamp without time zone", {
    name: "trpa_modified_date",
    nullable: true,
  })
  trpaModifiedDate: Date | null;

  @Column("character varying", { name: "trpa_source_id", length: 25 })
  trpaSourceId: string;

  @Column("character varying", { name: "trpa_target_id", length: 25 })
  trpaTargetId: string;

  @ManyToOne(() => Users, (users) => users.transactionPayments)
  @JoinColumn([
    { name: "trpa_user_entity_id", referencedColumnName: "userEntityId" },
  ])
  trpaUserEntity: Users;
}
