import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { FestivalService } from "../festival.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MusicFestival, Band, RecordLabel, Festival } from "./festival-view.model";
@Component({
  selector: "app-festival-view",
  templateUrl: "./festival-view.component.html",
  styleUrls: ["./festival-view.component.scss"]
})
export class FestivalViewComponent implements OnInit, OnDestroy {
  constructor(private festivalService: FestivalService) {}
  private subscription = new Subject<void>();
  isFetching: boolean;
  transformedData: RecordLabel[];
  errorMessage: string;
  uniqueLabels: string[];
  ngOnInit() {
    this.getFestivalData();
  }

  private getFestivalData() {
    this.isFetching = true;
    this.festivalService
      .getFestivalData()
      .pipe(takeUntil(this.subscription))
      .subscribe({
        next: (res) => {
          this.isFetching = false;
          this.transformedData = this.transformData(res);
        },
        error: (error) => {
          this.isFetching = false;
          this.errorMessage = `An error has occured, please contact your admin: ${error.statusText ?? error.message}`;
          console.log(error);
        },
        complete: () => console.log("request completed")
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
            bandDetails: this.getBandDetails(dto, sl)
          }
        });
      });
    }
    return newData;
  }

  getBandDetails(data: MusicFestival[], label: string): Festival[] {
    const bands: Festival[] = [];
    if (data?.length > 0) {
      data.forEach((dt) => {
        dt.bands.forEach((b) => {
          if (b.recordLabel === label && dt.name) {
            bands.push({
              name: b.name,
              festivals: [...dt.name]
            });
          }
        });
      });
    }
    return bands;
  }

  getUniqueRecordLabels(data: MusicFestival[]) {
    const labels = [];
    let sortedLabels;
    if (data?.length > 0) {
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
    this.subscription.next();
    this.subscription.complete();
  }
}
