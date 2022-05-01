import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';

@Component({
  selector: 'app-vehiculo-list',
  templateUrl: './vehiculo-list.component.html',
  styleUrls: ['./vehiculo-list.component.css']
})
export class VehiculoListComponent implements OnInit {

  vehiculos: Array<Vehiculo> = [];

  marcas: Array<string> = [];
  contarMarcas!: Set<{marca: string, contador:number}>;

  constructor(private vehiculoService: VehiculoService) { }

  getVehiculos(): void {
     this.vehiculoService.getVehiculos().subscribe((vehiculos) => {
      this.vehiculos = vehiculos;

    },
    (error) => {console.log(error); },
    () => {
      this.getMarcas();

  })};

  getMarcas():void{
    for (let index = 0; index < this.vehiculos.length; index++) {
      const vehiculo = this.vehiculos[index];
      if(this.marcas.indexOf(vehiculo.marca)==-1){
        this.marcas.push(vehiculo.marca);
      }
    }
    this.contarMarcas=this.getContadores();
  }
  getContadores(){
    let result = new Set<{marca: string, contador:number}>();
    for (let index = 0; index < this.marcas.length; index++) {
      const marca = this.marcas[index];

      let contador = 0;
      for (let index = 0; index < this.vehiculos.length; index++) {
        const vehiculo = this.vehiculos[index];
        if(vehiculo.marca == marca){
          contador++;
        }
      }
      result.add({marca: marca, contador: contador});
    }
    return result;
  }


  ngOnInit() {
    this.getVehiculos();


  }

}
