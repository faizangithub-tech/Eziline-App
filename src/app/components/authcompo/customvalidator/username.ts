import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { SignUpService } from 'src/app/services/auth-services/signup.service';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';

export class username
{

     static spacenotallowed(control:AbstractControl):ValidationErrors{
              if((control.value as string).indexOf(' ')>=0)
                       return {cannotContainSapce:true}

              return null
     }

     static mustbeunique(signup:SignUpService):AsyncValidatorFn{

          return (control:AbstractControl):Promise<ValidationErrors>|null| Observable<ValidationErrors | null> =>
          {
                  console.log("Iam in custom async validator")
                  return signup.uniqueusername(control.value)
                               .pipe(map((response:any)=>{
                                 return (response!=null)?{alreadytaken:true}:null
                               }))
          }
     }
}
