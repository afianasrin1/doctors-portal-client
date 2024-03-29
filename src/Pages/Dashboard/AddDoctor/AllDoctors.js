import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import ConfirmModal from "../../Shared/Modal/ConfirmModal";

const AllDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState();

  const {
    data: doctorList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctorList"],
    queryFn: async () => {
      try {
        const res = await fetch("https://doctors-portal-server-xi-seven.vercel.app/doctorList", {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });
  const closeModal = () => {
    setDeletingDoctor(null);
  };
  const handleDeletingDoctor = (doctor) => {
    fetch(`https://doctors-portal-server-xi-seven.vercel.app/doctorList/${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount > 0) {
          toast.success(`doctor ${doctor.name} delete successful`);
        }
        refetch();
      });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-3xl">All Doctor</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {/* table er heading */}
              <th>serial No</th>
              <th>Name</th>
              <th>Photo</th>
              <th>Specialty</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {doctorList.map((doctor, i) => (
              <tr key={doctor._id}>
                <th>{i + 1}</th>
                <td>{doctor.name}</td>{" "}
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={doctor.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{doctor.specialty}</td>
                <td>
                  <label
                    //map er  doctor set hobe setdeleting er vitor
                    onClick={() => setDeletingDoctor(doctor)}
                    htmlFor="confirm-modal"
                    className="btn btn-xs btn-danger"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* table er  baire condition dibo */}
      {deletingDoctor && (
        <ConfirmModal
          title={`are you sure  you want to delete?`}
          message={`if you delete ${deletingDoctor.name} .it can not be undone.`}
          successAction={handleDeletingDoctor}
          successButtonName="Delete"
          modalData={deletingDoctor}
          closeModal={closeModal}
        ></ConfirmModal>
      )}
    </div>
  );
};

export default AllDoctors;
