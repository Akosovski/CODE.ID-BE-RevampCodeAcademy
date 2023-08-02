import { Column, Entity, Index, OneToMany } from "typeorm";
import { Province } from "./Province";

@Index("country_pkey", ["countryCode"], { unique: true })
@Index("country_country_name_key", ["countryName"], { unique: true })
@Entity("country", { schema: "master" })
export class Country {
  @Column("character varying", {
    primary: true,
    name: "country_code",
    length: 3,
  })
  countryCode: string;

  @Column("character varying", {
    name: "country_name",
    nullable: true,
    unique: true,
    length: 85,
  })
  countryName: string | null;

  @Column("timestamp without time zone", {
    name: "country_modified_date",
    nullable: true,
  })
  countryModifiedDate: Date | null;

  @OneToMany(() => Province, (province) => province.provCountryCode)
  provinces: Province[];
}
