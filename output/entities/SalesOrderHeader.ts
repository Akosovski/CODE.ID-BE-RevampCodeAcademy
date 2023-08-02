import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SalesOrderDetail } from "./SalesOrderDetail";
import { Status } from "./Status";
import { Users } from "./Users";

@Index("sales_order_header_pkey", ["soheId"], { unique: true })
@Index("sales_order_header_sohe_license_code_key", ["soheLicenseCode"], {
  unique: true,
})
@Index("sales_order_header_sohe_order_number_key", ["soheOrderNumber"], {
  unique: true,
})
@Entity("sales_order_header", { schema: "sales" })
export class SalesOrderHeader {
  @PrimaryGeneratedColumn({ type: "integer", name: "sohe_id" })
  soheId: number;

  @Column("timestamp without time zone", {
    name: "sohe_order_date",
    nullable: true,
  })
  soheOrderDate: Date | null;

  @Column("timestamp without time zone", {
    name: "sohe_due_date",
    nullable: true,
  })
  soheDueDate: Date | null;

  @Column("timestamp without time zone", {
    name: "sohe_ship_date",
    nullable: true,
  })
  soheShipDate: Date | null;

  @Column("character varying", {
    name: "sohe_order_number",
    nullable: true,
    unique: true,
    length: 25,
  })
  soheOrderNumber: string | null;

  @Column("character varying", {
    name: "sohe_account_number",
    nullable: true,
    length: 25,
  })
  soheAccountNumber: string | null;

  @Column("character varying", {
    name: "sohe_trpa_code_number",
    nullable: true,
    length: 55,
  })
  soheTrpaCodeNumber: string | null;

  @Column("money", { name: "sohe_subtotal", nullable: true })
  soheSubtotal: string | null;

  @Column("money", { name: "sohe_tax", nullable: true })
  soheTax: string | null;

  @Column("integer", { name: "sohe_total_due", nullable: true })
  soheTotalDue: number | null;

  @Column("character varying", {
    name: "sohe_license_code",
    nullable: true,
    unique: true,
    length: 512,
  })
  soheLicenseCode: string | null;

  @Column("timestamp without time zone", {
    name: "sohe_modified_date",
    nullable: true,
  })
  soheModifiedDate: Date | null;

  @OneToMany(
    () => SalesOrderDetail,
    (salesOrderDetail) => salesOrderDetail.sodeSohe
  )
  salesOrderDetails: SalesOrderDetail[];

  @ManyToOne(() => Status, (status) => status.salesOrderHeaders)
  @JoinColumn([{ name: "sohe_status", referencedColumnName: "status" }])
  soheStatus: Status;

  @ManyToOne(() => Users, (users) => users.salesOrderHeaders)
  @JoinColumn([
    { name: "sohe_user_entity_id", referencedColumnName: "userEntityId" },
  ])
  soheUserEntity: Users;
}
