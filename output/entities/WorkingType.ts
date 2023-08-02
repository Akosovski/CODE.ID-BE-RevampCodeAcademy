import { Column, Entity, Index, OneToMany } from "typeorm";
import { JobPost } from "./JobPost";

@Index("working_type_pkey", ["wotyCode"], { unique: true })
@Index("working_type_woty_name_key", ["wotyName"], { unique: true })
@Entity("working_type", { schema: "master" })
export class WorkingType {
  @Column("character varying", { primary: true, name: "woty_code", length: 15 })
  wotyCode: string;

  @Column("character varying", {
    name: "woty_name",
    nullable: true,
    unique: true,
    length: 55,
  })
  wotyName: string | null;

  @OneToMany(() => JobPost, (jobPost) => jobPost.jopoWorkCode)
  jobPosts: JobPost[];
}
