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
  userId:any;

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
  ) { this.userId = localStorage.getItem('userId') }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit(): void {
    this.apiService.GetJobs(this.userId).subscribe(res => {
      this.Jobs = res;
    })
  }

  delete(job_id:any, i:any) {

    if(window.confirm('Are you sure you want to delete this job?')) {
      this.apiService.deleteJob(this.userId, job_id).subscribe((res) => {
        this.Jobs.splice(i, 1);
      })
    }
  }

}
