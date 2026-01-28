import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { AppState, FilterData } from 'src/app/app.state';

@Component({
  selector: 'app-bar-by-category',
  templateUrl: './bar-by-category.component.html',
  styleUrls: ['./bar-by-category.component.scss']
})
export class barByCategoryComponent implements OnInit {

  height: number;
  @HostBinding('class.container') container = true;

  dataCountEmp: any;

  @Input('AnafSivug') anafSivug: string;
  @Input('Scala') scalaData: any;
  @Input('NumToFixed') numToFixed: number;

  constructor(
    private rootService: RootService,
    private appStore: AppState
  ) {}

  ngOnInit() {
    this.height = (window.innerHeight - 300) / 5;
  }

  colorCatgory(catgory: number): string {
    return this.rootService.getColorChart(catgory);
  }

  get givunGroupData(): Array<FilterData> {
    return this.appStore.givunGroupFilterData;
  }

  get maxScala(): number {
    return Math.max.apply(this, this.scalaData.map(a => a.value));
  }

  stateData(index: number): any {
    return this.scalaData
      .filter(x => x.givun === index)
      .sort((a, b) =>
        a.id_givun_group > b.id_givun_group ? -1 :
        a.id_givun_group < b.id_givun_group ? 1 : 0
      );
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

    let csvContent = '\uFEFF'; // BOM for Hebrew / Excel

    if (title) {
      csvContent += `"${title}"\n`;
    }

    csvContent += keys.join(separator) + '\n';

    csvContent += rows
      .map(row =>
        keys.map(key => {
          let cell = row[key] === null || row[key] === undefined ? '' : row[key];
          cell = cell.toString().replace(/"/g, '""');
          return `"${cell}"`;
        }).join(separator)
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.click();
  }

  exportAsCSV() {
    let nameKotar = ' לפי קבוצת גיוון';
    let tableToExport: any[] = [];

    if (this.scalaData) {
      tableToExport.push({
        godel: 'קבוצת גיוון',
        mdd: this.scalaData[0].nameMdd,
      });
      nameKotar = this.scalaData[0].nameMdd + nameKotar;
    }

    for (let i = 0; i < this.scalaData.length; i++) {
      tableToExport.push({
        godel: this.scalaData[i].givunName,
        mdd: Number(this.scalaData[i].value).toFixed(this.numToFixed)
      });
    }

    let titleCsv = nameKotar;
    if (this.scalaData) {
      titleCsv += ',' + this.scalaData[0].anaf_Name_Short;
    }

    this.appStore.tags.forEach(element => {
      switch (element.type) {
        case 'gil':
          titleCsv += ',גיל:';
          break;
        default:
          titleCsv += ',';
          break;
      }
      titleCsv += element.value.name;
    });

    this.downloadCsv(nameKotar, tableToExport, titleCsv);
  }
}
