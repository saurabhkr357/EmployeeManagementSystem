import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { DatePipe } from '@angular/common';

import {
  Attendance,
  AttendanceModel
} from '../../services/attendance';

@Component({
  selector: 'app-attendance',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})
export class AttendanceComponent implements OnInit {

  attendanceRecords = signal<AttendanceModel[]>([]);

  attendanceForm: FormGroup;

  isEditMode = false;
  selectedAttendanceId = 0;

  constructor(
    private attendanceService: Attendance,
    private fb: FormBuilder
  ) {

    this.attendanceForm = this.fb.group({

      employeeId: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      attendanceDate: [
        '',
        Validators.required
      ],

      status: [
        '',
        Validators.required
      ]

    });
  }

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance(): void {
    debugger;
    this.attendanceService.getAttendance()
      .subscribe({
        next: (response) => {
          this.attendanceRecords.set(response);
        },

        error: (error) => {
          console.error(
            'Error loading attendance:',
            error
          );
        }
      });
  }

  saveAttendance(): void {

    if (this.attendanceForm.invalid) {

      this.attendanceForm.markAllAsTouched();

      return;
    }

    const attendance: AttendanceModel = {

      id: this.selectedAttendanceId,

      ...this.attendanceForm.value

    };

    if (this.isEditMode) {

      this.attendanceService
        .updateAttendance(attendance)
        .subscribe({

          next: () => {

            this.loadAttendance();

            this.resetForm();
          },

          error: (error) => {

            console.error(
              'Error updating attendance:',
              error
            );

          }

        });

    } else {

      this.attendanceService
        .addAttendance(attendance)
        .subscribe({

          next: () => {

            this.loadAttendance();

            this.resetForm();
          },

          error: (error) => {

            console.error(
              'Error adding attendance:',
              error
            );

          }

        });

    }
  }

  editAttendance(
    attendance: AttendanceModel
  ): void {

    this.isEditMode = true;

    this.selectedAttendanceId =
      attendance.id;

    this.attendanceForm.patchValue({

      employeeId: attendance.employeeId,

      attendanceDate:
        attendance.attendanceDate
          .substring(0, 10),

      status: attendance.status

    });
  }

deleteAttendance(id: number): void {
debugger;
  if (!confirm('Are you sure you want to delete this attendance record?')) {
    return;
  }

  this.attendanceService.deleteAttendance(id)
    .subscribe({
      next: () => {
        this.loadAttendance();
      },

      error: (error) => {
        console.error('Error deleting attendance:', error);
      }
    });
}

  resetForm(): void {

    this.attendanceForm.reset({

      employeeId: 0,

      attendanceDate: '',

      status: ''

    });

    this.isEditMode = false;

    this.selectedAttendanceId = 0;
  }
}

