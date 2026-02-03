import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { AppState } from 'src/app/app.state';

interface ScalaItem {
  givun: number;
  id_givun_group: number;
  givunName: string;
  value: number;
  nameMdd: string;
  anaf_Name_Short: string;
}

@Component({
  selector: 'app-num-category',
  templateUrl: './num-category.component.html',
  styleUrls: ['./num-category.component.scss']
})
export class numCategoryComponent implements OnInit {

  @HostBinding('class.container') container = true;

  @Input('headerTxt') headerTxt!: string;
  @Input('Scala') scalaData!: ScalaItem[];

  constructor(
    private readonly rootService: RootService,
    private readonly appStore: AppState
  ) {}

  ngOnInit(): void {}

  stateData(index: number): ScalaItem[] {
    return this.scalaData
      ?.filter(item => item.givun === index)
      .sort((a, b) => b.id_givun_group - a.id_givun_group) || [];
  }

  colorCatgory(catgory: number): string {
    return this.rootService.getColorChart(catgory);
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

    let nameKotar = ' לפי קבוצת גיוון';
    const firstItem = this.scalaData[0];

    const tableToExport: Record<string, any>[] = [
      {
        godel: 'קבוצת גיוון',
        mdd: firstItem.nameMdd
      }
    ];

    nameKotar = firstItem.nameMdd + nameKotar;

    this.scalaData.forEach(item => {
      tableToExport.push({
        godel: item.givunName,
        mdd: Number(item.value).toFixed(0)
      });
    });

    let titleCsv = `${nameKotar},${firstItem.anaf_Name_Short}`;

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
