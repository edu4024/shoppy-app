import { IsString, IsArray } from 'class-validator';
export class HistoryDto {
  @IsString()
  userId: string;

  @IsArray()
  products: [];
}
