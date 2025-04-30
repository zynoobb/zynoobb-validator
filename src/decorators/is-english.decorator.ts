import { Matches, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { applyDecorators } from "../utils/apply-decorators";

/**
 * 영어로만 구성된 값인지 검증하는 데코레이터입니다.
 *
 * @param messageCode 유효성 검사 실패 시 보여질 메시지 (기본값: 'INVALID_ENGLISH_INPUT')
 * @returns {PropertyDecorator} 유효성 검사 데코레이터
 * @example
 * class UserDto {
 *   @IsEnglish()
 *   nickname: string;
 * }
 */
export function IsEnglish(
  messageCode: string = "INVALID_ENGLISH_INPUT"
): PropertyDecorator {
  return applyDecorators(
    Transform(({ value }) =>
      typeof value === "string" ? value.trim() : value
    ),
    Matches(/^[a-zA-Z\s\-]+$/, { message: messageCode }),
    IsString()
  );
}
