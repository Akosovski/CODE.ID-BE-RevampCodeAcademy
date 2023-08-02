import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsersExperiences } from "./UsersExperiences";
import { Users } from "./Users";
import { SkillType } from "./SkillType";

@Index("uski_id", ["uskiEntityId", "uskiId"], { unique: true })
@Index("users_skill_uski_id_key", ["uskiId"], { unique: true })
@Index("users_skill_uski_skty_name_key", ["uskiSktyName"], { unique: true })
@Entity("users_skill", { schema: "users" })
export class UsersSkill {
  @PrimaryGeneratedColumn({ type: "integer", name: "uski_id" })
  uskiId: number;

  @Column("integer", { primary: true, name: "uski_entity_id" })
  uskiEntityId: number;

  @Column("timestamp without time zone", {
    name: "uski_modified_date",
    nullable: true,
  })
  uskiModifiedDate: Date | null;

  @Column("character varying", {
    name: "uski_skty_name",
    nullable: true,
    unique: true,
    length: 15,
  })
  uskiSktyName: string | null;

  @ManyToMany(
    () => UsersExperiences,
    (usersExperiences) => usersExperiences.usersSkills
  )
  usersExperiences: UsersExperiences[];

  @ManyToOne(() => Users, (users) => users.usersSkills)
  @JoinColumn([
    { name: "uski_entity_id", referencedColumnName: "userEntityId" },
  ])
  uskiEntity: Users;

  @OneToOne(() => SkillType, (skillType) => skillType.usersSkill)
  @JoinColumn([{ name: "uski_skty_name", referencedColumnName: "sktyName" }])
  uskiSktyName2: SkillType;
}
