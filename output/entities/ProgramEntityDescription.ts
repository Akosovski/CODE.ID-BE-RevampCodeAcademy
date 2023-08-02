import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { ProgramEntity } from "./ProgramEntity";

@Index("program_entity_description_pkey", ["predProgEntityId"], {
  unique: true,
})
@Entity("program_entity_description", { schema: "curriculum" })
export class ProgramEntityDescription {
  @Column("integer", { primary: true, name: "pred_prog_entity_id" })
  predProgEntityId: number;

  @Column("json", { name: "pred_item_learning", nullable: true })
  predItemLearning: object | null;

  @Column("json", { name: "pred_item_include", nullable: true })
  predItemInclude: object | null;

  @Column("json", { name: "pred_requirement", nullable: true })
  predRequirement: object | null;

  @Column("json", { name: "pred_description", nullable: true })
  predDescription: object | null;

  @Column("json", { name: "pred_target_level", nullable: true })
  predTargetLevel: object | null;

  @OneToOne(
    () => ProgramEntity,
    (programEntity) => programEntity.programEntityDescription
  )
  @JoinColumn([
    { name: "pred_prog_entity_id", referencedColumnName: "progEntityId" },
  ])
  predProgEntity: ProgramEntity;
}
