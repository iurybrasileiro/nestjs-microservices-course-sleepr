import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class RoleDto {
  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  name?: string;
}
