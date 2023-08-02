import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { JobPost } from "./JobPost";

@Index("job_post_desc_pkey", ["jopoEntityId"], { unique: true })
@Entity("job_post_desc", { schema: "jobhire" })
export class JobPostDesc {
  @Column("integer", { primary: true, name: "jopo_entity_id" })
  jopoEntityId: number;

  @Column("json", { name: "jopo_description", nullable: true })
  jopoDescription: object | null;

  @Column("json", { name: "jopo_responsibility", nullable: true })
  jopoResponsibility: object | null;

  @Column("json", { name: "jopo_target", nullable: true })
  jopoTarget: object | null;

  @Column("json", { name: "jopo_benefit", nullable: true })
  jopoBenefit: object | null;

  @OneToOne(() => JobPost, (jobPost) => jobPost.jobPostDesc)
  @JoinColumn([
    { name: "jopo_entity_id", referencedColumnName: "jopoEntityId" },
  ])
  jopoEntity: JobPost;
}
