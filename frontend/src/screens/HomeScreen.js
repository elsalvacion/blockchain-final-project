import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginDevice, logoutDevice } from "../actions/authAction";
import CustomModal from "../components/layout/CustomModal";
import { useHistory, Link } from "react-router-dom";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, deviceInfo } = useSelector(
    (state) => state.deviceLogin
  );
  const [values, setValues] = useState({
    deviceId: "",
    password: "",
    bubbleId: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (deviceInfo) {
      history.push("/communication");
    }
  }, [deviceInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginDevice(values));
  };
  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <CustomModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        title="Login Successful"
        text={`You have successfully logged in. You will be redirected soon`}
      />
      <CustomModal
        isOpen={error ? true : false}
        closeModal={() => dispatch(logoutDevice())}
        title="Login Error"
        text={error}
      />
      <div className="bg-white w-10/12 md:w-7/12 lg:w-4/12 rounded-md shadow-md p-3 py-7">
        <h2 className="font-bold text-center mb-3 text-2xl uppercase">
          Device Login
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
            <label className="mb-2 block">Device Bubble ID</label>
            <input
              required
              type="text"
              className="border-black border outline-none p-2 rounded-sm block w-full"
              placeholder="Enter device bubble ID"
              value={values.bubbleId}
              onChange={(e) =>
                setValues({
                  ...values,
                  bubbleId: e.target.value.trim().replace(/[^\d.-]+/g, ""),
                })
              }
            />
          </div>
          <p className="mb-2">
            Don't have an account?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>
          </p>
          <button
            disabled={loading}
            className="bg-black p-2 text-white uppercase text-center px-10 hover:bg-black/80"
            type="submit"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeScreen;
