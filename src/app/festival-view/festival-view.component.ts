import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FestivalService } from '../festival.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';
import { MusicFestival, Band, RecordLabel, Festival } from './festival-view.model';
@Component({
  selector: 'app-festival-view',
  templateUrl: './festival-view.component.html',
  styleUrls: ['./festival-view.component.scss'],
})
export class FestivalViewComponent implements OnInit, OnDestroy {
  constructor(private festivalService: FestivalService) {}
  subscription$ = new Subject<void>();
  readonly loading$ = new BehaviorSubject<boolean>(false);
  transformedData: RecordLabel[];
  errorMessage: string;
  uniqueLabels: string[];
  ngOnInit() {
    this.getFestivalData();
  }

  getFestivalData() {
    this.loading$.next(true);
    this.festivalService
      .getFestivalData()
      .pipe(
        takeUntil(this.subscription$),
        finalize(() => {
          this.loading$.next(false);
          this.loading$.complete();
        })
      )
      .subscribe({
        next: (res) => {
          this.transformedData = this.transformData(res);
        },
        error: (error) => {
          this.errorMessage = `An error has occured, please contact your admin: ${error.statusText ?? error.message}`;
        },
      });
  }

  transformData(dto: MusicFestival[]): RecordLabel[] {
    const newData: RecordLabel[] = [];
    const sortedLabels = this.getUniqueRecordLabels(dto);
    if (sortedLabels?.length > 0) {
      sortedLabels.forEach((sl) => {
        newData.push({
          recordLabel: {
            name: sl,
            bandDetails: this.getBandDetails(dto, sl),
          },
        });
      });
    }
    return newData;
  }

  getBandDetails(data: MusicFestival[], label: string): Festival[] {
    const festivalData: Festival[] = [];
    if (!data?.length) {
      return [];
    } else {
      data.forEach((dt) => {
        dt.bands?.length > 0
          ? dt.bands.forEach((b) => {
              if (b.recordLabel === label) {
                festivalData.push({
                  bands: [b.name],
                  festivals: dt.name,
                });
              }
            })
          : null;
      });
      return festivalData;
    }
  }

  getUniqueRecordLabels(data: MusicFestival[]): string[] {
    const labels = [];
    let sortedLabels;
    if (!data?.length) {
      return [];
    } else {
      data.forEach((dt) => {
        if (dt.bands?.length > 0) {
          const filteredData = dt.bands.filter((b) => !!b.recordLabel);
          filteredData.forEach((f) => {
            labels.push(f.recordLabel);
          });
        }
      });
      sortedLabels = [...new Set(labels.sort())];
      return sortedLabels;
    }
  }

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
