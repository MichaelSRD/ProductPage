import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, Renderer2, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { observable } from 'rxjs';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})
export class ContenidoComponent implements OnInit {
  
  imagenes: any = [
    { url: '../../../assets/images/image-product-1.jpg',thumnail:'../../../assets/images/image-product-1-thumbnail.jpg'},
    { url: '../../../assets/images/image-product-2.jpg', thumnail:'../../../assets/images/image-product-2-thumbnail.jpg'},
    { url: '../../../assets/images/image-product-3.jpg', thumnail:'../../../assets/images/image-product-3-thumbnail.jpg'},
    { url: '../../../assets/images/image-product-4.jpg', thumnail:'../../../assets/images/image-product-4-thumbnail.jpg'},
  ];
  @Input() producto: any = [ ]
  
  
 

  cantidad: number = 1;
  public position2 = 0;
 @ViewChild("slider") myslider! : ElementRef;

  constructor(
    private rendere : Renderer2,
    private breakpointObserver : BreakpointObserver
    ) {

    
    
  }

  ngOnInit(): void {
    this.imagenes.map(( i: { id: any; marginleft: number; }, index: any ) => {
      i.id = index;
      i.marginleft = 0;
    })
  }
 minus(){
   if(this.cantidad > 1){
    this.cantidad --
   }
  
 }
 plus(){
  this.cantidad ++
 }
 setcurrenposition(position: number){
    this.position2 = position;
    this.imagenes.find((i: { id: number; }) => i.id == 0).marginleft = -100 * position;
 }

 imagenS(){
   let finalporcentage = 0;
   let nexposition = this.position2 + 1;
   const img = this.myslider.nativeElement;
   if(nexposition <= this.imagenes.length - 1){
     finalporcentage  = -100 * nexposition;
     this.rendere.setStyle(img,'margin-left', finalporcentage + '%')
   } else{
      nexposition = 0 ;
   }
   this.imagenes.find((i: { id: number; }) => i.id === 0).marginleft = finalporcentage;
   this.position2 = nexposition;
 }  
 imagenA(){
   let finalporcentage = 0;
   let backposition = this.position2 - 1;
   if(backposition >= 0){
     finalporcentage = -100 * backposition;
   } else {
      backposition  = this.imagenes.length - 1 ;
      finalporcentage = -100 * backposition;
   }
   this.imagenes.find((i: { id: number; }) => i.id === 0).marginleft = finalporcentage;
   this.position2 = backposition;
 }
 // enviar a la cesta cantidad de producto 
 @Output() newItemEvent = new EventEmitter<{cantidade:number, idp:number}>();
 setCantidadCesta(id: number) {
 
    this.newItemEvent.emit({ cantidade: this.cantidad, idp: id });
    
  }
 
  
  @Output() boxEvent = new EventEmitter<{cantidade:number, idp:number}>();
  lightbox(){
    if( this.breakpointObserver.isMatched('(min-width: 1023px)')){
      this.boxEvent.emit();
    }
  }
   
 
}

