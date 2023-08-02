import { Column, Entity, Index, OneToMany } from "typeorm";
import { UsersPhones } from "./UsersPhones";

@Index("phone_number_type_pkey", ["pontyCode"], { unique: true })
@Entity("phone_number_type", { schema: "users" })
export class PhoneNumberType {
  @Column("character varying", {
    primary: true,
    name: "ponty_code",
    length: 15,
  })
  pontyCode: string;

  @Column("timestamp without time zone", {
    name: "ponty_modified_date",
    nullable: true,
  })
  pontyModifiedDate: Date | null;

  @OneToMany(() => UsersPhones, (usersPhones) => usersPhones.uspoPontyCode)
  usersPhones: UsersPhones[];
}
