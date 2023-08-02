import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { PhoneNumberType } from "./PhoneNumberType";

@Index("phones", ["uspoEntityId", "uspoNumber"], { unique: true })
@Entity("users_phones", { schema: "users" })
export class UsersPhones {
  @Column("integer", { primary: true, name: "uspo_entity_id" })
  uspoEntityId: number;

  @Column("character varying", {
    primary: true,
    name: "uspo_number",
    length: 15,
  })
  uspoNumber: string;

  @Column("timestamp without time zone", {
    name: "uspo_modified_date",
    nullable: true,
  })
  uspoModifiedDate: Date | null;

  @ManyToOne(() => Users, (users) => users.usersPhones)
  @JoinColumn([
    { name: "uspo_entity_id", referencedColumnName: "userEntityId" },
  ])
  uspoEntity: Users;

  @ManyToOne(
    () => PhoneNumberType,
    (phoneNumberType) => phoneNumberType.usersPhones
  )
  @JoinColumn([{ name: "uspo_ponty_code", referencedColumnName: "pontyCode" }])
  uspoPontyCode: PhoneNumberType;
}
