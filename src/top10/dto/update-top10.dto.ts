import { PartialType } from '@nestjs/mapped-types';
import { CreateTop10Dto } from './create-top10.dto';

export class UpdateTop10Dto extends PartialType(CreateTop10Dto) {}
