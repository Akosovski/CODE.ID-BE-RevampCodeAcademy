/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { BatchTrainee } from "./BatchTrainee";
import { BatchTraineeEvaluation } from "./BatchTraineeEvaluation";
import { CartItems } from "./CartItems";
import { Employee } from "./Employee";
import { ProgramApply } from "./ProgramApply";
import { ProgramApplyProgress } from "./ProgramApplyProgress";
import { ProgramReviews } from "./ProgramReviews";
import { SalesOrderHeader } from "./SalesOrderHeader";
import { TalentApply } from "./TalentApply";
import { TransactionPayment } from "./TransactionPayment";
import { BusinessEntity } from "./BusinessEntity";
import { UsersAccount } from "./UsersAccount";
import { UsersAddress } from "./UsersAddress";
import { UsersEducation } from "./UsersEducation";
import { UsersEmail } from "./UsersEmail";
import { UsersExperiences } from "./UsersExperiences";
import { UsersLicense } from "./UsersLicense";
import { UsersMedia } from "./UsersMedia";
import { UsersPhones } from "./UsersPhones";
import { UsersRoles } from "./UsersRoles";
import { UsersSkill } from "./UsersSkill";

@Index("users_pkey", ["userEntityId"], { unique: true })
@Index("users_user_name_key", ["userName"], { unique: true })
@Entity("users", { schema: "users" })
export class Users {
  @Column("integer", { primary: true, name: "user_entity_id" })
  userEntityId: number;

  @Column("character varying", {
    name: "user_name",
    nullable: true,
    unique: true,
    length: 15,
  })
  userName: string | null;

  @Column("character varying", {
    name: "user_password",
    nullable: true,
    length: 256,
  })
  userPassword: string | null;

  @Column("character varying", {
    name: "user_first_name",
    nullable: true,
    length: 50,
  })
  userFirstName: string | null;

  @Column("character varying", {
    name: "user_last_name",
    nullable: true,
    length: 50,
  })
  userLastName: string | null;

  @Column("timestamp without time zone", {
    name: "user_birth_date",
    nullable: true,
  })
  userBirthDate: Date | null;

  @Column("integer", { name: "user_email_promotion", nullable: true })
  userEmailPromotion: number | null;

  @Column("character varying", { name: "user_demographic", nullable: true })
  userDemographic: string | null;

  @Column("timestamp without time zone", {
    name: "user_modified_date",
    nullable: true,
  })
  userModifiedDate: Date | null;

  @Column("character varying", {
    name: "user_photo",
    nullable: true,
    length: 255,
  })
  userPhoto: string | null;

  @Column("integer", { name: "user_current_role", nullable: true })
  userCurrentRole: number | null;

  @OneToMany(
    () => BatchTrainee,
    (batchTrainee) => batchTrainee.batrTraineeEntity
  )
  batchTrainees: BatchTrainee[];

  @OneToMany(
    () => BatchTraineeEvaluation,
    (batchTraineeEvaluation) => batchTraineeEvaluation.btevTraineeEntity
  )
  batchTraineeEvaluations: BatchTraineeEvaluation[];

  @OneToMany(() => CartItems, (cartItems) => cartItems.caitUserEntity)
  cartItems: CartItems[];

  @OneToOne(() => Employee, (employee) => employee.empEntity)
  employee: Employee;

  @OneToMany(() => ProgramApply, (programApply) => programApply.prapUserEntity)
  programApplies: ProgramApply[];

  @OneToMany(
    () => ProgramApplyProgress,
    (programApplyProgress) => programApplyProgress.parogUserEntity
  )
  programApplyProgresses: ProgramApplyProgress[];

  @OneToMany(
    () => ProgramReviews,
    (programReviews) => programReviews.prowUserEntity
  )
  programReviews: ProgramReviews[];

  @OneToMany(
    () => SalesOrderHeader,
    (salesOrderHeader) => salesOrderHeader.soheUserEntity
  )
  salesOrderHeaders: SalesOrderHeader[];

  @OneToOne(() => TalentApply, (talentApply) => talentApply.taapUserEntity)
  talentApply: TalentApply;

  @OneToMany(
    () => TransactionPayment,
    (transactionPayment) => transactionPayment.trpaUserEntity
  )
  transactionPayments: TransactionPayment[];

  @OneToOne(() => BusinessEntity, (businessEntity) => businessEntity.users)
  @JoinColumn([{ name: "user_entity_id", referencedColumnName: "entityId" }])
  userEntity: BusinessEntity;

  @OneToMany(() => UsersAccount, (usersAccount) => usersAccount.usacUserEntity)
  usersAccounts: UsersAccount[];

  @OneToMany(() => UsersAddress, (usersAddress) => usersAddress.etadEntity)
  usersAddresses: UsersAddress[];

  @OneToMany(
    () => UsersEducation,
    (usersEducation) => usersEducation.usduEntity
  )
  usersEducations: UsersEducation[];

  @OneToMany(() => UsersEmail, (usersEmail) => usersEmail.pmailEntity)
  usersEmails: UsersEmail[];

  @OneToMany(
    () => UsersExperiences,
    (usersExperiences) => usersExperiences.usexEntity
  )
  usersExperiences: UsersExperiences[];

  @OneToMany(() => UsersLicense, (usersLicense) => usersLicense.usliEntity)
  usersLicenses: UsersLicense[];

  @OneToMany(() => UsersMedia, (usersMedia) => usersMedia.usmeEntity)
  usersMedias: UsersMedia[];

  @OneToMany(() => UsersPhones, (usersPhones) => usersPhones.uspoEntity)
  usersPhones: UsersPhones[];

  @OneToMany(() => UsersRoles, (usersRoles) => usersRoles.usroEntity)
  usersRoles: UsersRoles[];

  @OneToMany(() => UsersSkill, (usersSkill) => usersSkill.uskiEntity)
  usersSkills: UsersSkill[];
}
