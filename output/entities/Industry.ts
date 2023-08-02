import { Column, Entity, Index, OneToMany } from "typeorm";
import { JobPost } from "./JobPost";

@Index("industry_pkey", ["induCode"], { unique: true })
@Index("industry_indu_name_key", ["induName"], { unique: true })
@Entity("industry", { schema: "master" })
export class Industry {
  @Column("character varying", { primary: true, name: "indu_code", length: 15 })
  induCode: string;

  @Column("character varying", {
    name: "indu_name",
    nullable: true,
    unique: true,
    length: 85,
  })
  induName: string | null;

  @OneToMany(() => JobPost, (jobPost) => jobPost.jopoInduCode)
  jobPosts: JobPost[];
}
