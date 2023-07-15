'use client'
import axios from 'axios'
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react"; 
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";
import useRegisterModal from "@/app/Hooks/UseRegisterModal";
 
import Modals from "./Modals";
import Heading from '../Heading';
import Inputs from '../inputs/Inputs';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import UseLoginModal from '@/app/Hooks/UseLoginModal';
const RegisterModal =()=>{
    const LoginModal=UseLoginModal();
    const registerModal=useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const { 
      register, 
      handleSubmit,
      formState: {
        errors,
      },
    } = useForm<FieldValues>({
      defaultValues: {
        name: '',
        email: '',
        password: ''
      },
    });
    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);
        axios.post('/api/register',data)
        .then(()=>{
            registerModal.onClose()
        }).catch((error)=>{
           toast.error("error")
        }).finally(()=>{
            setIsLoading(false)
        })
    }

    const bodyContent=(
        <div className=' flex flex-col gap-4'>
            <Heading title='Welcome to BnB house' subtitle='Create your account' center/>
            <Inputs label='Email' id='email' disabled={isLoading} errors={errors} register={register} required/>
            <Inputs label='Name' id='name' disabled={isLoading} errors={errors} register={register} required/>
            <Inputs label='Password' id='password' type='password' disabled={isLoading} errors={errors} register={register} required/>

        </div>
    )
    const FooterContent = (
      <div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button 
          outline 
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => signIn('google')} 
        />
        <Button 
          outline 
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => signIn('github')}
        />
        <div 
          className="
            text-neutral-500 
            text-center 
            mt-4 
            font-light
          "
        >
          <p>Already have an account?
            <span 
              onClick={LoginModal.onOpen} 
              className="
                text-neutral-800
                cursor-pointer 
                hover:underline
              "
              > Log in</span>
          </p>
        </div>
      </div>
    )
  
    return <div>
        <Modals disabled={isLoading} isOpen={registerModal.isOpen} title='Register' 
        actionLabel='Continue' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={FooterContent}/>
    </div>
}
export default RegisterModal;