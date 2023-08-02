import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City";
import { Country } from "./Country";

@Index("province_prov_code_key", ["provCode"], { unique: true })
@Index("province_pkey", ["provId"], { unique: true })
@Entity("province", { schema: "master" })
export class Province {
  @PrimaryGeneratedColumn({ type: "integer", name: "prov_id" })
  provId: number;

  @Column("character varying", {
    name: "prov_code",
    nullable: true,
    unique: true,
    length: 5,
  })
  provCode: string | null;

  @Column("character varying", {
    name: "prov_name",
    nullable: true,
    length: 85,
  })
  provName: string | null;

  @Column("timestamp without time zone", {
    name: "prov_modified_date",
    nullable: true,
  })
  provModifiedDate: Date | null;

  @OneToMany(() => City, (city) => city.cityProv)
  cities: City[];

  @ManyToOne(() => Country, (country) => country.provinces)
  @JoinColumn([
    { name: "prov_country_code", referencedColumnName: "countryCode" },
  ])
  provCountryCode: Country;
}
