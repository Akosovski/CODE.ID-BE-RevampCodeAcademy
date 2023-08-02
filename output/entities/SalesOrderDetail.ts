import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ProgramEntity } from "./ProgramEntity";
import { SalesOrderHeader } from "./SalesOrderHeader";

@Index("sales_order_detail_pkey", ["sodeId"], { unique: true })
@Entity("sales_order_detail", { schema: "sales" })
export class SalesOrderDetail {
  @Column("integer", { primary: true, name: "sode_id" })
  sodeId: number;

  @Column("integer", { name: "sode_qty", nullable: true })
  sodeQty: number | null;

  @Column("money", { name: "sode_unit_price", nullable: true })
  sodeUnitPrice: string | null;

  @Column("money", { name: "sode_unit_discount", nullable: true })
  sodeUnitDiscount: string | null;

  @Column("integer", { name: "sode_line_total", nullable: true })
  sodeLineTotal: number | null;

  @Column("timestamp without time zone", {
    name: "sode_modified_date",
    nullable: true,
  })
  sodeModifiedDate: Date | null;

  @ManyToOne(
    () => ProgramEntity,
    (programEntity) => programEntity.salesOrderDetails
  )
  @JoinColumn([
    { name: "sode_prog_entity_id", referencedColumnName: "progEntityId" },
  ])
  sodeProgEntity: ProgramEntity;

  @ManyToOne(
    () => SalesOrderHeader,
    (salesOrderHeader) => salesOrderHeader.salesOrderDetails
  )
  @JoinColumn([{ name: "sode_sohe_id", referencedColumnName: "soheId" }])
  sodeSohe: SalesOrderHeader;
}
