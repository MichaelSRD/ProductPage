import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-page';
  cantidad: number = 0

  productopadre = [
    {id:'3', nombre: 'Fall Limited Edition Sneakers', descripcion: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.', p_total:  250.00 ,porcentaje: 50 + '%',p_descuento: 125.00 },
  ]
  
  public cantidad2 : number = 0
  public arrayP: any =  []
  estadoboton:boolean = false
  
  addItem(data: any){
      this.cantidad2 = data.cantidade;
      this.estadoboton = true;
      const item = this.arrayP.find((productopedio: { id: any; }) =>{
        return(productopedio.id === data.idp)
      })
      if(item !== undefined){
       
      }else{ 

        const add = this.productopadre.filter((product: { id: any; }) => product.id === data.idp )
        
        this.arrayP = this.arrayP.concat(add)
     console.log(this.arrayP);
      }
  } 
  borrarcantidad(data: any){
     this.cantidad2 = 0;
  }
  
  lightcaja: boolean = false
  lightbox2(){
    this.lightcaja = !this.lightcaja
  }
  
  

  
}
