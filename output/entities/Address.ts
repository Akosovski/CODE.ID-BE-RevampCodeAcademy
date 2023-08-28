import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City";
import { Client } from "./Client";
import { JobPost } from "./JobPost";
import { UsersAddress } from "./UsersAddress";

@Index("address_pkey", ["addrId"], { unique: true })
@Index("address_addr_line1_key", ["addrLine1"], { unique: true })
@Index("address_addr_line2_key", ["addrLine2"], { unique: true })
@Index("address_addr_postal_code_key", ["addrPostalCode"], { unique: true })
@Entity("address", { schema: "master" })
export class Address {
  @PrimaryGeneratedColumn({ type: "integer", name: "addr_id" })
  addrId: number;

  @Column("character varying", {
    name: "addr_line1",
    nullable: true,
    unique: true,
    length: 255,
  })
  addrLine1: string | null;

  @Column("character varying", {
    name: "addr_line2",
    nullable: true,
    unique: true,
    length: 255,
  })
  addrLine2: string | null;

  @Column("character varying", {
    name: "addr_postal_code",
    nullable: true,
    unique: true,
    length: 10,
  })
  addrPostalCode: string | null;

  @Column("character varying", {
    name: "addr_spatial_location",
    nullable: true,
  })
  addrSpatialLocation: string | null;

  @Column("timestamp without time zone", {
    name: "addr_modified_date",
    nullable: true,
  })
  addrModifiedDate: Date | null;

  @ManyToOne(() => City, (city) => city.addresses)
  @JoinColumn([{ name: "addr_city_id", referencedColumnName: "cityId" }])
  addrCity: City;

  @OneToMany(() => Client, (client) => client.clitAddr)
  clients: Client[];

  @OneToMany(() => JobPost, (jobPost) => jobPost.jopoAddr)
  jobPosts: JobPost[];

  @OneToOne(() => UsersAddress, (usersAddress) => usersAddress.etadAddrId)
  usersAddress: UsersAddress;
}
