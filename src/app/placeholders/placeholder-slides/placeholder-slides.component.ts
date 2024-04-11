import { NgStyle } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'placeholder-slides',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './placeholder-slides.component.html',
  styleUrl: './placeholder-slides.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlaceholderSlidesComponent {}
