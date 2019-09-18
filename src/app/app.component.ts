import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AssetPicker';
  data: any;
  isSearching: boolean;
  // tslint:disable-next-line: no-inferrable-types
  baseUrl: string = 'http://localhost:9009/cms/';
  // tslint:disable-next-line: no-inferrable-types
  imgBaseUrl: string = '';
  application = ['AEM', 'WCM'];
  selectedValue = 'AEM';
  // tslint:disable-next-line: no-inferrable-types
  selectedIndex: number = -1;

  constructor(private http: HttpClient) {
    this.isSearching = false;
    this.imgBaseUrl = this.baseUrl + this.selectedValue + '?resource=';
  }

  ngOnInit() {
    this.isSearching = true;
    this.http.get(this.baseUrl + this.selectedValue + '/asset?query=running').subscribe(res => {
      this.imgBaseUrl = this.baseUrl + this.selectedValue + '?resource=';
      this.isSearching = false;
      this.data = res;
      this.data.content.forEach((value: any) => {
        value.selected = false;
      });
    }, err => {
      this.isSearching = false;
      alert('Something went wrong !');
    });
  }

  searchAsset(query: string) {
    if (query.length > 0) {
      this.isSearching = true;
      this.http.get(this.baseUrl + this.selectedValue + '/asset?query=' + query).subscribe(res => {
        this.imgBaseUrl = this.baseUrl + this.selectedValue + '?resource=';
        this.isSearching = false;
        this.data = res;
      }, err => {
        this.isSearching = false;
        alert('Something went wrong !');
      });
    }
  }

  onChange(data: any) {
    this.selectedValue = data;
  }

  select(e, item) {
    if (e.currentTarget.classList.value.includes('check')) {
      e.currentTarget.classList.remove('check');
    } else {
      e.currentTarget.classList.add('check');
    }
    item.selected = !item.selected;
  }
}
