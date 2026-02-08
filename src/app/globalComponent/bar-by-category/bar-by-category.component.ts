import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { AppState, FilterData } from 'src/app/app.state';

interface ScalaItem {
  value: number;
  givun: number;
  id_givun_group: number;
  givunName: string;
  nameMdd: string;
  anaf_Name_Short: string;
}

@Component({
    selector: 'app-bar-by-category',
    templateUrl: './bar-by-category.component.html',
    styleUrls: ['./bar-by-category.component.scss'],
    standalone: false
})
export class BarByCategoryComponent implements OnInit {

  @HostBinding('class.container') container = true;

  @Input('AnafSivug') anafSivug!: string;
  @Input('Scala') scalaData!: ScalaItem[];
  @Input('NumToFixed') numToFixed!: number;

  height!: number;

  constructor(
    private readonly rootService: RootService,
    private readonly appStore: AppState
  ) {}

  ngOnInit(): void {
    this.height = (window.innerHeight - 300) / 5;
  }

  colorCatgory(catgory: number): string {
    return this.rootService.getColorChart(catgory);
  }

  get givunGroupData(): FilterData[] {
    return this.appStore.givunGroupFilterData;
  }

  get maxScala(): number {
    if (!this.scalaData?.length) {
      return 0;
    }

    return this.scalaData.reduce(
      (max, item) => Math.max(max, Number(item.value)),
      0
    );
  }

  stateData(index: number): ScalaItem[] {
    return this.scalaData
      ?.filter(item => item.givun === index)
      .sort((a, b) => b.id_givun_group - a.id_givun_group) || [];
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

    const baseTitle = ' לפי קבוצת גיוון';
    const firstItem = this.scalaData[0];

    const tableToExport: Record<string, any>[] = [
      {
        godel: 'קבוצת גיוון',
        mdd: firstItem.nameMdd
      }
    ];

    this.scalaData.forEach(item => {
      tableToExport.push({
        godel: item.givunName,
        mdd: Number(item.value).toFixed(this.numToFixed)
      });
    });

    let titleCsv = `${firstItem.nameMdd}${baseTitle},${firstItem.anaf_Name_Short}`;

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

    this.downloadCsv(
      `${firstItem.nameMdd}${baseTitle}`,
      tableToExport,
      titleCsv
    );
  }
}
