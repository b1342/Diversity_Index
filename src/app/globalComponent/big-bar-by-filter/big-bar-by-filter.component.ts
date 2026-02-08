import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { AppState, FilterData } from 'src/app/app.state';

interface ScalaItem {
  godel_id: number;
  count_emp: number;
}

@Component({
    selector: 'app-big-bar-by-filter',
    templateUrl: './big-bar-by-filter.component.html',
    styleUrls: ['./big-bar-by-filter.component.scss'],
    standalone: false
})
export class bigBarByFilterComponent implements OnInit {

  @HostBinding('class.container') container = true;

  @Input('Scala') scalaData!: ScalaItem[];
  @Input('catgory') catgory!: number;

  height!: number;

  constructor(
    private readonly rootService: RootService,
    private readonly appStore: AppState
  ) {}

  ngOnInit(): void {
    this.height = (window.innerHeight - 300) / 5;
  }

  colorCatgory(index: number): string {
    const isSelected =
      this.appStore.selectgodel.value === index ||
      this.appStore.selectgodel.value === 0;

    const activeColor = this.catgory === -1 ? '#1A6F96' : '#8F4091';

    return isSelected ? activeColor : '#D1DDE2';
  }

  get maxScala(): number {
    if (!this.scalaData?.length) {
      return 0;
    }

    return this.scalaData
      .filter(item => item.godel_id > 0)
      .reduce((max, item) => Math.max(max, Number(item.count_emp)), 0);
  }

  get godelData(): FilterData[] {
    return this.appStore.godelFilterData.filter(x => x.value > 0);
  }

  getGodelName(index: number): FilterData[] {
    return this.appStore.godelFilterData.filter(x => x.value === index);
  }

  stateData(index: number): ScalaItem[] {
    return this.scalaData
      ?.filter(item => item.godel_id === index)
      .sort((a, b) => b.godel_id - a.godel_id) || [];
  }

  /* =========================
     CSV EXPORT
     ========================= */

  private downloadCsv(
    filename: string,
    rows: Record<string, any>[],
    title?: string
  ): void {

    if (!rows?.length) {
      return;
    }

    const separator = ',';
    const keys = Object.keys(rows[0]);

    let csvContent = '\uFEFF';

    if (title) {
      csvContent += `"${title}"\n`;
    }

    csvContent += keys.join(separator) + '\n';

    csvContent += rows
      .map(row =>
        keys.map(key => {
          const rawCell = row[key];
          const cell =
            rawCell === null || rawCell === undefined
              ? ''
              : rawCell.toString().replace(/"/g, '""');

          return `"${cell}"`;
        }).join(separator)
      )
      .join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  exportAsCSV(): void {
    if (!this.scalaData?.length) {
      return;
    }

    const nameKotar = 'מספר מועסקים לפי גודל עסק';

    const tableToExport: Record<string, any>[] = [
      {
        godel: 'גודל עסק',
        mdd: 'מספר מועסקים'
      }
    ];

    this.scalaData.forEach(item => {
      const godelName = this.appStore.godelFilterData
        .find(x => x.value === item.godel_id);

      tableToExport.push({
        godel: godelName?.name || '',
        mdd: Number(item.count_emp)
      });
    });

    let titleCsv = nameKotar;

    this.appStore.tags.forEach(tag => {
      switch (tag.type) {
        case 'gil':
          titleCsv += ',גיל:';
          break;
        default:
          titleCsv += ',';
      }

      titleCsv += tag.value.name;
    });

    this.downloadCsv(nameKotar, tableToExport, titleCsv);
  }
}
