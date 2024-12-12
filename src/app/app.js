define(["require", "exports", "@syncfusion/ej2-spreadsheet", "./conditional-formatting-data"], function (require, exports, ej2_spreadsheet_1, conditional_formatting_data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var spreadsheet = new ej2_spreadsheet_1.Spreadsheet({
        sheets: [{
            rows: [{
                height: 31,
                cells: [{
                    index: 1,
                    value: 'Inventory List',
                }]
            }],
            ranges: [{
                dataSource: conditional_formatting_data_1.conditionalFormatData(),
                startCell: 'A2'
            },
            ],
            name: 'Inventory List',
            conditionalFormats: [
                { type: 'GYRColorScale', range: 'C3:C18' },
                { type: 'LessThan', cFColor: 'RedFT', value: '8/30/2019', range: 'G3:G18' }
            ],
            columns: [{
                width: 100
            },
            {
                width: 158
            },
            {
                width: 72
            },
            {
                width: 113
            },
            {
                width: 113
            },
            {
                width: 77
            },
            {
                width: 97
            },
            {
                width: 73
            }]
        }],
        openUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/open',
        saveUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/save',
        created: function () {
            spreadsheet.merge('A1:H1');
            spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A2:H2');
            spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', fontSize: '13pt' }, 'A1:H1');
            spreadsheet.numberFormat('$#,##0.00', 'F3:F18');
            spreadsheet.conditionalFormat({ type: 'BlueDataBar', range: 'D3:D18' });
            spreadsheet.conditionalFormat({ type: 'GreenDataBar', range: 'E3:E18' });
            spreadsheet.conditionalFormat({ type: 'ThreeStars', range: 'H3:H18' });
            spreadsheet.conditionalFormat({
                type: 'Top10Items', value: '1',
                format: { style: { color: '#ffffff', backgroundColor: '#009999', fontWeight: 'bold' } }, range: 'F3:F18'
            });
            spreadsheet.conditionalFormat({
                type: 'Bottom10Items', value: '1',
                format: { style: { color: '#ffffff', backgroundColor: '#c68d53', fontWeight: 'bold' } }, range: 'F3:F18'
            });
        }
    });
    spreadsheet.appendTo('#element');
});
