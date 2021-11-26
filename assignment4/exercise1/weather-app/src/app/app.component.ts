import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval,  repeatWhen,  Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { WarningService } from './WarningService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public timeInterval: Subscription = new Subscription;
  public latestWarnings: Object[] = [];
  public previousWarnings: Object[]= [];
  public updatedWarnings: Object[] = [];
  public severity: number = 0;
  private stopStream = new Subject();
  private startStream = new Subject();

  public constructor(private warningService: WarningService){}

  public ngOnInit() {
    this.timeInterval = interval(1000)
    .pipe(
      switchMap(async () => 
      this.warningService.fetchWarnings()
      ),
      takeUntil(this.stopStream),
      repeatWhen(() => this.startStream)
    ).subscribe(response => {
      response.subscribe(r => {
        this.previousWarnings = this.latestWarnings;
         if(this.severity != 0) {
          this.latestWarnings = r.warnings.filter((w: { severity: any; }) => w.severity >= this.severity);
        }
        else {
          this.latestWarnings = r.warnings;

          const difference = this.difference(this.previousWarnings, this.latestWarnings);

          if(difference.length !== 0) {
            this.updatedWarnings = difference;
          }
        }
      })
    })
  }

  public difference(array1: Object[], array2: Object[]) {
    var difference = []
    for(var obj in array1) {
      if(this.toJSON(array1[obj]) !== this.toJSON(array2[obj])) {
        difference.push(array2[obj]);
      }
    }
    return difference;
  }

  public onSeverityReset() {
    this.severity = 0;
  }

  public onStartRunning() {
    this.startStream.next(true);
  }

  public onStopRunning() {
    this.stopStream.next(true);
  }

  public toJSON(warning: any) {
    return JSON.stringify(warning);
  }

  public ngOnDestroy() {
    this.timeInterval.unsubscribe();
    this.startStream.unsubscribe();
    this.stopStream.unsubscribe();
  }
}
