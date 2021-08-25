import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $;

@Component({
  selector: 'app-com-pair',
  templateUrl: './com-pair.component.html',
  styleUrls: ['./com-pair.component.css']
})
export class ComPairComponent implements OnInit {
  items :any = [];
  date  : any = {
    startDate  : '',
    endDate  : '', 
  }
  loading:boolean=true; 
  modalloading:boolean=false;
  transCode : string;
  constructor( 
    private http: HttpClient,
    private configService: ConfigService, 
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.queryParams.length);
  
    this.transCode =  this.activatedRoute.snapshot.queryParams.transCode;
    this.getHttp(); 
  }

  getHttp() {
    this.loading = true; 
    this.http.get<any>(environment.api + "commission/pairing/?"+new URLSearchParams(this.activatedRoute.snapshot.queryParams).toString(), {
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

  detailByDate:any = [];
  user : any = [];
  summary : any = [];
  
  open(content,obj) { 
    this.modalloading = true; 
    this.http.get<any>(environment.api + "commission/pairingByDate/"+obj.userId, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.loading=false;
        console.log(data); 
        this.detailByDate =  data['pairing'];  
        this.user = data['user'];
        this.summary = data['summary'];
      },
      error => {
        console.log(error);
      },

    );

    this.modalService.open(content, { size: 'xl' });
  }


}
