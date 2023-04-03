import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult: undefined | Iproduct[];
  constructor(private activeRout: ActivatedRoute, private product: ProductService) { }
  ngOnInit(): void {
    let query = this.activeRout.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query).subscribe((res) => {
      this.searchResult = res;
    })
  }
}
