import { validate } from "class-validator";
import { IsKorean } from "../../validators/is-korean.validator";
import { IsString } from "class-validator";

describe("Korean Validator", () => {
  describe("IsKorean Decorator", () => {
    class TestDto {
      @IsString()
      @IsKorean({
        message: "한글만 입력 가능합니다.",
      })
      value!: string;
    }

    it("should validate Korean text", async () => {
      const dto = new TestDto();
      dto.value = "홍길동";
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it("should not validate non-Korean text", async () => {
      const dto = new TestDto();
      dto.value = "John Doe";
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toEqual({
        isKorean: "한글만 입력 가능합니다.",
      });
    });

    it("should allow spaces and hyphens", async () => {
      const dto = new TestDto();
      dto.value = "홍 길동-김";
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it("should trim whitespace", async () => {
      const dto = new TestDto();
      dto.value = "  홍길동  ";
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
