import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Router } from '@angular/router';

declare var $;
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  items: any = [];
  constructor(

    private http: HttpClient,
    private router: Router,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.getHttp();

  }

  getHttp() {
    this.http.get<any>(environment.api + "invoice", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['items'];

        $(document).ready(function () {
          $('#ha').DataTable({
            lengthMenu: [50, 100, 200, 500],
          });
        });

      },
      error => {
        console.log(error);
      },

    );
  }

  onDetail(x) {
    if (x.topup == "1") {
      this.router.navigate(["topup/detail/", x.transactionCode]);
    } else {
      this.router.navigate(["transaction/detail/", x.transactionCode]);

    }
  }

  extract(x) {
    console.log(x);
    const body = {
      data : x
    }
    this.http.post<any>(environment.api + "invoice/extract",body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        //window.location.reload(); 
        console.log(data);
        this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
          this.router.navigate(['invoice']);
        }); 
      },
      error => {
        console.log(error);
      },

    );


  }

}
