import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("education", ["usduEntityId", "usduId"], { unique: true })
@Entity("users_education", { schema: "users" })
export class UsersEducation {
  @PrimaryGeneratedColumn({ type: "integer", name: "usdu_id" })
  usduId: number;

  @Column("integer", { primary: true, name: "usdu_entity_id" })
  usduEntityId: number;

  @Column("character varying", {
    name: "usdu_school",
    nullable: true,
    length: 255,
  })
  usduSchool: string | null;

  @Column("character varying", {
    name: "usdu_degree",
    nullable: true,
    length: 15,
  })
  usduDegree: string | null;

  @Column("character varying", {
    name: "usdu_field_study",
    nullable: true,
    length: 125,
  })
  usduFieldStudy: string | null;

  @Column("character varying", {
    name: "usdu_graduate_year",
    nullable: true,
    length: 4,
  })
  usduGraduateYear: string | null;

  @Column("timestamp without time zone", {
    name: "usdu_start_date",
    nullable: true,
  })
  usduStartDate: Date | null;

  @Column("timestamp without time zone", {
    name: "usdu_end_date",
    nullable: true,
  })
  usduEndDate: Date | null;

  @Column("character varying", {
    name: "usdu_grade",
    nullable: true,
    length: 5,
  })
  usduGrade: string | null;

  @Column("character varying", {
    name: "usdu_activities",
    nullable: true,
    length: 512,
  })
  usduActivities: string | null;

  @Column("character varying", {
    name: "usdu_description",
    nullable: true,
    length: 512,
  })
  usduDescription: string | null;

  @Column("timestamp without time zone", {
    name: "usdu_modified_date",
    nullable: true,
  })
  usduModifiedDate: Date | null;

  @ManyToOne(() => Users, (users) => users.usersEducations)
  @JoinColumn([
    { name: "usdu_entity_id", referencedColumnName: "userEntityId" },
  ])
  usduEntity: Users;
}
