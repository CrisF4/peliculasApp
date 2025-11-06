import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: false
})
export class DetalleComponent  implements OnInit {
  @Input() id: any;

  constructor() { }

  ngOnInit() {
    console.log('Pelicula ID:', this.id);
  }

}
