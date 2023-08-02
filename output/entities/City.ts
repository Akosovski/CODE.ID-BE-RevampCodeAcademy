import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { Province } from "./Province";
import { ProgramEntity } from "./ProgramEntity";
import { UsersExperiences } from "./UsersExperiences";

@Index("city_pkey", ["cityId"], { unique: true })
@Index("city_city_name_key", ["cityName"], { unique: true })
@Entity("city", { schema: "master" })
export class City {
  @PrimaryGeneratedColumn({ type: "integer", name: "city_id" })
  cityId: number;

  @Column("character varying", {
    name: "city_name",
    nullable: true,
    unique: true,
    length: 155,
  })
  cityName: string | null;

  @Column("timestamp without time zone", {
    name: "city_modified_date",
    nullable: true,
  })
  cityModifiedDate: Date | null;

  @OneToMany(() => Address, (address) => address.addrCity)
  addresses: Address[];

  @ManyToOne(() => Province, (province) => province.cities)
  @JoinColumn([{ name: "city_prov_id", referencedColumnName: "provId" }])
  cityProv: Province;

  @OneToMany(() => ProgramEntity, (programEntity) => programEntity.progCity)
  programEntities: ProgramEntity[];

  @OneToMany(
    () => UsersExperiences,
    (usersExperiences) => usersExperiences.usexCity
  )
  usersExperiences: UsersExperiences[];
}
