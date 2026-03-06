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
      url: 'https://images.unsplash.com/photo-15420518418c7-d2a42d13b56b?auto=format&fit=crop&q=80&w=800', 
      title: 'Kaisen Neural Core', 
      description: 'Filosofía de optimización constante aplicada al procesamiento de flujos técnicos bajo el estándar de honor.' 
    },
    { 
      id: 2, 
      url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800', 
      title: 'Repositorio Zen Pro', 
      description: 'Arquitectura de almacenamiento sagrada para activos críticos de información con cifrado de grado imperial.' 
    },
    { 
      id: 3, 
      url: 'https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&q=80&w=800', 
      title: 'Vectores de Disciplina', 
      description: 'Sincronización global mediante rutas de comunicación disciplinadas y balance de carga inteligente.' 
    },
    { 
      id: 4, 
      url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80&w=800', 
      title: 'Interfaz Armónica v2', 
      description: 'Puntos de contacto diseñados para la fluidez absoluta entre el gestor de senda y el núcleo del sistema.' 
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
