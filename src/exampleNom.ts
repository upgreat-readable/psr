import { MetricService } from './MetricService';
import * as fs from 'fs';
import * as buffer from 'buffer';
import { NominationsService } from './nominations/nominationsService';

// const failExampleWithOutThird = fs.readFileSync('examples/totalDiff.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/diffTypesCloseSelections.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/eng-1.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/his-1.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/his-2.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/eng-2.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/eng-3.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/rus-1.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/eng-4.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/his-3.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/rus-f-1.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/soc-f-1.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/lit-f-1.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/eng-f-1.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/eng-f-2.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/eng-f-3.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/eng-m-1.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/rus-m-1.json');
// const diffTypesCloseSelections = fs.readFileSync('examples/rus-m-2.json');

// const diffTypesCloseSelections = fs.readFileSync('examplesAntiplagiat/eng733-1.json');

// const diffTypesCloseSelections = fs.readFileSync('examplesAntiplagiat/eng733-2.json');
// const diffTypesCloseSelections = fs.readFileSync('examplesAntiplagiat/eng733-3.json');
// const diffTypesCloseSelections = fs.readFileSync('examplesAntiplagiat/rus733-1.json');
// const diffTypesCloseSelections = fs.readFileSync('examplesAntiplagiat/rus733-1.json');

// const diffTypesCloseSelections = fs.readFileSync('presentation/eng-658-0000809.json');

const diffTypesCloseSelections = fs.readFileSync('presentation/eng-731-0052671.json');
// const diffTypesCloseSelections = fs.readFileSync('presentation/rus-658-0003400.json');
// const diffTypesCloseSelections = fs.readFileSync('presentation/lit-658-0005654.json');
// const diffTypesCloseSelections = fs.readFileSync('presentation/lit-658-0005714.json');
// const diffTypesCloseSelections = fs.readFileSync('presentation/rus-658-0003434.json');
// const diffTypesCloseSelections = fs.readFileSync('presentation/soc-658-0004743.json');
// const diffTypesCloseSelections = fs.readFileSync('presentation/rus-658-0003267.json');

const fromFile = JSON.parse(diffTypesCloseSelections.toString());
let p = new NominationsService().calculate(fromFile);
console.log(JSON.stringify(p, null, 2));

// export class ChangeBalanceDto {
//     // //@ts-ignore
//     // public token: string;
//     // //@ts-ignore
//     // public amount: number;
//     // //@ts-ignore
//     // public justificationEntityId: string;
//
//     constructor(public token: string, public amount: number, public justificationEntityId: string) {
//
//     }
// }
//
// const x = new ChangeBalanceDto('qwe', 123, 'qwe')
// // @ts-ignore
// console.log({operation: 'ewq', project: 'rgdf', ...x});
