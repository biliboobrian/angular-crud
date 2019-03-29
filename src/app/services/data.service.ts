import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getDate(): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(
        {
          'status': 'ok',
          'code': 200,
          'message': '',
          'data': {
            'declaration': [
              {
                'rn': '1',
                'id': 100129,
                'id_attendee': 1,
                'id_event': 100016,
                'id_payment_status': 1,
                'engagement': null,
                'advance': null,
                'piece': null,
                'reference': null,
                'surplus': null,
                'free_meal': null,
                'day_allowance': 60,
                'night_allowance': 220,
                'first_day': null,
                'last_day': null,
                'entire_day': 10,
                'nuity': 9,
                'created_at': '2019-02-28 11:32:00',
                'updated_at': '2019-02-28 11:32:39',
                'attendee': {
                  'id': 1,
                  'sap_number': 'ihiuhiuhiuh',
                  'national_number': 'iuhiuhiuhiuhiuh',
                  'sap_sifin': 'iuhiuhiuhiuhiuh',
                  'firstname': 'iuhiuhiuh',
                  'lastname': 'iuhiuh',
                  'grade': 'iuhiuhiuhiuhiuh',
                  'affectation': 'iuhiuhiuh',
                  'postal_code': 'ihiuhiuhiuh',
                  'city': 'iuhiuhiuhiuh',
                  'number': '4',
                  'street': 'iuhiuhiuhih',
                  'residence': ' ',
                  'ccpl': 'ihiuhiuhiuhiuhiuhiuh',
                  'created_at': '2019-02-15 15:28:41',
                  'updated_at': '2019-02-15 15:28:41'
                }
              }
            ]
          },
          'pagination': {
            'total': 51,
            'per_page': 20,
            'current_page': 1,
            'last_page': 3,
            'next_page': 2,
            'prev_page': null
          }
        }
      );
      observer.complete();
    });
  }
}
