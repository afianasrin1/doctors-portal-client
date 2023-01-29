import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // image er janno api key
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  // console.log(imageHostKey);
  const navigate = useNavigate();

  // data er name specialties dila karon etar upor map calaia name gulo nibo  ki specialtist
  const { data: specialties = [], isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      const res = await fetch("https://doctors-portal-server-xi-seven.vercel.app/appointmentSpecialty");
      const data = await res.json();
      return data;
    },
  });

  const handleAddDoctor = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
      //eikhane file hisabe img pathacsi tai stringifi json karbo na
    })
      .then((res) => res.json())
      .then((imgData) => {
        // console.log("Success:", imgData);consol gie dekhbo url name ase oita success dekhay then condition calabo

        if (imgData.success) {
          console.log(imgData.data.url);
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: imgData.data.url,
          };
          //database e doctor er info rakhbo
          fetch("https://doctors-portal-server-xi-seven.vercel.app/doctorList", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(
                `${data.name} & ${data.specialty} is added successful`
              );
              navigate("/dashboard/allDoctors");
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // jodi map error khai tahole isLoading use karo
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="h-[800px] flex justify-start items-start">
      <div className="w-96 p-7">
        <h2 className="text-2xl text-center">Add A Doctor</h2>
        <form onSubmit={handleSubmit(handleAddDoctor)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* doctor er specialty name/type */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Specialty</span>
            </label>
            <select
              {...register("specialty", {
                required: true,
              })}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                select specialty
              </option>
              {specialties.map((specialty) => (
                <option key={specialty._id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              {...register("image", {
                required: "Photo is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.img && <p className="text-red-500">{errors.img.message}</p>}
          </div>
          <input
            className="btn btn-accent w-full mt-4"
            value="Add Doctor"
            type="submit"
          />
        </form>
        <p>
          Already have an account{" "}
          <Link className="text-secondary" to="/login">
            Please Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};
export default AddDoctor;
