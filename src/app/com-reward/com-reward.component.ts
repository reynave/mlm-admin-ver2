import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

declare var $;
  
@Component({
  selector: 'app-com-reward',
  templateUrl: './com-reward.component.html',
  styleUrls: ['./com-reward.component.css']
})
export class ComRewardComponent implements OnInit {
  items :any = [];
  reward : any = [];
  loading : boolean = false;
  history : any = [];
  showUpdate : boolean = false;
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }

  ngOnInit(): void {
    this.getHttp(); 
  }

  getHttp() {
    this.http.get<any>(environment.api + "commission/reward", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data);  
        this.items =  data['data']; 
        this.history = data['history'];
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

  onUpdate(){
    const body = {
      reward_end : this.reward.reward_end,
      reward_start : this.reward.reward_start,
      
    }
 
    this.http.post<any>(environment.api + "commission/comReward_onUpdate",body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data);   
        window.location.reload();
      },
      error => {
        console.log(error);
      },

    );
  }
 
  onCreateHistory(){
    const body = {
      update : true
    };
    if(confirm("Are you sure want to generate reward history ?") ){
      this.http.post<any>(environment.api + "commission/comReward_onCreateHistory",body, {
        headers: this.configService.headers()
      }).subscribe(
        data => { 
          console.log(data);   
          window.location.reload();
        },
        error => {
          console.log(error);
        },
  
      );
    } 
  
  }


  open(content) {
    this.modalService.open(content, { size : 'lg'});
  }
}
