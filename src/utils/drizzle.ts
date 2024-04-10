import {
  getTableColumns,
  getTableName,
  InferSelectModel,
  sql,
} from "drizzle-orm";
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

export function mapJoinData(
  targetSchema: PgTable,
  relations: {
    one?: PgTable[];
    many?: PgTable[];
  },
  rows: { [key: string]: any }[],
) {
  const targetTableName = getTableName(targetSchema);
  const schemaTypeOrigin = Object.fromEntries(
    new Map(
      (
        relations.one?.map((schema) => [
          getTableName(schema),
          [] as InferSelectModel<typeof schema>[],
        ]) || []
      ).concat(
        relations.many?.map((schema) => [
          `${getTableName(schema)}_set`,
          [] as InferSelectModel<typeof schema>[],
        ]) || [],
      ) as [string, any][],
    ),
  );

  const aggregated = rows.reduce<
    Record<
      number,
      InferSelectModel<typeof targetSchema> & typeof schemaTypeOrigin
    >
  >((acc, row) => {
    const target = row[targetTableName];
    if (!acc[target.id]) {
      acc[target.id] = { ...target };
    }

    for (const relationSchema of relations?.one || []) {
      const relationTableName = getTableName(relationSchema);
      if (row[relationTableName]) {
        acc[target.id][relationTableName] = row[relationTableName];
      }
    }

    for (const relationSchema of relations?.many || []) {
      const relationTableName = getTableName(relationSchema);
      if (row[relationTableName]) {
        if (!acc[target.id][`${relationTableName}_set`]) {
          acc[target.id][`${relationTableName}_set`] = [];
        }
        acc[target.id][`${relationTableName}_set`].push(row[relationTableName]);
      }
    }
    return acc;
  }, {});
  return Object.values(aggregated);
}
