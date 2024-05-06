import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Position {
  @Prop()
  title: string;
}
export const PositionSchema = SchemaFactory.createForClass(Position);
