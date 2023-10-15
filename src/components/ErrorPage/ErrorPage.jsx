import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="mx-10 text-center">
      <div>
        <div className="w-full">
          <img className="w-full" src="https://i.ibb.co/0M7V1CX/undraw-Page-not-found-re-e9o6.png" alt="" />
        </div>
        <h1 className="text-5xl mt-10">
          404 - Page not found
        </h1>
        <Link to = {"/"}>
          <button className="btn bg-indigo-400 text-slate-50 font-bold w-32 rounded-lg my-10">Go home</button>
        </Link>
      </div>
    </div>
    );
};

export default ErrorPage;