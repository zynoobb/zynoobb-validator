/**
 * 여러 데코레이터를 한 번에 적용할 수 있도록 해주는 유틸 함수입니다.
 * NestJS의 applyDecorators와 동일한 역할을 합니다.
 */
export function applyDecorators(
  ...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>
): ClassDecorator & MethodDecorator & PropertyDecorator {
  return (
    target: object,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor
  ) => {
    for (const decorator of decorators) {
      if (propertyKey !== undefined && descriptor !== undefined) {
        (decorator as MethodDecorator)(target, propertyKey, descriptor);
      } else if (propertyKey !== undefined) {
        (decorator as PropertyDecorator)(target, propertyKey);
      } else {
        (decorator as ClassDecorator)(target as Function);
      }
    }
  };
}
