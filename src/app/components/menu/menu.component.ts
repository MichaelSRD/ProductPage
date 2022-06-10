import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  cesta: boolean = false; 
  estado: boolean = false;
  @ViewChild("navbar") mymenu!: ElementRef;
  @Input() productocart : any = []
  @Input() cantidad:  any
  @Input() producinfo: any
  @Input() estadoboton: boolean = false;
     
  constructor(private renderer: Renderer2 ) { }

  ngOnInit(): void {
  }
  menu_hidden(){
    const menu = this.mymenu.nativeElement;
    this.renderer.setStyle(menu,'left','0')
    this.renderer.addClass(menu,'open-menu')
  }
  menu_close(){
    const menu = this.mymenu.nativeElement;
    this.renderer.removeStyle(menu,'left')
      
  }
  @Output() newcantidad = new EventEmitter<number>();
  eliminarP(e: any){
    this.producinfo.splice(e, 1);
    this.newcantidad.emit();
  }
  cestaA(){
    this.cesta = !this.cesta
  }

}
