import { validate } from "class-validator";
import { IsEnglish } from "../../validators/is-english.validator";
import { IsString } from "class-validator";

describe("English Validator", () => {
  describe("IsEnglish Decorator", () => {
    class TestDto {
      @IsString()
      @IsEnglish({
        message: "영어만 입력 가능합니다.",
      })
      value!: string;
    }

    it("should validate English text", async () => {
      const dto = new TestDto();
      dto.value = "John Doe";
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it("should not validate non-English text", async () => {
      const dto = new TestDto();
      dto.value = "홍길동";
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toEqual({
        isEnglish: "영어만 입력 가능합니다.",
      });
    });

    it("should allow spaces and hyphens", async () => {
      const dto = new TestDto();
      dto.value = "John-Doe Smith";
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it("should trim whitespace", async () => {
      const dto = new TestDto();
      dto.value = "  John Doe  ";
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it("should allow null or undefined", async () => {
      const dto = new TestDto();
      dto.value = "";
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });
});
