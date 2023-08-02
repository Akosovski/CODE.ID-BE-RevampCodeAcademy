import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { SkillTemplate } from "./SkillTemplate";
import { UsersSkill } from "./UsersSkill";

@Index("skil_type_pkey", ["sktyName"], { unique: true })
@Entity("skill_type", { schema: "master" })
export class SkillType {
  @Column("character varying", { primary: true, name: "skty_name", length: 55 })
  sktyName: string;

  @OneToMany(() => SkillTemplate, (skillTemplate) => skillTemplate.sktyName)
  skillTemplates: SkillTemplate[];

  @OneToOne(() => UsersSkill, (usersSkill) => usersSkill.uskiSktyName2)
  usersSkill: UsersSkill;
}
