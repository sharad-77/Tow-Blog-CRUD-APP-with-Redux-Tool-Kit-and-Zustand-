import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";
import { useAuthStore } from '../store/useAuthStore';

const UserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

type LoginForm = z.infer<typeof UserSchema>;

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(UserSchema)
  });

  const onSubmit = (data: LoginForm) => {
    const Data = login(data);
    if (Data) {
      navigate("/dashboard");
    } else {
      alert("Please Enter Valid Credential Or SignUp First");
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center ">Login</h2>
        <form className='border-1 p-5 rounded-2xl' onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 ">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/signup"
            >
              Don't have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
