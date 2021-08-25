import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $;

@Component({
  selector: 'app-com-pair-trans',
  templateUrl: './com-pair-trans.component.html',
  styleUrls: ['./com-pair-trans.component.css']
})
export class ComPairTransComponent implements OnInit {
  items :any = [];
  date  : any = {
    startDate  : '',
    endDate  : '', 
  }
  user : any = [];
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
    console.log(this.activatedRoute.snapshot.params);
  
    this.transCode =  this.activatedRoute.snapshot.queryParams.transCode;
    this.getHttp(); 
  }

  getHttp() {
    this.loading = true; 
    this.http.get<any>(environment.api + "commission/pairingTransaction/"+this.activatedRoute.snapshot.params.userId, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.loading=false;
        console.log(data); 
        this.user = data['user'];
        this.items =  data['pairingDetail'];  
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


  back(){
    window.history.back();
  }

}
