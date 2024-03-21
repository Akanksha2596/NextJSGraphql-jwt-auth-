import React, { useState, useEffect } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";

const BasicDetails = () => {
  const [formValues, setFormValues] = useState({
    aadhar_no: "",
    date_of_joining: "",
    department: "",
    employee_id: "",
    phone_no: "",
    users_permissions_user: "",
    publishedAt: "",
  });

  const [basicDetailId, setBasicDetailId] = useState(null);

  const CREATE_BASIC_DETAIL = gql`
    mutation CreateBasicDetail($data: BasicDetailInput!) {
      createBasicDetail(data: $data) {
        data {
          attributes {
            aadhar_no
            createdAt
            date_of_joining
            department
            employee_id
            phone_no
            publishedAt
            updatedAt
          }
          id
        }
      }
    }
  `;

  const UPDATE_BASIC_DETAIL = gql`
    mutation UpdateBasicDetail(
      $updateBasicDetailId: ID!
      $data: BasicDetailInput!
    ) {
      updateBasicDetail(id: $updateBasicDetailId, data: $data) {
        data {
          attributes {
            aadhar_no
            date_of_joining
            department
            employee_id
            phone_no
            publishedAt
            updatedAt
          }
        }
      }
    }
  `;

  const GET_BASIC_DETAIL = gql`
    query BasicDetail($basicDetailId: ID!) {
      basicDetail(id: $basicDetailId) {
        data {
          id
          attributes {
            aadhar_no
            date_of_joining
            department
            employee_id
            phone_no
            publishedAt
            updatedAt
          }
        }
      }
    }
  `;

  const QueryDetail = ({ basicDetailId }: any) => {
    const {
      loading: queryLoading,
      error: queryError,
      data: queryData,
    } = useQuery(GET_BASIC_DETAIL, {
      variables: {
        basicDetailId: basicDetailId,
      },
    });

    if (queryLoading) return <p>Loading...</p>;
    if (queryError) return <p>Error: {queryError.message}</p>;

    const basicDetail = queryData.basicDetail.data.attributes;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Basic Details</h2>
        <p>Date of Joining: {basicDetail.date_of_joining}</p>
        <p>Phone No: {basicDetail.phone_no}</p>
        <p>Aadhar No: {basicDetail.aadhar_no}</p>
        <p>Employee ID: {basicDetail.employee_id}</p>
        <p>Published At: {basicDetail.publishedAt}</p>
        <p>Department: {basicDetail.department}</p>
        {/* extra details one needs can be added here */}
      </div>
    );
  };

  const [
    createBasicDetailMutation,
    { loading: createLoading, error: createError },
  ] = useMutation(CREATE_BASIC_DETAIL, {
    onCompleted(data) {
      console.log("Data returned from mutation:", data);
      if (data && data.createBasicDetail) {
        alert("Basic details submitted successfully!");
        setBasicDetailId(data.createBasicDetail.data.id);
      }
    },
    onError(error) {
      console.error("Error:", error.message);
    },
  });

  const [
    updateBasicDetailMutation,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_BASIC_DETAIL, {
    onError(error) {
      console.error("Error:", error.message);
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (basicDetailId) {
      // If basicDetailId exists, perform update mutation
      updateBasicDetailMutation({
        variables: {
          updateBasicDetailId: basicDetailId,
          data: { ...formValues },
        },
        refetchQueries: [{
          query: GET_BASIC_DETAIL,
          variables: { basicDetailId },
        }],
      });
    } else {
      createBasicDetailMutation({
        variables: {
          data: { ...formValues },
        },
        onCompleted(data) {
          console.log("Data returned from mutation:", data);
          if (data && data.createBasicDetail) {
            alert("Basic details submitted successfully!");
            setBasicDetailId(data.createBasicDetail.data.id);
          }
        },
      });
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Enter Basic Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="aadhar_no">Aadhar No </label>
        <input
          type="text"
          id="aadhar_no"
          name="aadhar_no"
          value={formValues.aadhar_no}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <br />
        <br />
        <label htmlFor="date_of_joining">Date of Joining </label>
        <input
          type="date"
          id="date_of_joining"
          name="date_of_joining"
          value={formValues.date_of_joining}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <br />
        <br />
        <label htmlFor="department">Department </label>
        <input
          type="text"
          id="department"
          name="department"
          value={formValues.department}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <br />
        <br />
        <label htmlFor="employee_id">Employee ID </label>
        <input
          type="number"
          id="employee_id"
          name="employee_id"
          value={formValues.employee_id}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <br />
        <br />
        <label htmlFor="phone_no">Phone No </label>
        <input
          type="number"
          id="phone_no"
          name="phone_no"
          value={formValues.phone_no}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <br />
        <br />
        <label htmlFor="users_permissions_user">Users Permissions User </label>
        <input
          type="number"
          id="users_permissions_user"
          name="users_permissions_user"
          value={formValues.users_permissions_user}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <br />
        <br />
        <label htmlFor="publishedAt">Published At </label>
        <input
          type="text"
          id="publishedAt"
          name="publishedAt"
          value={formValues.publishedAt}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "lightblue",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            borderRadius: "4px",
          }}
        >
          {basicDetailId ? "Update" : "Submit"}
        </button>
      </form>
      {basicDetailId !== null && <QueryDetail basicDetailId={basicDetailId} />}
    </div>
  );
};

export default BasicDetails;
