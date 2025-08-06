import { IsInt, IsNotEmpty, IsString, Min, IsUrl } from 'class-validator';
export class CreateCollectibleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsInt()
  @Min(1900)
  year: number;

  @IsInt()
  categoryId: number;
}
