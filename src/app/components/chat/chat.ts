import { Component ,signal, ViewChild, ElementRef, afterNextRender, computed} from '@angular/core';
import { CommonModule } from '@angular/common';

interface AttachedFile {
  name: string;
  size: string;
  type: string;
}

interface Message {
  text?: string;
  file?: AttachedFile;
  sender: 'user' | 'bot';
  time: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
@ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  isChatOpen = signal(false);
  isTyping = signal(false);
  inputValue = signal('');
  
  messages = signal<Message[]>([
    { text: 'Honor y disciplina, Gestor. Soy su asistente de Senda.Int. He optimizado mi interfaz para cualquier terminal móvil. ¿En qué puedo asistirle?', sender: 'bot', time: new Date() }
  ]);

  canSend = computed(() => this.inputValue().trim().length > 0);

  constructor() {
    afterNextRender(() => {
      this.scrollToBottom();
    });
  }

  toggleChat() {
    this.isChatOpen.update(v => !v);
  }

  onInputChange(val: string) {
    this.inputValue.set(val);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileSize = (file.size / 1024).toFixed(1) + ' KB';
      
      const fileMsg: Message = {
        sender: 'user',
        time: new Date(),
        file: {
          name: file.name,
          size: fileSize,
          type: file.type.split('/')[1]?.toUpperCase() || 'FILE'
        }
      };

      this.messages.update(prev => [...prev, fileMsg]);
      this.simulateBotResponse('Escaneando bitácora móvil: ' + file.name);
      input.value = '';
    }
  }

  sendMessage() {
    const text = this.inputValue().trim();
    if (!text) return;

    this.messages.update(prev => [...prev, {
      text: text,
      sender: 'user',
      time: new Date()
    }]);

    this.inputValue.set('');
    this.simulateBotResponse(text);
  }

  simulateBotResponse(query: string) {
    this.isTyping.set(true);

    setTimeout(() => {
      this.isTyping.set(false);
      let botText = 'Solicitud recibida. Sincronizando datos con el nodo central.';
      const lowInput = query.toLowerCase();

      if (lowInput.includes('bitácora') || lowInput.includes('escaneando')) {
        botText = 'Análisis de integridad completado. Los datos del archivo adjunto cumplen con los protocolos Nippon.';
      } else if (lowInput.includes('hola')) {
        botText = 'Saludos, Gestor. El núcleo de inteligencia está a su disposición en este terminal.';
      } else if (lowInput.includes('estado')) {
        botText = 'Sistemas estables. Nodos regionales sincronizados. Latencia mínima detectada.';
      }

      this.messages.update(prev => [...prev, {
        text: botText,
        sender: 'bot',
        time: new Date()
      }]);
      
      this.scrollToBottom();
    }, 1500);
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      setTimeout(() => {
        const el = this.scrollContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }, 50);
    }
  }
  }
