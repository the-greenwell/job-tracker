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
      console.log(res)
      this.Jobs = res;
    })
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.apiService.deleteJob(id).subscribe((res) => {
        this.Jobs.splice(i, 1);
      })
    }
  }

}
