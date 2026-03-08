import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
@ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  isVisible = signal(true);
  currentIndex = signal(0);

  gallery = signal([
    { 
      id: 1, 
      url: 'https://dev-strategy.com/wp-content/uploads/2024/01/services-dev-strategy.png', 
      title: 'Arquitectura de Senda', 
      description: 'La arquitectura de senda es la base para el diseño de sistemas resilientes y escalables.' 
    },
    { 
      id: 2, 
      url: 'https://t4.ftcdn.net/jpg/04/73/84/61/360_F_473846184_0k637f6855ZJqaulKqAmgJTEVGVibR1P.jpg', 
      title: 'Equipo Payment', 
      description: 'El equipo Payment está compuesto por expertos en pagos digitales y seguridad financiera.' 
    },
    { 
      id: 3, 
      url: 'https://t4.ftcdn.net/jpg/03/86/04/93/360_F_386049395_X3LxuotZN5JD0PYFm53Q2tr8xqvat0lH.jpg', 
      title: 'Equipo Credits', 
      description: 'El equipo Credits está compuesto por expertos en gestión de créditos y análisis financiero.' 
    },
    { 
      id: 4, 
      url: 'https://cdn.corporatefinanceinstitute.com/assets/top-6-skills-in-finance-e1680549320407.jpeg', 
      title: 'Equipo Finance', 
      description: 'El equipo Finance está compuesto por expertos en análisis financiero y toma de decisiones estratégicas.' 
    }
  ]);

  goToSlide(index: number) {
    if (!this.carousel) return;
    const container = this.carousel.nativeElement;
    const items = container.querySelectorAll('.snap-center');
    
    if (items[index]) {
      const targetElement = items[index] as HTMLElement;
      container.scrollTo({
        left: targetElement.offsetLeft - 16, 
        behavior: 'smooth'
      });
      this.currentIndex.set(index);
    }
  }

  onScroll() {
    if (!this.carousel) return;
    const container = this.carousel.nativeElement;
    const scrollPosition = container.scrollLeft;
    const itemWidth = container.clientWidth;
    
    const newIndex = Math.round(scrollPosition / (itemWidth * 0.85));
    
    if (this.currentIndex() !== newIndex && newIndex >= 0 && newIndex < this.gallery().length) {
      this.currentIndex.set(newIndex);
    }
  }

  scrollNext() {
    const nextIndex = (this.currentIndex() + 1) % this.gallery().length;
    this.goToSlide(nextIndex);
  }

  scrollPrev() {
    const prevIndex = (this.currentIndex() - 1 + this.gallery().length) % this.gallery().length;
    this.goToSlide(prevIndex);
  }

  toggleVisibility() {
    this.isVisible.update(v => !v);
    if (this.isVisible()) {
      setTimeout(() => this.goToSlide(0), 100);
    }
  }
}
