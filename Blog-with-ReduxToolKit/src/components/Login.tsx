import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { z } from "zod";
import { selectUsers } from "../slices/userSlices";
import { login } from '../slices/authSlice';

const schema = z.object({
  email: z.string().email("Email Is Worng"),
  password: z.string().min(1, "Password Is Wrong")
});

type FormData = z.infer<typeof schema>;

const Login: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const AllUsers = useSelector(selectUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const user = AllUsers.find(user => user.email === data.email && user.password === data.password)
    if (user) {
      navigate("/dashboard");
      dispatch(login());
      console.log("Successfully Login");
      reset();
    } else {
      alert("Please Enter The Valid Information");
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center ">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='border-1 p-5 rounded-2xl'>
          <div className="mb-4 ">
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
