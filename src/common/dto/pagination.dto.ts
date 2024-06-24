import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class paginationDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min( 1 )
    limit?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?: number;
    // page: number;
    // total: number;
    // totalPages: number;
    // hasNext: boolean;
    // hasPrev: boolean;
    // nextPage: number;
    // prevPage: number;
    // firstPage: number;
    // lastPage: number;
    // from: number;
    // to: number;
    // count: number;
    // totalCount: number;
}