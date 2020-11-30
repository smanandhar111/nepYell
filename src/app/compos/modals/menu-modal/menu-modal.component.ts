import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss']
})
export class MenuModalComponent implements OnInit {
  restName: string;
  constructor(public dialogRef: MatDialogRef<MenuModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.restName = data.restName;
  }
  menu = [
    {
      appetizers: [
        {food: 'Channa Mix', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Sammosa Chaat', price: 250, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Pani Puri', price: 120, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Momo', price: 250, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
      ],
      entries: [
        {food: 'Channa Mix', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Sammosa Chaat', price: 250, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Pani Puri', price: 120, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Momo', price: 250, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
      ],
      deserts: [
        {food: 'Channa Mix', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Sammosa Chaat', price: 250, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Pani Puri', price: 120, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Momo', price: 250, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
      ],
      beverages: [
        {food: 'Channa Mix', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Sammosa Chaat', price: 250, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Pani Puri', price: 120, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Momo', price: 250, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
      ]}
  ];

  menuItem = [
    {header: 'Veggie', footer: [
        {food: 'Channa Mix', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Gobi Curry', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Alu-Mushroom', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
      ]},
    {header: 'Non-Veg', footer: [
        {food: 'Chicken Chili', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Goat Curry', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Fish Fry', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
      ]},
    {header: 'Non-Veg', footer: [
        {food: 'Chicken Chili', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Goat Curry', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Fish Fry', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
      ]},
    {header: 'Non-Veg', footer: [
        {food: 'Chicken Chili', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Goat Curry', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
        {food: 'Fish Fry', price: 100, description: 'Chickpea boild and then fried with onions and garlic with spicy sauce'},
      ]},
  ];

  ngOnInit() {
  }

}
