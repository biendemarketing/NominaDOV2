// FIX: Changed import path to be explicit, pointing to the index file.
import { Task, TaskStatus, TaskPriority } from '../types/index';

export const MOCK_TASKS: Task[] = [
    { id: 'task-001', title: 'Revisar reporte DGT-3', category: 'Cumplimiento', assigneeId: 'emp-005', dueDate: '2024-07-25', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH },
    { id: 'task-002', title: 'Preparar nómina 1ra quincena Julio', category: 'Nómina', assigneeId: 'emp-005', dueDate: '2024-07-12', status: TaskStatus.DONE, priority: TaskPriority.HIGH },
    { id: 'task-003', title: 'Onboarding nuevo empleado de diseño', category: 'RRHH', assigneeId: 'emp-002', dueDate: '2024-08-01', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },
];