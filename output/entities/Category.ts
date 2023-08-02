import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProgramEntity } from "./ProgramEntity";
import { SpecialOffer } from "./SpecialOffer";

@Index("category_pkey", ["cateId"], { unique: true })
@Index("category_cate_name_key", ["cateName"], { unique: true })
@Entity("category", { schema: "master" })
export class Category {
  @PrimaryGeneratedColumn({ type: "integer", name: "cate_id" })
  cateId: number;

  @Column("character varying", {
    name: "cate_name",
    nullable: true,
    unique: true,
    length: 255,
  })
  cateName: string | null;

  @Column("timestamp without time zone", {
    name: "cate_modified_date",
    nullable: true,
  })
  cateModifiedDate: Date | null;

  @ManyToOne(() => Category, (category) => category.categories)
  @JoinColumn([{ name: "cate_cate_id", referencedColumnName: "cateId" }])
  cateCate: Category;

  @OneToMany(() => Category, (category) => category.cateCate)
  categories: Category[];

  @OneToMany(() => ProgramEntity, (programEntity) => programEntity.progCate)
  programEntities: ProgramEntity[];

  @OneToMany(() => SpecialOffer, (specialOffer) => specialOffer.spofCate)
  specialOffers: SpecialOffer[];
}
