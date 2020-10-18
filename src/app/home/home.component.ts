import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { ApiService } from "../api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  products = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .getProducts("http://localhost:3000/products?_page=1&_limit=20")
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }

  public firstPage() {
    this.products = [];
    this.apiService
      .getProducts(this.apiService.first)
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }
  public previousPage() {
    if (this.apiService.prev !== undefined && this.apiService.prev !== "") {
      this.products = [];
      this.apiService
        .getProducts(this.apiService.prev)
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }
  public nextPage() {
    if (this.apiService.next !== undefined && this.apiService.next !== "") {
      this.products = [];
      this.apiService
        .getProducts(this.apiService.next)
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }
  public lastPage() {
    this.products = [];
    this.apiService
      .getProducts(this.apiService.last)
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }
}
