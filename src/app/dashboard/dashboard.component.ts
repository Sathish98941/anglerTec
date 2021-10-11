import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../service/dashboard.service';
import {SelectionModel} from '@angular/cdk/collections';
import { noop as _noop } from 'lodash-es';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['select','position', 'name', 'weight', 'symbol'];
  dataSource : any;
  full: boolean = true;
  limit = 10;
  Infinitescroll :any

  // Sorting
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined
  

  constructor(public dashboardService : DashboardService ) { }

  selection = new SelectionModel<PeriodicElement>(true, []);

  ngOnInit(): void {
    
    this.dataSource = new MatTableDataSource(this.dashboardService.getdashboard());
    this.dataSource.sort = this.sort
    this.Infinitescroll = this.dashboardService.getdashboard()
  }

  // Search
  filterValue:any;
  applyFilter(event: any) {
    this.filterValue = event.target.value.trim()
    this.filterValue = this.filterValue.toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  // Checkbox
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    console.log(numSelected)
    return numSelected === numRows;
    
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach((row :any) => this.selection.select(row));
  }

  // Infinite Scroll
    
onTableScroll(event:any) {
  const tableViewHeight = event.target.offsetHeight 
  const tableScrollHeight = event.target.scrollHeight 
  const scrollLocation = event.target.scrollTop; 
    
  const buffer = 200;
  const limit = tableScrollHeight - tableViewHeight - buffer;    
  if (scrollLocation > limit) {
    console.log(this.Infinitescroll)
  this.dataSource = this.Infinitescroll.concat(this.Infinitescroll);
  }
}


  
}


