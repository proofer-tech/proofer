import {
  getTableColumns,
  getTableName,
  InferSelectModel,
  sql,
} from "drizzle-orm";
import {
  getTableConfig,
  pgEnum,
  PgJoin,
  PgTable,
  PgUpdateSetSource,
} from "drizzle-orm/pg-core";
import { merge } from "lodash";

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

export function mapJoinData(
  targetSchema: PgTable,
  relationSchemas: PgTable[],
  rows: { [key: string]: any }[],
) {
  const targetTableName = getTableName(targetSchema);
  const schemaTypeOrigin = Object.fromEntries(
    relationSchemas.map((schema) => [
      `${getTableName(schema)}_set`,
      [] as InferSelectModel<typeof schema>[],
    ]),
  );

  const aggregated = rows.reduce<
    Record<
      number,
      InferSelectModel<typeof targetSchema> & typeof schemaTypeOrigin
    >
  >((acc, row) => {
    const target = row[targetTableName];
    for (const relationSchema of relationSchemas) {
      const relationTableName = getTableName(relationSchema);
      if (!acc[target.id]) {
        acc[target.id] = { ...target, [`${relationTableName}_set`]: [] };
      }
      if (row[relationTableName]) {
        acc[target.id][`${relationTableName}_set`].push(row[relationTableName]);
      }
    }
    return acc;
  }, {});
  return Object.values(aggregated);
}
