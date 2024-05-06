import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Position } from 'src/position/entities/position.entity';

@Schema({
  timestamps: true,
})
export class Employee {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Position' })
  position: Position;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
