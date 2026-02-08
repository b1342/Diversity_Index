import { Component, OnInit, NgZone } from '@angular/core';
import { AppState } from '../../app.state';
import * as echarts from 'echarts';
import { RootService } from '../../root.service';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/globalComponent/dialog/dialog.component';

@Component({
    selector: 'app-page1',
    templateUrl: './page1.component.html',
    styleUrls: ['./page1.component.css'],
    standalone: false
})
export class Page1Component implements OnInit {

  height: number;
  heightChart: number;
  fontResulation: number;

  constructor(
    private appStore: AppState,
    public dialog: MatDialog,
    private rootService: RootService,
    private ngZone: NgZone
  ) {
    this.fontResulation =
      window.innerWidth < 600 ? 0 : (window.innerWidth - 1000) / 100;
    this.appStore.tags = [];
  }

  ngOnInit() {
    this.height = window.innerHeight - 200;
  }

  onChartClick(selected) {
    this.ngZone.runGuarded(() => {
      console.log(Number(selected['dataIndex']));
    });
  }

  get filterSTR(): string {
    return this.appStore.selectmdd.name;
  }

  get tags(): any {
    return this.appStore.tags;
  }

  tag_click(tag: string) {
    const index = this.tags.indexOf(tag, 0);
    if (index === -1) {
      this.tags.push(tag);
    }
  }

  getAnafName(anafId: number): any {
    return this.appStore.anafGlobalFilterData.filter(
      x => x.value === Number(anafId)
    );
  }

  remove_tag_click(itemTag: any) {
    const index = this.appStore.tags.findIndex(a => a === itemTag);
    if (index > -1) {
      this.appStore.tags.splice(index, 1);
      this.appStore['select' + itemTag.type] =
        this.appStore[itemTag.type + 'FilterData'][0];
      this.rootService.loadDataPage1();
    } else {
      this.appStore.tags = [];
    }
    this.rootService.changeSelect();
  }

  get stateMegama(): any {
    return this.appStore.grafData;
  }
  get stateMegama2(): any {
    return this.appStore.grafData2;
  }
  get stateMegama3(): any {
    return this.appStore.grafData3;
  }
  get stateMegama4(): any {
    return this.appStore.grafData4;
  }
  get stateMegama5(): any {
    return this.appStore.grafData5;
  }
  get stateMegama6(): any {
    return this.appStore.grafData6;
  }

  /* =========================
     CSV EXPORT – NEW VERSION
     ========================= */

  private downloadCsv(filename: string, rows: any[], title?: string) {
    if (!rows || !rows.length) {
      return;
    }

    const separator = ',';
    const keys = Object.keys(rows[0]);

    let csvContent = '\uFEFF'; // BOM – עברית תקינה באקסל

    if (title) {
      csvContent += `"${title}"\n`;
    }

    csvContent += keys.join(separator) + '\n';

    csvContent += rows
      .map(row =>
        keys
          .map(key => {
            let cell =
              row[key] === null || row[key] === undefined ? '' : row[key];
            cell = cell.toString().replace(/"/g, '""');
            return `"${cell}"`;
          })
          .join(separator)
      )
      .join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.click();
  }

  exportAsCSV(allDataToExport: any[], nameKotar: string) {
    let tableToExport: any[] = [];

    tableToExport.push({
      year: 'שנה',
      anaf_Name_Short: 'ענף',
      mdd:
        this.appStore.selectmdd != null
          ? this.appStore.selectmdd.name
          : ''
    });

    for (let i = 0; i < allDataToExport.length; i++) {
      tableToExport.push({
        year: allDataToExport[i]['year'],
        anaf_Name_Short: allDataToExport[i]['anaf_Name_Short'],
        mdd:
          allDataToExport[i][this.appStore.selectmdd.value] > -1
            ? Number(
                allDataToExport[i][this.appStore.selectmdd.value]
              ).toFixed(2)
            : ''
      });
    }

    let titleCsv = nameKotar;
    const nameMigdar6 = this.getAnafName(7)[0].name;

    this.appStore.tags.forEach(element => {
      // אם מייצאים מגזר ציבורי – פילטר גודל עסק לא משפיע
      if (
        nameKotar !== nameMigdar6 ||
        (nameKotar === nameMigdar6 && element.type !== 'godel')
      ) {
        switch (element.type) {
          case 'gil':
            titleCsv += ',גיל:';
            break;
          case 'godel':
            titleCsv += ',גודל עסק:';
            break;
          default:
            titleCsv += ',';
            break;
        }
        titleCsv += element.value.name;
      }
    });

    this.downloadCsv(nameKotar, tableToExport, titleCsv);
  }

  openAgdarotMadd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {});
  }
}
