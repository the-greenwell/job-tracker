import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  Jobs:any = [];

  constructor(private apiService: ApiService) { }

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
