import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IMenu } from './model/menu.model';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuList!: Observable<IMenu[]>;
  constructor(private httpService: MenuService) { }

  ngOnInit() {
    this.menuList = this.httpService.getList<IMenu>("assets/menu.json")
  }

}
