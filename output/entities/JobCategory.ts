import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobPost } from "./JobPost";

@Index("job_category_pkey", ["jocaId"], { unique: true })
@Entity("job_category", { schema: "jobhire" })
export class JobCategory {
  @PrimaryGeneratedColumn({ type: "integer", name: "joca_id" })
  jocaId: number;

  @Column("character varying", {
    name: "joca_name",
    nullable: true,
    length: 255,
  })
  jocaName: string | null;

  @Column("timestamp without time zone", {
    name: "joca_modified_date",
    nullable: true,
  })
  jocaModifiedDate: Date | null;

  @OneToMany(() => JobPost, (jobPost) => jobPost.jopoJoca)
  jobPosts: JobPost[];
}
