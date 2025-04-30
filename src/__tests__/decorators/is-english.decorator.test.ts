import { IsEnglish } from "../../decorators/is-english.decorator";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

class TestDto {
  @IsEnglish()
  name: string;
}

describe("IsEnglish Decorator", () => {
  it("should validate English text", async () => {
    const dto = plainToClass(TestDto, { name: "John Doe" });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should not validate non-English text", async () => {
    const dto = plainToClass(TestDto, { name: "홍길동" });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty("matches");
  });

  it("should not validate mixed text", async () => {
    const dto = plainToClass(TestDto, { name: "John 홍길동" });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it("should validate English text with spaces and hyphens", async () => {
    const dto = plainToClass(TestDto, { name: "John-Doe Smith" });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should trim whitespace", async () => {
    const dto = plainToClass(TestDto, { name: "  John Doe  " });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
    expect(dto.name).toBe("John Doe");
  });
});
