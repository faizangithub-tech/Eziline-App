import { SignUpService } from 'src/app/services/auth-services/signup.service'
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export class Email
{


  static mustbeunique(signup:SignUpService):AsyncValidatorFn{

    return (control:AbstractControl):Promise<ValidationErrors>|null| Observable<ValidationErrors | null> =>
    {
            console.log("Iam in custom async validator")
            return signup.uniqueemail(control.value)
                         .pipe(map((response:any)=>{
                           return (response!=null)?{alreadytaken:true}:null
                         }))
    }}
}
