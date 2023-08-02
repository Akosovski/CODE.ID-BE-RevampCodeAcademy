import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobPost } from "./JobPost";

@Index("job_photo_pkey", ["jophoId"], { unique: true })
@Entity("job_photo", { schema: "jobhire" })
export class JobPhoto {
  @PrimaryGeneratedColumn({ type: "integer", name: "jopho_id" })
  jophoId: number;

  @Column("character varying", {
    name: "jopho_filename",
    nullable: true,
    length: 55,
  })
  jophoFilename: string | null;

  @Column("integer", { name: "jopho_filesize", nullable: true })
  jophoFilesize: number | null;

  @Column("character varying", {
    name: "jopho_filetype",
    nullable: true,
    length: 15,
  })
  jophoFiletype: string | null;

  @Column("timestamp without time zone", {
    name: "jopho_modified_date",
    nullable: true,
  })
  jophoModifiedDate: Date | null;

  @ManyToOne(() => JobPost, (jobPost) => jobPost.jobPhotos)
  @JoinColumn([
    { name: "jopho_entity_id", referencedColumnName: "jopoEntityId" },
  ])
  jophoEntity: JobPost;
}
