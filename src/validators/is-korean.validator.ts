import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Transform } from "class-transformer";

/**
 * 실제로 한글 검사 로직을 수행하는 Constraint 클래스
 */
@ValidatorConstraint({ name: "isKorean", async: false })
export class IsKoreanConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    if (value === null || value === undefined || value === "") return true; // 빈 값은 스킵
    return /^[가-힣\s-]+$/.test(value.trim());
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must contain only Korean letters`;
  }
}

/**
 * 한글로만 구성된 값인지 검증하는 데코레이터
 */
export function IsKorean(
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (object: Object, propertyName: string | symbol) => {
    // 1) 먼저 Transform 으로 트리밍
    Transform(({ value }) =>
      typeof value === "string" ? value.trim() : value
    )(object, propertyName);
    // 2) registerDecorator 로 class-validator 에 등록
    registerDecorator({
      name: "isKorean",
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      validator: IsKoreanConstraint,
    });
  };
}
