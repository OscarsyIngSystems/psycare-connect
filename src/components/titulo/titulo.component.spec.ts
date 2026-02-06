// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { TituloComponent } from './titulo.component';

// describe('TituloComponent', () => {
//   let component: TituloComponent;
//   let fixture: ComponentFixture<TituloComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [TituloComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(TituloComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


// src/components/titulo/titulo.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TituloComponent } from './titulo.component';
import { FormsModule } from '@angular/forms';

describe('TituloComponent', () => {
  let component: TituloComponent;
  let fixture: ComponentFixture<TituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TituloComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title text', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('.heading-secondary');
    expect(titleElement?.textContent).toContain('Directorio de Canalizaciones');
  });
});
