import { Component, signal, ChangeDetectionStrategy, computed, AfterViewInit, ElementRef, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';


declare var Chart: any;

interface Task {
  id: string;
  title: string;
  responsible: string;
  status: 'Pendiente' | 'En Progreso' | 'Completada';
  dueDate: string;
  description: string;
  priority: 'Baja' | 'Media' | 'Alta';
}

type ViewMode = 'reportes' | 'operativa' | 'kanban';

@Component({
  selector: 'app-dashboard-task',
  imports: [CommonModule, ReactiveFormsModule],  
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-task.html',
  styleUrl: './dashboard-task.css',
})
export class DashboardTask {
 @ViewChild('trendChart') trendCanvas!: ElementRef;
  @ViewChild('statusChart') statusCanvas!: ElementRef;

  viewMode = signal<ViewMode>('reportes');
  isRegistering = signal(false);
  searchControl = new FormControl('');
  
  managers = ['JAVIER BARON', 'HIROSHI TANAKA', 'HUGO PARRA', 'AKIRA YAMAOKA', 'ELENA SEGURA'];

  filterPriority = signal<string>('Todas');
  filterStatus = signal<string>('Todos');
  filterResponsible = signal<string>('Todos');

  tasks = signal<Task[]>([
    { id: 'AZ-98', title: 'AUDITORÍA DE PROCESOS ARQUITECTÓNICOS Q1: REVISIÓN DE BITÁCORA MAESTRA', responsible: 'JAVIER BARON', status: 'En Progreso', dueDate: '2026-03-20', description: 'Revisión técnica exhaustiva de los protocolos de seguridad. Se requiere validación física de logs en el sitio.', priority: 'Alta' },
    { id: 'SN-44', title: 'IMPLEMENTACIÓN CANAL SENDA V2: INFRAESTRUCTURA CORE', responsible: 'HIROSHI TANAKA', status: 'Pendiente', dueDate: '2026-04-15', description: 'Despliegue de infraestructura crítica para el soporte de transacciones masivas.', priority: 'Media' },
    { id: 'CL-09', title: 'CONTROL DE CALIDAD CÓDIGO LEGACY: REFACTORIZACIÓN', responsible: 'HUGO PARRA', status: 'Completada', dueDate: '2026-03-08', description: 'Reducción de deuda técnica en un 35% mediante limpieza de endpoints obsoletos.', priority: 'Baja' },
    { id: 'DB-12', title: 'MIGRACIÓN DE BASE DE DATOS REGIONAL: CLUSTER TOKYO', responsible: 'AKIRA YAMAOKA', status: 'En Progreso', dueDate: '2026-05-10', description: 'Traspaso de datos sensibles a la nueva infraestructura segura.', priority: 'Alta' },
    { id: 'UX-05', title: 'REDISEÑO DE INTERFAZ PORTAL INTERNO: EXPERIENCIA ZEN', responsible: 'ELENA SEGURA', status: 'Pendiente', dueDate: '2026-04-22', description: 'Aplicación de principios de diseño limpio para reducir la carga cognitiva.', priority: 'Baja' }
  ]);

  charts: any[] = [];

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    responsible: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    priority: new FormControl('Media', Validators.required),
    description: new FormControl('')
  });

  registerForm = new FormGroup({
    title: new FormControl('', Validators.required),
    responsible: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    priority: new FormControl('Media', Validators.required),
    description: new FormControl('')
  });

  constructor() {
    this.syncForm();
    effect(() => {
      this.tasks();
      if (this.viewMode() === 'reportes') setTimeout(() => this.initCharts(), 150);
    });
    effect(() => {
      if (this.viewMode() === 'reportes') setTimeout(() => this.initCharts(), 150);
    });
  }

  ngAfterViewInit() {
    this.loadChartJS();
    window.addEventListener('resize', () => {
      if (this.viewMode() === 'reportes') this.initCharts();
    });
  }

  loadChartJS() {
    if (typeof Chart !== 'undefined') {
      this.initCharts();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => this.initCharts();
    document.head.appendChild(script);
  }

  initCharts() {
    if (typeof Chart === 'undefined') return;
    this.charts.forEach(c => c.destroy());
    this.charts = [];

    if (this.trendCanvas?.nativeElement) {
      this.charts.push(new Chart(this.trendCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          datasets: [{ label: 'Hitos', data: [12, 19, 3, 5, 2, 3], borderColor: '#F43F5E', backgroundColor: 'rgba(244, 63, 94, 0.1)', fill: true, tension: 0.4, borderWidth: 4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
      }));
    }

    if (this.statusCanvas?.nativeElement) {
      this.charts.push(new Chart(this.statusCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Pendiente', 'Progreso', 'Completada'],
          datasets: [{ data: [this.countStatus('Pendiente'), this.countStatus('En Progreso'), this.countStatus('Completada')], backgroundColor: ['#F43F5E', '#2563EB', '#10B981'], borderWidth: 0 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
      }));
    }
  }

  uniqueResponsibles = computed(() => this.managers);

  filteredTasks = computed(() => {
    const search = (this.searchControl.value || '').toLowerCase();
    const priority = this.filterPriority();
    const status = this.filterStatus();
    const responsible = this.filterResponsible();
    return this.tasks().filter(t => {
      const matchSearch = t.title.toLowerCase().includes(search);
      const matchPriority = priority === 'Todas' || t.priority === priority;
      const matchStatus = status === 'Todos' || t.status === status;
      const matchResponsible = responsible === 'Todos' || t.responsible === responsible;
      return matchSearch && matchPriority && matchStatus && matchResponsible;
    });
  });

  selectedTask = signal<Task | null>(this.tasks()[0]);
  kanbanColumns = [{ status: 'Pendiente' as const, label: 'Pendiente' }, { status: 'En Progreso' as const, label: 'En Progreso' }, { status: 'Completada' as const, label: 'Completada' }];

  getWordCount() { return (this.taskForm.get('description')?.value || '').trim().split(/\s+/).filter(w => w.length > 0).length; }
  getReadTime() { return Math.ceil(this.getWordCount() / 200) || 1; }
  setResponsibleFilter(val: string) { this.filterResponsible.set(val); }

  startRegistration() {
    this.registerForm.reset({ priority: 'Media', responsible: '', title: '', description: '', dueDate: '' });
    this.isRegistering.set(true);
    this.selectedTask.set(null);
    this.viewMode.set('operativa');
  }

  createTask() {
    if (this.registerForm.invalid) return;
    const formVal = this.registerForm.value;
    const newTask: Task = { 
      id: `${Math.floor(Math.random() * 900) + 101}`, 
      title: (formVal.title || '').toUpperCase(), 
      responsible: formVal.responsible || '', 
      dueDate: formVal.dueDate || '', 
      description: formVal.description || '', 
      status: 'Pendiente', 
      priority: (formVal.priority as any) || 'Media' 
    };
    this.tasks.update(t => [newTask, ...t]);
    this.isRegistering.set(false);
    this.selectTask(newTask);
  }

  selectTask(task: Task) {
    this.isRegistering.set(false);
    this.selectedTask.set(task);
    this.syncForm();
    if (window.innerWidth < 1024) setTimeout(() => document.querySelector('.group\\/notebook')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }

  openFromKanban(task: Task) { this.selectTask(task); this.viewMode.set('operativa'); }
  syncForm() {
    const task = this.selectedTask();
    if (task) this.taskForm.patchValue({ title: task.title, responsible: task.responsible, dueDate: task.dueDate, priority: task.priority, description: task.description });
  }

  saveChanges() {
    const currentTask = this.selectedTask();
    if (!currentTask || this.taskForm.invalid) return;
    const formVal = this.taskForm.value;
    const updated: Task = { ...currentTask, title: (formVal.title || currentTask.title).toUpperCase(), responsible: formVal.responsible || currentTask.responsible, dueDate: formVal.dueDate || currentTask.dueDate, priority: (formVal.priority as any) || currentTask.priority, description: formVal.description || '' };
    this.selectedTask.set(updated);
    this.tasks.update(ts => ts.map(t => t.id === currentTask.id ? updated : t));
  }

  updateStatus(newStatus: Task['status']) {
    const currentTask = this.selectedTask();
    if (!currentTask) return;
    const updated = { ...currentTask, status: newStatus };
    this.selectedTask.set(updated);
    this.tasks.update(ts => ts.map(t => t.id === currentTask.id ? updated : t));
  }

  getEfficiency() { const total = this.tasks().length; return total === 0 ? 0 : Math.round((this.countStatus('Completada') / total) * 100); }

  getStatusClass(status: Task['status']): string {
    switch (status) {
      case 'Pendiente': return 'border-rose-300 text-rose-600 bg-rose-50/80';
      case 'En Progreso': return 'border-blue-300 text-blue-600 bg-blue-50/80';
      case 'Completada': return 'border-emerald-300 text-emerald-600 bg-emerald-50/80';
      default: return 'border-slate-400 text-slate-400';
    }
  }

  getPriorityDot(priority: string): string {
    switch (priority) {
      case 'Alta': return 'bg-rose-500';
      case 'Media': return 'bg-amber-400';
      case 'Baja': return 'bg-emerald-500';
      default: return 'bg-slate-300';
    }
  }

  getPriorityBackground(priority: string): string {
    switch (priority) {
      case 'Alta': return 'bg-rose-500 text-white shadow-xl shadow-rose-200';
      case 'Media': return 'bg-amber-400 text-white shadow-xl shadow-amber-100';
      case 'Baja': return 'bg-emerald-500 text-white shadow-xl shadow-emerald-100';
      default: return 'bg-white text-slate-400';
    }
  }

  getPriorityBadge(priority: string): string {
    switch (priority) {
      case 'Alta': return 'bg-rose-100 text-rose-600 border border-rose-200';
      case 'Media': return 'bg-amber-100 text-amber-600 border border-amber-200';
      case 'Baja': return 'bg-emerald-100 text-emerald-600 border border-emerald-200';
      default: return 'bg-slate-100 text-slate-400';
    }
  }

  getPriorityBlockClass(priority: any): string {
    switch (priority) {
      case 'Alta': return 'bg-rose-500/5 border-rose-200 text-rose-700 ring-2 ring-rose-500/20';
      case 'Media': return 'bg-amber-500/5 border-amber-200 text-amber-700 ring-2 ring-amber-500/20';
      case 'Baja': return 'bg-emerald-500/5 border-emerald-200 text-emerald-700 ring-2 ring-emerald-500/20';
      default: return 'bg-white';
    }
  }

  getStatusBlockClass(status: Task['status']): string {
    switch (status) {
      case 'Pendiente': return 'bg-rose-600/5 border-rose-300 ring-1 ring-rose-500/10';
      case 'En Progreso': return 'bg-blue-600/5 border-blue-300 ring-1 ring-blue-500/10';
      case 'Completada': return 'bg-emerald-600/5 border-emerald-300 ring-1 ring-emerald-500/10';
      default: return 'bg-white';
    }
  }

  countStatus(status: Task['status']) { return this.tasks().filter(t => t.status === status).length; }
  countPriority(priority: string) { return this.tasks().filter(t => t.priority === priority).length; }
  moveTask(task: Task, direction: 'next' | 'prev') {
    const statuses: Task['status'][] = ['Pendiente', 'En Progreso', 'Completada'];
    const currentIndex = statuses.indexOf(task.status);
    let newIndex = currentIndex;
    if (direction === 'next' && currentIndex < 2) newIndex++;
    if (direction === 'prev' && currentIndex > 0) newIndex--;
    const updatedTask = { ...task, status: statuses[newIndex] };
    this.tasks.update(ts => ts.map(t => t.id === task.id ? updatedTask : t));
    if (this.selectedTask()?.id === task.id) this.selectedTask.set(updatedTask);
  }
  deleteTask(id: string) {
    this.tasks.update(ts => ts.filter(t => t.id !== id));
    const remaining = this.tasks();
    this.selectedTask.set(remaining.length > 0 ? remaining[0] : null);
    if (this.selectedTask()) this.syncForm();
  }
  filterTasksByStatus(status: Task['status']) { return this.filteredTasks().filter(t => t.status === status); }
}