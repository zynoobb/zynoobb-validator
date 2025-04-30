// src/decorators/is-korean.decorator.ts
import { Matches, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { applyDecorators } from "../utils/apply-decorators";

/**
 * 한글로만 구성된 값인지 검증하는 데코레이터입니다.
 *
 * @param messageCode 유효성 검사 실패 시 보여질 메시지 (기본값: 'INVALID_KOREAN_INPUT')
 * @returns {PropertyDecorator} 유효성 검사 데코레이터
 * @example
 * class UserDto {
 *   @IsKorean()
 *   name: string;
 * }
 */
export function IsKorean(
  messageCode: string = "INVALID_KOREAN_INPUT"
): PropertyDecorator {
  return applyDecorators(
    Transform(({ value }) =>
      typeof value === "string" ? value.trim() : value
    ),
    Matches(/^[가-힣\s\-]+$/, { message: messageCode }),
    IsString()
  );
}
