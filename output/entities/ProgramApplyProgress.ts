import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./Employee";
import { ProgramEntity } from "./ProgramEntity";
import { Status } from "./Status";
import { Users } from "./Users";

@Index(
  "program_apply_progress_pk",
  ["parogId", "parogProgEntityId", "parogUserEntityId"],
  { unique: true }
)
@Entity("program_apply_progress", { schema: "bootcamp" })
export class ProgramApplyProgress {
  @PrimaryGeneratedColumn({ type: "integer", name: "parog_id" })
  parogId: number;

  @Column("integer", { primary: true, name: "parog_user_entity_id" })
  parogUserEntityId: number;

  @Column("integer", { primary: true, name: "parog_prog_entity_id" })
  parogProgEntityId: number;

  @Column("timestamp without time zone", {
    name: "parog_action_date",
    nullable: true,
  })
  parogActionDate: Date | null;

  @Column("timestamp without time zone", {
    name: "parog_modified_date",
    nullable: true,
  })
  parogModifiedDate: Date | null;

  @Column("character varying", {
    name: "parog_comment",
    nullable: true,
    length: 512,
  })
  parogComment: string | null;

  @Column("character varying", {
    name: "parog_progress_name",
    nullable: true,
    length: 15,
  })
  parogProgressName: string | null;

  @ManyToOne(() => Employee, (employee) => employee.programApplyProgresses)
  @JoinColumn([
    { name: "parog_emp_entity_id", referencedColumnName: "empEntityId" },
  ])
  parogEmpEntity: Employee;

  @ManyToOne(
    () => ProgramEntity,
    (programEntity) => programEntity.programApplyProgresses
  )
  @JoinColumn([
    { name: "parog_prog_entity_id", referencedColumnName: "progEntityId" },
  ])
  parogProgEntity: ProgramEntity;

  @ManyToOne(() => Status, (status) => status.programApplyProgresses)
  @JoinColumn([{ name: "parog_status", referencedColumnName: "status" }])
  parogStatus: Status;

  @ManyToOne(() => Users, (users) => users.programApplyProgresses)
  @JoinColumn([
    { name: "parog_user_entity_id", referencedColumnName: "userEntityId" },
  ])
  parogUserEntity: Users;
}
