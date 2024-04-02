import { getTableColumns, sql } from "drizzle-orm";
import {
  getTableConfig,
  pgEnum,
  PgTable,
  PgUpdateSetSource,
} from "drizzle-orm/pg-core";

export function conflictUpdateSetAllColumns<TTable extends PgTable>(
  table: TTable,
): PgUpdateSetSource<TTable> {
  const columns = getTableColumns(table);
  const { name: tableName } = getTableConfig(table);
  return Object.entries(columns)
    .filter(([_, columnInfo]) => !columnInfo.primary && !columnInfo.default)
    .reduce((acc, [columnName, columnInfo]) => {
      // @ts-ignore
      acc[columnName] = sql.raw(
        `COALESCE(excluded.${columnInfo.name}, ${tableName}.${columnInfo.name})`,
      );
      return acc;
    }, {}) as PgUpdateSetSource<TTable>;
}

export function createEnumType(enumName: string, enumType: {}) {
  return pgEnum(enumName, Object.values(enumType) as [string, ...string[]]);
}
