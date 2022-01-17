import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Nfts extends Document {
  @Prop({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  sheetId: number;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  nameEng: string;

  @Prop({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  rarity: number;

  @Prop({
    required: true,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  minted: boolean;

  @Prop()
  @IsString()
  owner: string;
}

export const NftsSchema = SchemaFactory.createForClass(Nfts);
