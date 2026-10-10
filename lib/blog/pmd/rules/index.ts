import type { Rule } from "../types";
import { pmd010 } from "./pmd010";
import { pmd011 } from "./pmd011";
import { pmd013 } from "./pmd013";
import { pmd017 } from "./pmd017";
import { pmd018 } from "./pmd018";

// 규칙은 파일 하나에 하나씩 만들고 여기에 한 줄로 등록한다.
// PMD015(noslop)는 1단계에서 구현하지 않는다. id 만 예약한다.
export const RULES: Rule[] = [pmd010, pmd011, pmd013, pmd017, pmd018];
