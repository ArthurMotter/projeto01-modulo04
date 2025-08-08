import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastInfo } from '../toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input() toastInfo!: ToastInfo;
  @Output() onClose = new EventEmitter<void>();

  private readonly typeToClass = {
    success: 'bg-success',
    danger: 'bg-danger',
    info: 'bg-info'
  };

  ngOnInit(): void {
    setTimeout(() => this.close(), 5000);
  }

  get toastClass(): string {
    return this.typeToClass[this.toastInfo.type] || 'bg-secondary';
  }

  close(): void {
    this.onClose.emit();
  }
}