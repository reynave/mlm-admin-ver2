import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare var $;
@Component({
  selector: 'app-com-passup',
  templateUrl: './com-passup.component.html',
  styleUrls: ['./com-passup.component.css']
})
export class ComPassupComponent implements OnInit {
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
    this.transCode =  this.activatedRoute.snapshot.queryParams.transCode;
    this.getHttp(); 
  }

  getHttp() {
    this.loading = true;
    this.http.get<any>(environment.api + "commission/passup?"+new URLSearchParams(this.activatedRoute.snapshot.queryParams).toString(), {
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
    this.router.navigate(['/comPassup'],{ queryParams: { parentId: parentId } }).then(
      ()=> window.location.reload(),
    ); 
  }

 
  onTransCode(){
    this.router.navigate(['/comPassup'],{ queryParams: { transCode: this.transCode } }).then(
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
    this.router.navigate(['/comPassup'],{ queryParams: _queryParams   }).then(
      ()=> window.location.reload(),
    ); 
  }


  clear(){
    this.router.navigate(['/comPassup']).then(
      ()=> window.location.reload(),
    ); 
  }

}
