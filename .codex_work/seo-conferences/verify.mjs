import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const path = "/Users/prcrecluse/Desktop/shadcn-nextjs-flow-landing-page-2.0.0/outputs/01a05dc4-630e-73e2-82e0-204cc9ef41f5/global_seo_conference_outreach.xlsx";
const input = await FileBlob.load(path);
const workbook = await SpreadsheetFile.importXlsx(input);

const overview = await workbook.inspect({
  kind: "sheet,table",
  maxChars: 4000,
  tableMaxRows: 3,
  tableMaxCols: 5,
});
console.log(overview.ndjson ?? overview);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  maxChars: 4000,
});
console.log(errors.ndjson ?? errors);

const dashboard = await workbook.inspect({
  kind: "region",
  sheetId: "Dashboard",
  range: "A6:P19",
  maxChars: 5000,
});
console.log(dashboard.ndjson ?? dashboard);
