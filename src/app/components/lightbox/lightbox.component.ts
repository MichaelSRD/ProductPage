import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {

  imagenes: any = [
    { url: '../../../assets/images/image-product-1.jpg',thumnail:'../../../assets/images/image-product-1-thumbnail.jpg'},
    { url: '../../../assets/images/image-product-2.jpg', thumnail:'../../../assets/images/image-product-2-thumbnail.jpg'},
    { url: '../../../assets/images/image-product-3.jpg', thumnail:'../../../assets/images/image-product-3-thumbnail.jpg'},
    { url: '../../../assets/images/image-product-4.jpg', thumnail:'../../../assets/images/image-product-4-thumbnail.jpg'},
  ];
  public position2 = 0;

  @Input() lightcaja2 : boolean = false;
  
  @ViewChild("slider") myslider! : ElementRef;
  @ViewChild("lightbox") mylightbox! : ElementRef
  
  constructor(private rendere : Renderer2 ,
    private breakpointObserver : BreakpointObserver
    ) {

      const layoutChanges = breakpointObserver.observe([
        '(min-width: 1023px)'
        
      ]);
      
      layoutChanges.subscribe(result => {
        const lg = this.mylightbox.nativeElement;
        this.rendere.setStyle(lg,'display', 'none')
      });
      

      
    
  }

  ngOnInit(): void {
    this.imagenes.map(( i: { id: any; marginleft: number; }, index: any ) => {
      i.id = index;
      i.marginleft = 0;
    })
  }

 // position current
 setcurrenposition(position: number){
  this.position2 = position;
  this.imagenes.find((i: { id: number; }) => i.id == 0).marginleft = -100 * position;
  //
  
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
@Output() cambioEvent = new EventEmitter<{}>();
  cambio(){
      this.cambioEvent.emit();
  }

}
