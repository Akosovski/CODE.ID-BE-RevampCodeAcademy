import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Batch } from "./Batch";
import { CartItems } from "./CartItems";
import { InstructorPrograms } from "./InstructorPrograms";
import { ProgramApply } from "./ProgramApply";
import { ProgramApplyProgress } from "./ProgramApplyProgress";
import { Category } from "./Category";
import { City } from "./City";
import { Employee } from "./Employee";
import { Status } from "./Status";
import { ProgramEntityDescription } from "./ProgramEntityDescription";
import { ProgramReviews } from "./ProgramReviews";
import { SalesOrderDetail } from "./SalesOrderDetail";
import { Sections } from "./Sections";
import { SpecialOfferPrograms } from "./SpecialOfferPrograms";

@Index("program_entity_pkey", ["progEntityId"], { unique: true })
@Entity("program_entity", { schema: "curriculum" })
export class ProgramEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "prog_entity_id" })
  progEntityId: number;

  @Column("character varying", {
    name: "prog_title",
    nullable: true,
    length: 256,
  })
  progTitle: string | null;

  @Column("character varying", {
    name: "prog_headline",
    nullable: true,
    length: 512,
  })
  progHeadline: string | null;

  @Column("character varying", {
    name: "prog_type",
    nullable: true,
    length: 15,
  })
  progType: string | null;

  @Column("character varying", {
    name: "prog_learning_type",
    nullable: true,
    length: 15,
  })
  progLearningType: string | null;

  @Column("integer", { name: "prog_rating", nullable: true })
  progRating: number | null;

  @Column("integer", { name: "prog_total_trainee", nullable: true })
  progTotalTrainee: number | null;

  @Column("timestamp without time zone", {
    name: "prog_modified_date",
    nullable: true,
  })
  progModifiedDate: Date | null;

  @Column("character varying", {
    name: "prog_image",
    nullable: true,
    length: 256,
  })
  progImage: string | null;

  @Column("character", { name: "prog_best_seller", nullable: true, length: 1 })
  progBestSeller: string | null;

  @Column("integer", { name: "prog_price", nullable: true })
  progPrice: number | null;

  @Column("character varying", {
    name: "prog_language",
    nullable: true,
    length: 35,
  })
  progLanguage: string | null;

  @Column("integer", { name: "prog_duration", nullable: true })
  progDuration: number | null;

  @Column("character varying", {
    name: "prog_duration_type",
    nullable: true,
    length: 15,
  })
  progDurationType: string | null;

  @Column("character varying", {
    name: "prog_tag_skill",
    nullable: true,
    length: 512,
  })
  progTagSkill: string | null;

  @OneToMany(() => Batch, (batch) => batch.batchEntity)
  batches: Batch[];

  @OneToMany(() => CartItems, (cartItems) => cartItems.caitProgEntity)
  cartItems: CartItems[];

  @OneToMany(
    () => InstructorPrograms,
    (instructorPrograms) => instructorPrograms.inproEntity
  )
  instructorPrograms: InstructorPrograms[];

  @OneToMany(() => ProgramApply, (programApply) => programApply.prapProgEntity)
  programApplies: ProgramApply[];

  @OneToMany(
    () => ProgramApplyProgress,
    (programApplyProgress) => programApplyProgress.parogProgEntity
  )
  programApplyProgresses: ProgramApplyProgress[];

  @ManyToOne(() => Category, (category) => category.programEntities)
  @JoinColumn([{ name: "prog_cate_id", referencedColumnName: "cateId" }])
  progCate: Category;

  @ManyToOne(() => City, (city) => city.programEntities)
  @JoinColumn([{ name: "prog_city_id", referencedColumnName: "cityId" }])
  progCity: City;

  @ManyToOne(() => Employee, (employee) => employee.programEntities)
  @JoinColumn([
    { name: "prog_created_by", referencedColumnName: "empEntityId" },
  ])
  progCreatedBy: Employee;

  @ManyToOne(() => Status, (status) => status.programEntities)
  @JoinColumn([{ name: "prog_status", referencedColumnName: "status" }])
  progStatus: Status;

  @OneToOne(
    () => ProgramEntityDescription,
    (programEntityDescription) => programEntityDescription.predProgEntity
  )
  programEntityDescription: ProgramEntityDescription;

  @OneToMany(
    () => ProgramReviews,
    (programReviews) => programReviews.prowProgEntity
  )
  programReviews: ProgramReviews[];

  @OneToMany(
    () => SalesOrderDetail,
    (salesOrderDetail) => salesOrderDetail.sodeProgEntity
  )
  salesOrderDetails: SalesOrderDetail[];

  @OneToMany(() => Sections, (sections) => sections.sectProgEntity)
  sections: Sections[];

  @OneToMany(
    () => SpecialOfferPrograms,
    (specialOfferPrograms) => specialOfferPrograms.socoProgEntity
  )
  specialOfferPrograms: SpecialOfferPrograms[];
}
