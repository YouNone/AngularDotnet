import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {

    if (component.editForm?.dirty) {
        return confirm("Are you sure you want to continue? All unsved data will be lost");
    }
    return true;
};
