import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {
  nombreUrl : string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textError: string;

  constructor(private _shortUrlService: ShortUrlService) {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textError = '';
   }

  ngOnInit(): void {
  }

  procesarURL(){
    //Validar si la url es vacía ''
    if (this.nombreUrl === ''){
      this.error('Por favor ingresa una URL');
    }else{
      this.urlProcesada = false
      this.loading = true;
      this.obtenerUrlShort();
      

    }
  }

  //Consumiendo el servicio
  obtenerUrlShort(){
    this._shortUrlService.getUrlShort(this.nombreUrl).subscribe(data =>{
      this.urlShort = data.link;
      this.loading = false;
      this.urlProcesada = true;
    }, error =>{
      console.log(error.error.description)
      this.nombreUrl = '';
      this.loading = false;
      if (error.error.description === 'The value provided is invalid.'){
        this.error('La URL ingresada es inválida');
      }
      
    })

  }

  error(TextoError: string){
    this.textError = TextoError;
    this.mostrarError = true;
    setTimeout(() => {
      this.mostrarError = false;
    },3000)

  }

}
