import { Column, Entity, Index, OneToMany } from "typeorm";
import { RouteActions } from "./RouteActions";
import { Status } from "./Status";

@Index("modules_pkey", ["moduleName"], { unique: true })
@Entity("modules", { schema: "master" })
export class Modules {
  @Column("character varying", {
    primary: true,
    name: "module_name",
    length: 125,
  })
  moduleName: string;

  @OneToMany(() => RouteActions, (routeActions) => routeActions.roacModuleName)
  routeActions: RouteActions[];

  @OneToMany(() => Status, (status) => status.statusModule)
  statuses: Status[];
}
