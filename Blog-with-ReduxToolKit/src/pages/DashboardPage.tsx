import { Link } from 'react-router-dom';
import CreateBlog from '../components/CreateBlog';

const DashboardPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <Link to="/blog/create" className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600">Create Blog</Link>
      </div>
      <CreateBlog />
    </div>
  );
};

export default DashboardPage;
