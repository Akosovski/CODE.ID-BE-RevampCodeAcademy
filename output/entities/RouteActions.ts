import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Modules } from "./Modules";

@Index("route_actions_pkey", ["roacId"], { unique: true })
@Entity("route_actions", { schema: "master" })
export class RouteActions {
  @PrimaryGeneratedColumn({ type: "integer", name: "roac_id" })
  roacId: number;

  @Column("character varying", {
    name: "roac_name",
    nullable: true,
    length: 30,
  })
  roacName: string | null;

  @Column("integer", { name: "roac_orderby", nullable: true })
  roacOrderby: number | null;

  @Column("integer", { name: "roac_display", nullable: true })
  roacDisplay: number | null;

  @ManyToOne(() => Modules, (modules) => modules.routeActions)
  @JoinColumn([
    { name: "roac_module_name", referencedColumnName: "moduleName" },
  ])
  roacModuleName: Modules;
}
