import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../service/dashboard.service';
import {SelectionModel} from '@angular/cdk/collections';
import { noop as _noop } from 'lodash-es';
// import { MatPaginator } from '@angular/material/paginator';
// import { ToastrService } from 'ngx-toastr';

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
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    console.log(numSelected)
    return numSelected === numRows;
    
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach((row :any) => this.selection.select(row));
  }

  // Infinite Scroll
  
  // handleScroll = (scrolled: boolean) => {
  //   console.timeEnd('lastScrolled');
  //   scrolled ? this.dashboardService.getdashboard() : _noop();
  //   console.time('lastScrolled');
  // }
  // hasMore = () => !this.dataSource || this.dataSource.data.length < this.limit;

  // signout
  // signOut(){
  //   this.toast.success("Logout Succesfully")
  // }

  getdashboard:any;
onTableScroll(event:any) {
  const tableViewHeight = event.target.offsetHeight // viewport: ~500px
  const tableScrollHeight = event.target.scrollHeight // length of all table
  const scrollLocation = event.target.scrollTop; // how far user scrolled
  
  // If the user has scrolled within 200px of the bottom, add more data
  const buffer = 200;
  const limit = tableScrollHeight - tableViewHeight - buffer;    
  if (scrollLocation > limit) {
    console.log(this.Infinitescroll)
  this.dataSource = this.Infinitescroll.concat(this.Infinitescroll);
  }
}


  // console.log("called")
  // let params: any = {};
  
  //   this.page = this.dashboardService.getdashboard() + this.limit;
  //   params['offset'] = this.page;
  //   params['limit'] = this.limit;
  //     this.page_scroll = params['limit'];
  //     
  //     this.tabledata.sort = this.page_scroll;
    
  

}


