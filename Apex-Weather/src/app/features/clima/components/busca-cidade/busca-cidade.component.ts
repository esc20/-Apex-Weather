import { Component, OnInit, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-busca-cidade',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './busca-cidade.component.html',
  styleUrl: './busca-cidade.component.scss'
})
export class BuscaCidadeComponent implements OnInit {
  private fb = inject(FormBuilder);
  
  // Emite o nome da cidade para o componente Pai (Home)
  onBuscar = output<string>();

  buscaForm: FormGroup = this.fb.group({
    cidade: ['', [Validators.required, Validators.minLength(3)]]
  });

  ngOnInit() {
    this.buscaForm.get('cidade')?.valueChanges.pipe(
      debounceTime(500),         // Aguarda 500ms após o usuário parar de digitar
      distinctUntilChanged(),    // Evita buscar se o valor for idêntico ao anterior
      filter(valor => valor && valor.trim().length >= 3) // Só avança com 3 ou mais letras
    ).subscribe(valor => {
      this.onBuscar.emit(valor.trim());
    });
  }
}
