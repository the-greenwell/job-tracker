import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  Jobs:any = [];

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
  ) { }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit(): void {
    this.apiService.GetJobs().subscribe(res => {
      this.Jobs = res;
      console.log(res)
    })
  }

  delete(id:any, i:any) {
    if(window.confirm('Are you sure you want to delete this job?')) {
      this.apiService.deleteJob(id).subscribe((res) => {
        this.Jobs.splice(i, 1);
      })
    }
  }

}
