import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerDevice } from "../actions/authAction";
import CustomModal from "../components/layout/CustomModal";
import { useHistory, Link } from "react-router-dom";
import { REGISTER_DEVICE_RESET } from "../reducers/types/authTypes";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, deviceInfo } = useSelector(
    (state) => state.deviceRegister
  );
  const [values, setValues] = useState({
    deviceId: "",
    password: "",
    email: "",
  });

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerDevice(values));
  };
  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <CustomModal
        isOpen={deviceInfo ? true : false}
        closeModal={() => {
          dispatch({ type: REGISTER_DEVICE_RESET });
          history.push("/");
        }}
        title="Registration Successful"
        text={`Your login details have been sent to the email you provided. Please check you spam folder if it have not appeared in your main inbox.`}
      />
      <CustomModal
        isOpen={error ? true : false}
        closeModal={() => dispatch({ type: REGISTER_DEVICE_RESET })}
        title="Registration Error"
        text={error}
      />
      <div className="bg-white w-10/12 md:w-7/12 lg:w-4/12 rounded-md shadow-md p-3 py-7">
        <h2 className="font-bold text-center mb-3 text-2xl uppercase">
          Register Device
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="my-7">
            <label className="mb-2 block">Device ID</label>
            <input
              required
              type="text"
              className="border-black border outline-none p-2 rounded-sm block w-full"
              placeholder="Enter device ID"
              value={values.deviceId}
              onChange={(e) =>
                setValues({
                  ...values,
                  deviceId: e.target.value.trim().replace(/[^\d.-]+/g, ""),
                })
              }
            />
          </div>
          <div className="my-7">
            <label className="mb-2 block">Device Password</label>
            <input
              required
              type="text"
              className="border-black border outline-none p-2 rounded-sm block w-full"
              placeholder="Enter device password"
              value={values.password}
              onChange={(e) =>
                setValues({
                  ...values,
                  password: e.target.value.trim().replace(/[^\d.-]+/g, ""),
                })
              }
            />
          </div>
          <div className="my-7">
            <label className="mb-2 block">Your email</label>
            <input
              required
              type="email"
              className="border-black border outline-none p-2 rounded-sm block w-full"
              placeholder="Enter your email"
              value={values.bubbleId}
              onChange={(e) =>
                setValues({
                  ...values,
                  email: e.target.value,
                })
              }
            />
          </div>
          <p className="mb-2">
            Already have an account?{" "}
            <Link to="/" className="underline">
              Login
            </Link>
          </p>
          <button
            disabled={loading}
            className="bg-black p-2 text-white uppercase text-center px-10 hover:bg-black/80"
            type="submit"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
