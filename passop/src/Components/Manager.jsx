import React, { useRef, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef(null);
  const passwordref = useRef();
  const [form, setform] = useState({ site: '', username: '', password: '' });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem('password');
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: 'dark',
    });
  };

  const showPassword = () => {
    if (ref.current.src.includes('/eye.png')) {
      passwordref.current.type = 'text';
      ref.current.src = '/hide.png';
    } else {
      passwordref.current.type = 'password';
      ref.current.src = '/eye.png';
    }
  };

  const savePassword = () => {
    if (form.site == '' || form.username == '' || form.password == '') {
      toast.error('Please fill all fields!');
    } else {
      setPasswordArray([...passwordArray, form]);
      localStorage.setItem(
        'password',
        JSON.stringify([...passwordArray, form]),
        toast.success('Password saved successfully!')
      );
      setform({ site: '', username: '', password: '' });
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditPassword = (index) => {
    setform(passwordArray[index]);
    setPasswordArray(passwordArray.filter((item, i) => i !== index));
  };

  const handleDeletePassword = (index) => {
    let c = window.confirm('Are you sure you want to delete this password?');
    if (c) {
      setPasswordArray(passwordArray.filter((item, i) => i !== index));
      localStorage.setItem(
        'password',
        JSON.stringify(passwordArray.filter((item, i) => i !== index)),
        toast.warning('Password deleted !')
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-white text-center font-bold m-2 text-3xl">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP&gt;</span>
        </h1>
        <p className="text-white text-center font-bold">
          Your own Password Manager
        </p>
        <div className="text-white flex flex-col p-4">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            placeholder="Enter website URL"
            className="p-2 m-2 rounded-lg text-black w-full"
            name="site"
          />
          <div className="flex flex-col sm:flex-row w-full gap-4 m-2">
            <input
              value={form.username}
              onChange={handleChange}
              className="p-2 rounded-lg text-black flex-1"
              placeholder="Enter Username"
              type="text"
              name="username"
            />
            <div className="relative flex-1">
              <input
                ref={passwordref}
                value={form.password}
                onChange={handleChange}
                className="p-2 rounded-lg text-black w-full"
                placeholder="Enter Password"
                type="password"
                name="password"
              />
              <span
                onClick={showPassword}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-black"
              >
                <img ref={ref} className="w-[20px]" src="/eye.png" alt="" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg w-full sm:w-1/4 m-auto hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-5 py-2.5 text-center "
          >
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-white text-center text-3xl font-bold mb-2">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-2xl text-center bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              No passwords to show
            </div>
          )}
          {passwordArray.length != 0 && (
            <div className="max-h-96 overflow-y-auto">
              <table className="table-auto text-white w-full overflow-hidden rounded-md mb-8">
                <thead className=" bg-zinc-700">
                  <tr>
                    <th className="p-2">Site</th>
                    <th className="p-2">UserName</th>
                    <th className="p-2">Password</th>
                    <th className="p-2">Edit</th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-900">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="p-2 border relative border-zinc-800 text-center min-w-32 break-words">
                          <a
                            className="text-blue-500 break-words"
                            target="_blank"
                            href={item.site}
                          >
                            {item.site}
                          </a>
                          <img
                            onClick={() => handleCopy(item.site)}
                            className="invert w-4 absolute right-5 top-1 m-2 cursor-pointer hover:scale-125"
                            src="/copy.png"
                            title="Copy"
                            alt=""
                          />
                        </td>

                        <td className="p-2 border relative  border-zinc-800 text-center min-w-32 break-words">
                          {item.username}
                          <img
                            onClick={() => handleCopy(item.username)}
                            className="invert w-4 absolute right-5 top-1 m-2 cursor-pointer hover:scale-125"
                            src="/copy.png"
                            title="Copy"
                            alt=""
                          />
                        </td>
                        <td className="p-2 border relative  border-zinc-800 text-center min-w-32 break-words">
                          {item.password}
                          <img
                            onClick={() => handleCopy(item.password)}
                            className="invert w-4 absolute right-5 top-1 m-2 cursor-pointer hover:scale-125"
                            src="/copy.png"
                            title="Copy"
                            alt=""
                          />
                        </td>
                        <td className="p-2 border relative  border-zinc-800 text-center min-w-32">
                          <div className="flex justify-around ">
                            <span>
                              <img
                                onClick={() => {
                                  handleEditPassword(index);
                                }}
                                className="w-5 invert cursor-pointer"
                                src="/edit.png"
                                title="Edit"
                                alt=""
                              />
                            </span>
                            <span>
                              {' '}
                              <img
                                onClick={() => {
                                  handleDeletePassword(index);
                                }}
                                className="w-5 invert cursor-pointer"
                                src="/delete.png"
                                title="Delete"
                                alt=""
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
