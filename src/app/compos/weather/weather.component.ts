import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {WeatherModel} from '../../models/models';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherComponent implements OnInit {
  defaultCity = 'Dallas';
  unit = 'metric';
  private readonly rootUrl: string = 'http://api.openweathermap.org/data/2.5/weather?';
  private readonly appId: string = '641f2c4c590661bd176222ddd81e362f';
  url = `${this.rootUrl}q=${this.defaultCity}&APPID=${this.appId}&units=${this.unit}`;

  weather$ = this.http.get<WeatherModel>(this.url).pipe(
      // tap(changes => console.log(changes)),
      map(changes =>  {
        return changes;
      }),
      shareReplay(1), // Todo: May be we should cache here
      catchError(this.handleError)
  );

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
  roundUpTemp(temp: number): number {
    return Math.round(temp);
  }

  getWeatherIcon(weatherCondition): string {
    switch (weatherCondition) {
      case 'Clouds':
        return 'filter_drama';
      case 'Sunny':
        return 'wb_sunny';
      case 'Clear':
        return this.dayOrNight();
    }
  }
  dayOrNight(): string {
    const hour = new Date().getHours();
    if (hour > 8 && hour < 17) {
      return 'wb_sunny';
    } else {
      return 'brightness_3';
    }
  }
}
