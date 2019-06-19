import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Declaration } from './models/db/declaration';
import { CrudService } from 'projects/angular-crud/src/public_api';
import { Attendee } from './models/db/attendee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-crud-app';

  constructor(
    private dataService: DataService,
    private crudService: CrudService
  ) { }

  ngOnInit() {
    this.dataService.getDate().subscribe(data => {
      const a: Attendee = new Attendee(data['data']["declaration"][0]['attendee'], this.crudService);
      const d: Declaration = new Declaration(data['data']["declaration"][0], this.crudService);
      d.attendee = a;
      const o = d.exportData();
      const oWithRel = d.exportData({
        attendee: {

        }
      });

      const dClone = d.clone();
      //d.advance = 1651651615;

      const dDuplicate = d.duplicateAsNew(false);

    });
  }
}
