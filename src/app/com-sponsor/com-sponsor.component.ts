import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare var $;

@Component({
  selector: 'app-com-sponsor',
  templateUrl: './com-sponsor.component.html',
  styleUrls: ['./com-sponsor.component.css']
})
export class ComSponsorComponent implements OnInit {
  items :any = [];
  date  : any = {
    startDate  : '',
    endDate  : '', 
  }
  loading:boolean=true; 
  transCode : string;
  constructor( 
    private http: HttpClient,
    private configService: ConfigService, 
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.queryParams.length);
  
    this.transCode =  this.activatedRoute.snapshot.queryParams.transCode;
    this.getHttp(); 
  }

  getHttp() {
    this.loading = true; 
    this.http.get<any>(environment.api + "commission/sponsor/?"+new URLSearchParams(this.activatedRoute.snapshot.queryParams).toString(), {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.loading=false;
        console.log(data); 
        this.items =  data['items'];
        this.date = data['date'];
        
        $(document).ready(function () {
          $('#dataTables').DataTable({
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


  onParent(parentId){
    this.router.navigate(['/comSponsor'],{ queryParams: { parentId: parentId } }).then(
      ()=> window.location.reload(),
    ); 
  }

 
  onTransCode(){
    this.router.navigate(['/comSponsor'],{ queryParams: { transCode: this.transCode } }).then(
      ()=> window.location.reload(),
    ); 
  }

  onFilterDate(){

    const _queryParams ={
      parentId: this.activatedRoute.snapshot.queryParams.parentId,
      startDate : this.date.startDate,
      endDate : this.date.endDate, 
    }
    console.log(_queryParams);
    this.router.navigate(['/comSponsor'],{ queryParams: _queryParams   }).then(
      ()=> window.location.reload(),
    ); 
  }


  clear(){
    this.router.navigate(['/comSponsor']).then(
      ()=> window.location.reload(),
    ); 
  }

}
