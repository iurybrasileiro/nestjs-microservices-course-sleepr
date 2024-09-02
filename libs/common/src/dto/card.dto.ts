import { IsCreditCard, IsNotEmpty, IsString } from 'class-validator';

export class CardDto {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsString()
  @IsNotEmpty()
  exp_month: string;

  @IsString()
  @IsNotEmpty()
  exp_year: string;

  @IsCreditCard()
  number: string;
}
