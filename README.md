# zyno-validator

한글과 영어 입력을 위한 검증 라이브러리입니다. Node.js, Next.js, NestJS 등 다양한 환경에서 사용할 수 있습니다.

## 설치

```bash
npm install zyno-validator
# 또는
yarn add zyno-validator
```

## 사용법

### 한글 검증

```typescript
import { isKorean, isKoreanAsync } from "zyno-validator";

// 비동기 검증
const isValid = await isKoreanAsync("홍길동"); // true
const isValid = await isKoreanAsync("John Doe"); // false

// 동기 검증
const isValid = isKorean("홍길동"); // true
const isValid = isKorean("John Doe"); // false
```

### 영어 검증

```typescript
import { isEnglish, isEnglishAsync } from "zyno-validator";

// 비동기 검증
const isValid = await isEnglishAsync("John Doe"); // true
const isValid = await isEnglishAsync("홍길동"); // false

// 동기 검증
const isValid = isEnglish("John Doe"); // true
const isValid = isEnglish("홍길동"); // false
```

### NestJS에서 사용하기

```typescript
import { isKoreanAsync } from "zyno-validator";

@Injectable()
export class UserService {
  async validateName(name: string) {
    return await isKoreanAsync(name);
  }
}
```

### Next.js에서 사용하기

```typescript
import { isKoreanAsync } from "zyno-validator";

export default function FormComponent() {
  const validateInput = async (value: string) => {
    return await isKoreanAsync(value);
  };
}
```

## 지원하는 문자

### 한글 검증

- 한글 (가-힣)
- 공백
- 하이픈 (-)

### 영어 검증

- 영문자 (a-z, A-Z)
- 공백
- 하이픈 (-)

## 라이센스

MIT
