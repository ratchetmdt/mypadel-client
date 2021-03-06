import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Court} from '../Court';
import {CourtService} from '../court.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-court-search',
  templateUrl: './court-search.component.html',
  styleUrls: ['./court-search.component.css']
})
export class CourtSearchComponent implements OnInit {
  @Input()
  courts: Court[];
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();
  public errorMessage: string;
  private checked = false;


  constructor(private courtService: CourtService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  performSearch(): void {
    this.checked = !this.checked;
    if (!this.checked) {
      this.courtService.getAllCourts().subscribe(
        courts => {
          this.onSearchited.emit(courts);
        },
        error => this.errorMessage = <any>error.message
      );
    } else {
      this.courtService.getCourtByAvailable().subscribe(
        courts => {
          this.onSearchited.emit(courts);
        },
        error => this.errorMessage = <any>error.message
      );
    }
  }
}
