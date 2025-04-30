import { IsKorean } from "../../decorators/is-korean.decorator";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

class TestDto {
  @IsKorean()
  name: string;
}

describe("IsKorean Decorator", () => {
  it("should validate Korean text", async () => {
    const dto = plainToClass(TestDto, { name: "홍길동" });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should not validate non-Korean text", async () => {
    const dto = plainToClass(TestDto, { name: "John Doe" });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty("matches");
  });

  it("should not validate mixed text", async () => {
    const dto = plainToClass(TestDto, { name: "홍길동 John" });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it("should validate Korean text with spaces and hyphens", async () => {
    const dto = plainToClass(TestDto, { name: "홍 길-동" });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should trim whitespace", async () => {
    const dto = plainToClass(TestDto, { name: "  홍길동  " });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
    expect(dto.name).toBe("홍길동");
  });
});
