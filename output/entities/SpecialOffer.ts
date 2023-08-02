import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { SpecialOfferPrograms } from "./SpecialOfferPrograms";

@Index("special_offer_pkey", ["spofId"], { unique: true })
@Entity("special_offer", { schema: "sales" })
export class SpecialOffer {
  @PrimaryGeneratedColumn({ type: "integer", name: "spof_id" })
  spofId: number;

  @Column("character varying", {
    name: "spof_description",
    nullable: true,
    length: 256,
  })
  spofDescription: string | null;

  @Column("integer", { name: "spof_discount", nullable: true })
  spofDiscount: number | null;

  @Column("character varying", {
    name: "spof_type",
    nullable: true,
    length: 15,
  })
  spofType: string | null;

  @Column("timestamp without time zone", {
    name: "spof_start_date",
    nullable: true,
  })
  spofStartDate: Date | null;

  @Column("timestamp without time zone", {
    name: "spof_end_date",
    nullable: true,
  })
  spofEndDate: Date | null;

  @Column("integer", { name: "spof_min_qty", nullable: true })
  spofMinQty: number | null;

  @Column("integer", { name: "spof_max_qty", nullable: true })
  spofMaxQty: number | null;

  @Column("timestamp without time zone", {
    name: "spof_modified_date",
    nullable: true,
  })
  spofModifiedDate: Date | null;

  @ManyToOne(() => Category, (category) => category.specialOffers)
  @JoinColumn([{ name: "spof_cate_id", referencedColumnName: "cateId" }])
  spofCate: Category;

  @OneToMany(
    () => SpecialOfferPrograms,
    (specialOfferPrograms) => specialOfferPrograms.socoSpof
  )
  specialOfferPrograms: SpecialOfferPrograms[];
}
