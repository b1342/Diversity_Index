import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { AppState, FilterData } from 'src/app/app.state';

@Component({
  selector: 'app-big-bar-by-filter',
  templateUrl: './big-bar-by-filter.component.html',
  styleUrls: ['./big-bar-by-filter.component.scss']
})
export class bigBarByFilterComponent implements OnInit {

  height: number;
  @HostBinding('class.container') container = true;

  @Input('Scala') scalaData: any;
  @Input('catgory') catgory: number;

  constructor(
    private rootService: RootService,
    private appStore: AppState
  ) {}

  ngOnInit() {
    this.height = (window.innerHeight - 300) / 5;
  }

  colorCatgory(index: number): string {
    if (this.catgory === -1) {
      return this.appStore.selectgodel.value === index ||
             this.appStore.selectgodel.value === 0
        ? '#1A6F96'
        : '#D1DDE2';
    } else {
      return this.appStore.selectgodel.value === index ||
             this.appStore.selectgodel.value === 0
        ? '#8F4091'
        : '#D1DDE2';
    }
  }

  get maxScala(): number {
    return Math.max.apply(
      this,
      this.scalaData
        .filter(x => x.godel_id > 0)
        .map(a => a.count_emp)
    );
  }

  get godelData(): Array<FilterData> {
    return this.appStore.godelFilterData.filter(x => x.value > 0);
  }

  getGodelName(index: number): Array<FilterData> {
    return this.appStore.godelFilterData.filter(x => x.value === index);
  }

  stateData(index: number): any {
    return this.scalaData
      .filter(x => x.godel_id === index)
      .sort((a, b) =>
        a.godel_id > b.godel_id ? -1 :
        a.godel_id < b.godel_id ? 1 : 0
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

    let csvContent = '\uFEFF'; // BOM – עברית תקינה באקסל

    if (title) {
      csvContent += `"${title}"\n`;
    }

    csvContent += keys.join(separator) + '\n';

    csvContent += rows
      .map(row =>
        keys.map(key => {
          let cell =
            row[key] === null || row[key] === undefined ? '' : row[key];
          cell = cell.toString().replace(/"/g, '""');
          return `"${cell}"`;
        }).join(separator)
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

  exportAsCSV() {
    const nameKotar = 'מספר מועסקים לפי גודל עסק';
    let tableToExport: any[] = [];

    tableToExport.push({
      godel: 'גודל עסק',
      mdd: 'מספר מועסקים'
    });

    for (let i = 0; i < this.scalaData.length; i++) {
      const godelNameArr = this.appStore.godelFilterData
        .filter(x => x.value === this.scalaData[i].godel_id);

      tableToExport.push({
        godel: godelNameArr.length ? godelNameArr[0].name : '',
        mdd: Number(this.scalaData[i].count_emp)
      });
    }

    let titleCsv = nameKotar;

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
