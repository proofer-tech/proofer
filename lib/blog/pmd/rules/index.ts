import type { Rule } from "../types";
import { pmd000 } from "./pmd000";
import { pmd001 } from "./pmd001";
import { pmd002 } from "./pmd002";
import { pmd003 } from "./pmd003";
import { pmd004 } from "./pmd004";
import { pmd005 } from "./pmd005";
import { pmd006 } from "./pmd006";
import { pmd007 } from "./pmd007";
import { pmd008 } from "./pmd008";
import { pmd009 } from "./pmd009";
import { pmd010 } from "./pmd010";
import { pmd011 } from "./pmd011";
import { pmd012 } from "./pmd012";
import { pmd013 } from "./pmd013";
import { pmd014 } from "./pmd014";
import { pmd016 } from "./pmd016";
import { pmd017 } from "./pmd017";
import { pmd018 } from "./pmd018";
import { pmd019 } from "./pmd019";

// 규칙은 파일 하나에 하나씩 만들고 여기에 한 줄로 등록한다.
// PMD000 은 전용 id 가 없는 금지 블록(각주, 체크리스트, 취소선)용이다.
// PMD015(noslop)는 1단계에서 구현하지 않는다. id 만 예약한다.
export const RULES: Rule[] = [
  pmd000,
  pmd001,
  pmd002,
  pmd003,
  pmd004,
  pmd005,
  pmd006,
  pmd007,
  pmd008,
  pmd009,
  pmd010,
  pmd011,
  pmd012,
  pmd013,
  pmd014,
  pmd016,
  pmd017,
  pmd018,
  pmd019,
];
