import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const path = process.argv[2];
const blob = await FileBlob.load(path);
const workbook = await SpreadsheetFile.importXlsx(blob);
const overview = await workbook.inspect({
  kind: "sheet",
  include: "id,name",
  maxChars: 12000,
});
console.log(overview.ndjson);
for (const sheet of workbook.worksheets.items) {
  const used = sheet.getUsedRange(true);
  if (!used) continue;
  const result = await workbook.inspect({
    kind: "table",
    sheetId: sheet.name,
    range: used.address,
    include: "values,formulas",
    tableMaxRows: 250,
    tableMaxCols: 20,
    tableMaxCellChars: 500,
    maxChars: 250000,
  });
  console.log(result.ndjson);
}
