import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-intervencion-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './intervencion-modal.html',
  styleUrl: './intervencion-modal.css',
})
export class IntervencionModal {
// 1. Un "Interruptor" (Signal) para saber si está abierto o cerrado
  isOpen = signal(false);

  // 2. El Formulario: Definimos qué datos queremos pedir
  protocolForm = new FormGroup({
    nivel: new FormControl('Media', Validators.required),
    motivo: new FormControl('', Validators.required),
    instrucciones: new FormControl('', [Validators.required, Validators.minLength(10)]),
    congelar: new FormControl(false),
    reasignar: new FormControl(false)
  });

  // 3. Funciones (Acciones que el cerebro puede ejecutar)
  abrir() { this.isOpen.set(true); }
  
  cerrar() { 
    this.isOpen.set(false);
    this.protocolForm.reset(); // Limpia los campos al cerrar
  }

  ejecutar() {
    if (this.protocolForm.valid) {
      console.log("¡Protocolo Iniciado!", this.protocolForm.value);
      this.cerrar();
    }
  }
}