import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobPhoto } from "./JobPhoto";
import { Address } from "./Address";
import { Client } from "./Client";
import { Education } from "./Education";
import { Employee } from "./Employee";
import { Industry } from "./Industry";
import { JobCategory } from "./JobCategory";
import { JobRole } from "./JobRole";
import { JobType } from "./JobType";
import { Status } from "./Status";
import { WorkingType } from "./WorkingType";
import { JobPostDesc } from "./JobPostDesc";
import { TalentApply } from "./TalentApply";

@Index("job_post_pkey", ["jopoEntityId"], { unique: true })
@Index("job_post_jopo_number_key", ["jopoNumber"], { unique: true })
@Entity("job_post", { schema: "jobhire" })
export class JobPost {
  @PrimaryGeneratedColumn({ type: "integer", name: "jopo_entity_id" })
  jopoEntityId: number;

  @Column("character varying", {
    name: "jopo_number",
    nullable: true,
    unique: true,
    length: 25,
  })
  jopoNumber: string | null;

  @Column("character varying", {
    name: "jopo_title",
    nullable: true,
    length: 256,
  })
  jopoTitle: string | null;

  @Column("timestamp without time zone", {
    name: "jopo_start_date",
    nullable: true,
  })
  jopoStartDate: Date | null;

  @Column("timestamp without time zone", {
    name: "jopo_end_date",
    nullable: true,
  })
  jopoEndDate: Date | null;

  @Column("integer", { name: "jopo_min_salary", nullable: true })
  jopoMinSalary: number | null;

  @Column("integer", { name: "jopo_max_salary", nullable: true })
  jopoMaxSalary: number | null;

  @Column("integer", { name: "jopo_min_experience", nullable: true })
  jopoMinExperience: number | null;

  @Column("integer", { name: "jopo_max_experience", nullable: true })
  jopoMaxExperience: number | null;

  @Column("character varying", {
    name: "jopo_primary_skill",
    nullable: true,
    length: 256,
  })
  jopoPrimarySkill: string | null;

  @Column("character varying", {
    name: "jopo_secondary_skill",
    nullable: true,
    length: 256,
  })
  jopoSecondarySkill: string | null;

  @Column("timestamp without time zone", {
    name: "jopo_publish_date",
    nullable: true,
  })
  jopoPublishDate: Date | null;

  @Column("timestamp without time zone", {
    name: "jopo_modified_date",
    nullable: true,
  })
  jopoModifiedDate: Date | null;

  @OneToMany(() => JobPhoto, (jobPhoto) => jobPhoto.jophoEntity)
  jobPhotos: JobPhoto[];

  @ManyToOne(() => Address, (address) => address.jobPosts)
  @JoinColumn([{ name: "jopo_addr_id", referencedColumnName: "addrId" }])
  jopoAddr: Address;

  @ManyToOne(() => Client, (client) => client.jobPosts)
  @JoinColumn([{ name: "jopo_clit_id", referencedColumnName: "clitId" }])
  jopoClit: Client;

  @ManyToOne(() => Education, (education) => education.jobPosts)
  @JoinColumn([{ name: "jopo_edu_code", referencedColumnName: "eduCode" }])
  jopoEduCode: Education;

  @ManyToOne(() => Employee, (employee) => employee.jobPosts)
  @JoinColumn([
    { name: "jopo_emp_entity_id", referencedColumnName: "empEntityId" },
  ])
  jopoEmpEntity: Employee;

  @ManyToOne(() => Industry, (industry) => industry.jobPosts)
  @JoinColumn([{ name: "jopo_indu_code", referencedColumnName: "induCode" }])
  jopoInduCode: Industry;

  @ManyToOne(() => JobCategory, (jobCategory) => jobCategory.jobPosts)
  @JoinColumn([{ name: "jopo_joca_id", referencedColumnName: "jocaId" }])
  jopoJoca: JobCategory;

  @ManyToOne(() => JobRole, (jobRole) => jobRole.jobPosts)
  @JoinColumn([{ name: "jopo_joro_id", referencedColumnName: "joroId" }])
  jopoJoro: JobRole;

  @ManyToOne(() => JobType, (jobType) => jobType.jobPosts)
  @JoinColumn([{ name: "jopo_joty_id", referencedColumnName: "jotyId" }])
  jopoJoty: JobType;

  @ManyToOne(() => Status, (status) => status.jobPosts)
  @JoinColumn([{ name: "jopo_status", referencedColumnName: "status" }])
  jopoStatus: Status;

  @ManyToOne(() => WorkingType, (workingType) => workingType.jobPosts)
  @JoinColumn([{ name: "jopo_work_code", referencedColumnName: "wotyCode" }])
  jopoWorkCode: WorkingType;

  @OneToOne(() => JobPostDesc, (jobPostDesc) => jobPostDesc.jopoEntity)
  jobPostDesc: JobPostDesc;

  @OneToOne(() => TalentApply, (talentApply) => talentApply.taapEntity)
  talentApply: TalentApply;
}
