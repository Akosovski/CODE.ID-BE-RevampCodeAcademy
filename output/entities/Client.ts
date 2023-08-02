import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Address } from "./Address";
import { EmployeeRange } from "./EmployeeRange";
import { EmployeeClientContract } from "./EmployeeClientContract";
import { JobPost } from "./JobPost";

@Index("client_pkey", ["clitId"], { unique: true })
@Index("client_clit_name_key", ["clitName"], { unique: true })
@Entity("client", { schema: "jobhire" })
export class Client {
  @Column("integer", { primary: true, name: "clit_id" })
  clitId: number;

  @Column("character varying", {
    name: "clit_name",
    nullable: true,
    unique: true,
    length: 256,
  })
  clitName: string | null;

  @Column("character varying", {
    name: "clit_about",
    nullable: true,
    length: 512,
  })
  clitAbout: string | null;

  @Column("timestamp without time zone", {
    name: "clit_modified_date",
    nullable: true,
  })
  clitModifiedDate: Date | null;

  @ManyToOne(() => Address, (address) => address.clients)
  @JoinColumn([{ name: "clit_addr_id", referencedColumnName: "addrId" }])
  clitAddr: Address;

  @ManyToOne(() => EmployeeRange, (employeeRange) => employeeRange.clients)
  @JoinColumn([{ name: "clit_emra_id", referencedColumnName: "emraId" }])
  clitEmra: EmployeeRange;

  @OneToMany(
    () => EmployeeClientContract,
    (employeeClientContract) => employeeClientContract.eccoClit
  )
  employeeClientContracts: EmployeeClientContract[];

  @OneToMany(() => JobPost, (jobPost) => jobPost.jopoClit)
  jobPosts: JobPost[];
}
