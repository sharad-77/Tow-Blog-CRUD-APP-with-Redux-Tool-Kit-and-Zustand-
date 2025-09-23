import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";
import { addUser,selectUsers } from "../slices/userSlices";
import { useEffect } from 'react';

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Passwrod Lenght Must be at least 6")
});

type FormData = z.infer<typeof schema>;

const Signup: React.FC = () => {
  const { register, handleSubmit,reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const dispatch = useDispatch();
  const AllUsers = useSelector(selectUsers);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('All users:', ...AllUsers);
  }, [AllUsers]);

  const onSubmit = (data: FormData) => {
    navigate("/login");
    dispatch(addUser(data));
    reset();
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='border-1 p-5 rounded-2xl'>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              {...register("name")}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder='Enter Your Name'
            />
            {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Your Email"
            />
            {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder='Enter Your Password'
            />
             {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/login"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
