import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("usli_id", ["usliEntityId", "usliId"], { unique: true })
@Index("users_license_usli_license_code_key", ["usliLicenseCode"], {
  unique: true,
})
@Entity("users_license", { schema: "users" })
export class UsersLicense {
  @PrimaryGeneratedColumn({ type: "integer", name: "usli_id" })
  usliId: number;

  @Column("character varying", {
    name: "usli_license_code",
    nullable: true,
    unique: true,
    length: 512,
  })
  usliLicenseCode: string | null;

  @Column("timestamp without time zone", {
    name: "usli_modified_date",
    nullable: true,
  })
  usliModifiedDate: Date | null;

  @Column("character varying", {
    name: "usli_status",
    nullable: true,
    length: 15,
  })
  usliStatus: string | null;

  @Column("integer", { primary: true, name: "usli_entity_id" })
  usliEntityId: number;

  @ManyToOne(() => Users, (users) => users.usersLicenses)
  @JoinColumn([
    { name: "usli_entity_id", referencedColumnName: "userEntityId" },
  ])
  usliEntity: Users;
}
