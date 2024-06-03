function SignUp() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-base-200 p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Sign Up</h2>
        <form className="space-y-5">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none"
            placeholder="Full Name"
            name="fullname"
          />
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none"
            placeholder="Email"
            name="email"
          />
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none"
            placeholder="Password"
            name="password"
          />

          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <button className="btn btn-neutral">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
