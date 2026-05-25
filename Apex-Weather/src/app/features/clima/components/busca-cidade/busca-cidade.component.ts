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
  onBuscar = output<string>();
  buscaForm: FormGroup = this.fb.group({
    cidade: ['', [Validators.required, Validators.minLength(3)]]
  });

  ngOnInit() {
    this.buscaForm.get('cidade')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),   
      filter(valor => valor && valor.trim().length >= 3) 
    ).subscribe(valor => {
      this.onBuscar.emit(valor.trim());
    });
  }
}
