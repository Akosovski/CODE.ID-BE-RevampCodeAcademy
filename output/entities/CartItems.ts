import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProgramEntity } from "./ProgramEntity";
import { Users } from "./Users";

@Index("cart_items_pkey", ["caitId"], { unique: true })
@Entity("cart_items", { schema: "sales" })
export class CartItems {
  @PrimaryGeneratedColumn({ type: "integer", name: "cait_id" })
  caitId: number;

  @Column("integer", { name: "cait_quantity", nullable: true })
  caitQuantity: number | null;

  @Column("money", { name: "cait_unit_price", nullable: true })
  caitUnitPrice: string | null;

  @Column("timestamp without time zone", {
    name: "cait_modified_date",
    nullable: true,
  })
  caitModifiedDate: Date | null;

  @ManyToOne(() => ProgramEntity, (programEntity) => programEntity.cartItems)
  @JoinColumn([
    { name: "cait_prog_entity_id", referencedColumnName: "progEntityId" },
  ])
  caitProgEntity: ProgramEntity;

  @ManyToOne(() => Users, (users) => users.cartItems)
  @JoinColumn([
    { name: "cait_user_entity_id", referencedColumnName: "userEntityId" },
  ])
  caitUserEntity: Users;
}
