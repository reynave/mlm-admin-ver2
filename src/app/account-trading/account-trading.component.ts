import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

declare var $;

@Component({
  selector: 'app-account-trading',
  templateUrl: './account-trading.component.html',
  styleUrls: ['./account-trading.component.css']
})
export class AccountTradingComponent implements OnInit {
  items :any = [];
  constructor(
    
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }

  ngOnInit(): void {
    this.getHttp();
  
  }

  getHttp() {
    this.http.get<any>(environment.api + "user/accounttrading", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
      
        this.items =  data;
        $(document).ready(function () {
          $('#example').DataTable({
            lengthMenu: [  50, 100, 200, 500],
          });
        });
      },
      error => {
        console.log(error);
      },

    );
  }

}
