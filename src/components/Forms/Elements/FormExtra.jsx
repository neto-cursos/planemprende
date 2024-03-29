import React from 'react';
import { Link } from 'react-router-dom';

const FormExtra = () => {
    return (
        <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Recordarme
          </label>
        </div>

        <div className="text-sm">
          <Link to="/recoverpassword" className="font-medium text-purple-600 hover:text-purple-500">
            ¿olvidó su password?
          </Link>
        </div>
      </div>
    );
}

export default FormExtra;
