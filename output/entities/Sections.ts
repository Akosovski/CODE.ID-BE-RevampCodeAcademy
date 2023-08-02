import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SectionDetail } from "./SectionDetail";
import { ProgramEntity } from "./ProgramEntity";

@Index("sect_id", ["sectId", "sectProgEntityId"], { unique: true })
@Index("sections_sect_id_key", ["sectId"], { unique: true })
@Entity("sections", { schema: "curriculum" })
export class Sections {
  @PrimaryGeneratedColumn({ type: "integer", name: "sect_id" })
  sectId: number;

  @Column("integer", { primary: true, name: "sect_prog_entity_id" })
  sectProgEntityId: number;

  @Column("character varying", {
    name: "sect_title",
    nullable: true,
    length: 100,
  })
  sectTitle: string | null;

  @Column("character varying", {
    name: "sect_description",
    nullable: true,
    length: 256,
  })
  sectDescription: string | null;

  @Column("integer", { name: "sect_total_section", nullable: true })
  sectTotalSection: number | null;

  @Column("integer", { name: "sect_total_lecture", nullable: true })
  sectTotalLecture: number | null;

  @Column("integer", { name: "sect_total_minute", nullable: true })
  sectTotalMinute: number | null;

  @Column("timestamp without time zone", {
    name: "sect_modified_date",
    nullable: true,
  })
  sectModifiedDate: Date | null;

  @OneToMany(() => SectionDetail, (sectionDetail) => sectionDetail.secdSect)
  sectionDetails: SectionDetail[];

  @ManyToOne(() => ProgramEntity, (programEntity) => programEntity.sections)
  @JoinColumn([
    { name: "sect_prog_entity_id", referencedColumnName: "progEntityId" },
  ])
  sectProgEntity: ProgramEntity;
}
