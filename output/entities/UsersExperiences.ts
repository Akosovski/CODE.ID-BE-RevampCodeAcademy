import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City";
import { Users } from "./Users";
import { UsersSkill } from "./UsersSkill";

@Index("usex_id", ["usexEntityId", "usexId"], { unique: true })
@Index("users_experiences_usex_id_key", ["usexId"], { unique: true })
@Entity("users_experiences", { schema: "users" })
export class UsersExperiences {
  @PrimaryGeneratedColumn({ type: "integer", name: "usex_id" })
  usexId: number;

  @Column("integer", { primary: true, name: "usex_entity_id" })
  usexEntityId: number;

  @Column("character varying", {
    name: "usex_title",
    nullable: true,
    length: 255,
  })
  usexTitle: string | null;

  @Column("character varying", {
    name: "usex_profile_headline",
    nullable: true,
    length: 512,
  })
  usexProfileHeadline: string | null;

  @Column("character varying", {
    name: "usex_employment_type",
    nullable: true,
    length: 15,
  })
  usexEmploymentType: string | null;

  @Column("character varying", {
    name: "usex_company_name",
    nullable: true,
    length: 255,
  })
  usexCompanyName: string | null;

  @Column("character", { name: "usex_is_current", nullable: true, length: 1 })
  usexIsCurrent: string | null;

  @Column("timestamp without time zone", {
    name: "usex_start_date",
    nullable: true,
  })
  usexStartDate: Date | null;

  @Column("timestamp without time zone", {
    name: "usex_end_date",
    nullable: true,
  })
  usexEndDate: Date | null;

  @Column("character varying", {
    name: "usex_industry",
    nullable: true,
    length: 15,
  })
  usexIndustry: string | null;

  @Column("character varying", {
    name: "usex_description",
    nullable: true,
    length: 512,
  })
  usexDescription: string | null;

  @Column("character varying", {
    name: "usex_experience_type",
    nullable: true,
    length: 15,
  })
  usexExperienceType: string | null;

  @ManyToOne(() => City, (city) => city.usersExperiences)
  @JoinColumn([{ name: "usex_city_id", referencedColumnName: "cityId" }])
  usexCity: City;

  @ManyToOne(() => Users, (users) => users.usersExperiences)
  @JoinColumn([
    { name: "usex_entity_id", referencedColumnName: "userEntityId" },
  ])
  usexEntity: Users;

  @ManyToMany(() => UsersSkill, (usersSkill) => usersSkill.usersExperiences)
  @JoinTable({
    name: "users_experiences_skill",
    joinColumns: [{ name: "uesk_usex_id", referencedColumnName: "usexId" }],
    inverseJoinColumns: [
      { name: "uesk_uski_id", referencedColumnName: "uskiId" },
    ],
    schema: "users",
  })
  usersSkills: UsersSkill[];
}
