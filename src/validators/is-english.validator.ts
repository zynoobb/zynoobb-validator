// src/decorator/is-english.validator.ts

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Transform } from "class-transformer";

/**
 * 실제로 영어 검사 로직을 수행하는 Constraint 클래스
 */
@ValidatorConstraint({ name: "isEnglish", async: false })
export class IsEnglishConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    if (value === null || value === undefined || value === "") return true; // 빈 값은 스킵
    return /^[a-zA-Z\s-]+$/.test(value.trim());
  }

  defaultMessage(args: ValidationArguments): string {
    // custom message 가 들어오면 validationOptions.message 를 우선, 아니면 기본 메시지
    return `${args.property} must contain only English letters`;
  }
}

/**
 * 영어로만 구성된 값인지 검증하는 데코레이터
 */
export function IsEnglish(
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (object: Object, propertyName: string | symbol) => {
    // 1) 먼저 Transform 으로 트리밍
    Transform(({ value }) =>
      typeof value === "string" ? value.trim() : value
    )(object, propertyName);
    // 2) registerDecorator 로 class-validator 에 등록
    registerDecorator({
      name: "isEnglish",
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      validator: IsEnglishConstraint,
    });
  };
}
