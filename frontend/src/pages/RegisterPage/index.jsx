import React from 'react' // eslint-disable-line no-unused-vars
import { useForm } from 'react-hook-form'
import { registerUser } from '../../store/thunkFunctions'
import { useDispatch } from 'react-redux'

const RegisterPage = () => {

  const { register, handleSubmit, formState: { errors }, reset } 
  = useForm({ mode: 'onChange' }) 
  //register(name, option): 유효성 절차를 등록 in input tag
  //handleSubmit: onSubmit이라는 함수를 통해 회원가입 정보를 받아오고 마지막엔 reset
  //errors: 유효성 통과를 못하면 err를 발생

  const dispatch = useDispatch();

  const onSubmit = ({ email, password, name }) => {

    const body = {
      email,
      password,
      name,
      image: 'https://via.placeholder.com/600x400?text=no+user+image'
    }

    dispatch(registerUser(body)); //백엔드에 body를 보내주기, registerUser는 thunkFunctions.js에서 정의

    reset();
  }

  const userEmail = {
    required: "필수 필드입니다."
  } //email의 input tag에 register

  const userName = {
    required: "필수 필드입니다."
  } //name의 input tag에 register

  const userPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자입니다."
    }
  } //password의 input tag에 register

  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'>
      <div className='p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-semibold text-center'>
          회원가입
        </h1>
        <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-2'>
            <label
              htmlFor='email'
              className='text-sm font-semibold text-gray-800'
            >Email</label>
            <input
              type='email'
              id="email"
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register('email', userEmail)}
            />
            {
              errors?.email &&
              <div>
                <span className='text-red-500'>
                  {errors.email.message}
                </span>
              </div> //유효성 절차를 통과하지 못했을 경우 err message를 보여주기
            }
          </div>

          <div className='mb-2'>
            <label
              htmlFor='name'
              className='text-sm font-semibold text-gray-800'
            >Name</label>
            <input
              type='text'
              id="name"
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register('name', userName)}
            />
            {
              errors?.name &&
              <div>
                <span className='text-red-500'>
                  {errors.name.message}
                </span>
              </div> //유효성 절차를 통과하지 못했을 경우 err message를 보여주기
            }
          </div>

          <div className='mb-2'>
            <label
              htmlFor='password'
              className='text-sm font-semibold text-gray-800'
            >Password</label>
            <input
              type='password'
              id="password"
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register('password', userPassword)}
            />
            {
              errors?.password &&
              <div>
                <span className='text-red-500'>
                  {errors.password.message}
                </span>
              </div> //유효성 절차를 통과하지 못했을 경우 err message를 보여주기
            }
          </div>

          <div className='mt-6'>
            <button type='submit' className='w-full px-4 py-2 text-white duration-200 bg-black rounded-md hover:bg-gray-700'>
              회원가입
            </button>
          </div>

          <p className='mt-8 text-xs font-light text-center text-gray-700'>
            아이디가 있다면?{" "}
            <a
              href='/login'
              className='font-medium hover:underline'
            >
              로그인
            </a>
          </p>
        </form>
      </div>
    </section>
  )
}

export default RegisterPage