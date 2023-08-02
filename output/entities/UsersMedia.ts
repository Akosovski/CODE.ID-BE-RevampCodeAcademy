import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("media_id", ["usmeEntityId", "usmeId"], { unique: true })
@Entity("users_media", { schema: "users" })
export class UsersMedia {
  @PrimaryGeneratedColumn({ type: "integer", name: "usme_id" })
  usmeId: number;

  @Column("integer", { primary: true, name: "usme_entity_id" })
  usmeEntityId: number;

  @Column("character varying", {
    name: "usme_file_link",
    nullable: true,
    length: 255,
  })
  usmeFileLink: string | null;

  @Column("character varying", {
    name: "usme_filename",
    nullable: true,
    length: 55,
  })
  usmeFilename: string | null;

  @Column("integer", { name: "usme_filesize", nullable: true })
  usmeFilesize: number | null;

  @Column("character varying", {
    name: "usme_filetype",
    nullable: true,
    length: 15,
  })
  usmeFiletype: string | null;

  @Column("character varying", {
    name: "usme_note",
    nullable: true,
    length: 55,
  })
  usmeNote: string | null;

  @Column("timestamp without time zone", {
    name: "usme_modified_date",
    nullable: true,
  })
  usmeModifiedDate: Date | null;

  @ManyToOne(() => Users, (users) => users.usersMedias)
  @JoinColumn([
    { name: "usme_entity_id", referencedColumnName: "userEntityId" },
  ])
  usmeEntity: Users;
}
