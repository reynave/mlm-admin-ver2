import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

declare var $;
@Component({
  selector: 'app-com-reward-history',
  templateUrl: './com-reward-history.component.html',
  styleUrls: ['./com-reward-history.component.css']
})
export class ComRewardHistoryComponent implements OnInit {
  items :any = [];
  reward : any = [];
  loading : boolean = false;
  showUpdate : boolean = false;
  selectPeriod : any = [];
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }

  ngOnInit(): void {
    this.getHttp(); 
  }

  getHttp() {
    this.http.get<any>(environment.api + "commission/reward/2023", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data);  
        this.selectPeriod = data['selectPeriod'];
        this.items =  data['data']; 
        this.reward = data['reward'];
        $(document).ready(function () {
          $('#example').DataTable({
            ordering: false, 
            lengthMenu: [  50, 100, 200, 500],
          });
 
        });
      },
      error => {
        console.log(error);
      },

    );
  }
  selectDate : any = [];
  update(){
    console.log(this.selectDate);
  }
}
