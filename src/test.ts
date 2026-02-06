// src/test.ts
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Primero, inicializa el entorno de testing de Angular
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// NOTA: En Angular 17+ con aplicaciones standalone,
// no necesitas require.context
// El CLI maneja la carga de archivos .spec automáticamente
