import { AbstractControl, ValidationErrors } from '@angular/forms';

export class Password
{

   static strongpassword(control:AbstractControl):ValidationErrors{

       let  pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

           if(!(control.value as string).match(pattern))
                     return {weakpassword:true}


            return null
   }
}
