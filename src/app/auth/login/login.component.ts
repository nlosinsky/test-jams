import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/data/auth.service';
import { LoginCredentials } from '../../shared/models';
import { FormHelper } from '../../shared/utils/form-helper';
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'aub-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmitting = false;

  readonly faLock = faLock;
  readonly faAt = faAt;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    if (!this.isFormValid) {
      FormHelper.setAllControlsDirty(this.form.controls);
      return;
    }

    if (this.form.invalid) {
      FormHelper.setAllControlsDirty(this.form.controls);
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.authService
      .login(this.form.value as LoginCredentials)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.cd.markForCheck();
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        alert('Success!')
      });
  }

  isInvalidField(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !FormHelper.isValidField(field);
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }

  private initForm(): void {
    const config = {
      email: ['', Validators.required],
      password: ['', Validators.required]
    };

    this.form = this.fb.group(config);
  }
}
