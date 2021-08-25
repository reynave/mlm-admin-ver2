import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: any = [];
  options : any = { prefix: 'Rp ', thousands: '.', decimal: ',', precision :0 };
  currency : string;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {
    this.http.get<any>(environment.api + "home/notif", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data); 
        this.items = data; 
      },
      error => {
        console.log(error);
      },

    );
  }


  updateCurrency(){
    const body = {
      value : this.currency
    }
    this.http.post<any>(environment.api + "home/updateCurrency", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);  
        alert("Update Currency Success");
      },
      error => {
        console.log(error);
      },

    );
  }
}
