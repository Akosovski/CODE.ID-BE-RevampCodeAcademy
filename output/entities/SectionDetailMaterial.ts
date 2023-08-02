import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SectionDetail } from "./SectionDetail";

@Index("section_detail_material_pkey", ["sedmId"], { unique: true })
@Entity("section_detail_material", { schema: "curriculum" })
export class SectionDetailMaterial {
  @PrimaryGeneratedColumn({ type: "integer", name: "sedm_id" })
  sedmId: number;

  @Column("character varying", {
    name: "sedm_filename",
    nullable: true,
    length: 55,
  })
  sedmFilename: string | null;

  @Column("integer", { name: "sedm_filesize", nullable: true })
  sedmFilesize: number | null;

  @Column("character varying", {
    name: "sedm_filetype",
    nullable: true,
    length: 15,
  })
  sedmFiletype: string | null;

  @Column("character varying", {
    name: "sedm_filelink",
    nullable: true,
    length: 255,
  })
  sedmFilelink: string | null;

  @Column("timestamp without time zone", {
    name: "sedm_modified_date",
    nullable: true,
  })
  sedmModifiedDate: Date | null;

  @ManyToOne(
    () => SectionDetail,
    (sectionDetail) => sectionDetail.sectionDetailMaterials
  )
  @JoinColumn([{ name: "sedm_secd_id", referencedColumnName: "secdId" }])
  sedmSecd: SectionDetail;
}
