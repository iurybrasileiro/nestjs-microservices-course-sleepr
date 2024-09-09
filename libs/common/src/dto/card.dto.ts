import { Field, InputType } from '@nestjs/graphql';
import { IsCreditCard, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CardDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  cvc: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  exp_month: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  exp_year: string;

  @IsCreditCard()
  @Field()
  number: string;
}
