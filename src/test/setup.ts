import "reflect-metadata";
import { Transform as TransformFn } from "class-transformer";
import { validate as validateFn } from "class-validator";

// global 타입 선언
declare global {
  var validate: typeof validateFn;
  var Transform: typeof TransformFn;
}

// 테스트 환경에서 필요한 전역 설정
global.validate = validateFn;
global.Transform = TransformFn;
