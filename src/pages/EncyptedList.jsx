import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  decryptTodo,
  deleteTodo,
} from "../redux/action/todoActions";
import { useInView } from "react-intersection-observer";
import { Pencil, Trash } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const EncyptedList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.data);
  const hasMore = useSelector((state) => state.todos.hasMore);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const { ref, inView } = useInView();

  const formik = useFormik({
    initialValues: {
      key_name: "",
      key_value: "",
    },
    validationSchema: Yup.object({
      key_value: Yup.string().required("Key Value is required"),
    }),
    onSubmit: (values) => {
      try {
        dispatch(addTodo(values));
        setIsPopupOpen(false);
        formik.resetForm();
        setCurrentTodo(null);
        toast.success("data saved successful!");
      } catch (error) {
        toast.error(
          error?.response?.data?.error?.message || "Error in data save"
        );
      }
    },
  });

  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodo({ id: todo._id }));
  };

  const openPopup = (todo = null) => {
    setCurrentTodo(todo);

    if (todo) {
      dispatch(
        decryptTodo({ key_name: todo.key_name, key_value: todo.key_value })
      )
        .then((decryptedData) => {
          formik.setValues({
            key_name: decryptedData.data.key_name,
            key_value: decryptedData.data.key_value,
          });
        })
        .catch((error) => {
          console.error("Error decrypting data", error);
          toast.error("Error decrypting data");
        });
    } else {
      formik.setValues({
        key_name: "",
        key_value: "",
      });
    }

    setIsPopupOpen(true);
  };

  useEffect(() => {
    if (inView && hasMore) {
      const nextPage = Math.ceil(todos.length / 100) + 1;
      dispatch(fetchTodos(nextPage));
    }
  }, [inView, hasMore, todos.length, dispatch]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-semibold mb-4">Enncrypted List</h1>

      <div className="flex justify-between mb-4">
        <button className="text-gray-400 px-4 py-2 rounded-md hover:bg-blue-600">
          {todos.length}
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => openPopup()}
        >
          Add Encrypted Data
        </button>
      </div>
      <div className="max-h-[450px] overflow-y-auto">
        <ul className="space-y-4 mt-1">
          {todos.map((todo, index) => (
            <li
              key={index + 1}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-100 rounded-md shadow-sm w-full"
            >
              <div className="flex-1 overflow-hidden sm:flex sm:space-x-4 sm:space-y-0 space-y-2">
                <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  <strong> </strong>
                  {todo.key_name || "No Value"}
                </div>
                <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  <strong> </strong>
                  {todo.key_value || "No Value"}
                </div>
              </div>

              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  className="text-gray-600 hover:text-blue-500"
                  onClick={() => openPopup(todo)}
                >
                  <Pencil size={20} />
                </button>
                <button
                  className="text-gray-600 hover:text-blue-500"
                  onClick={() => handleDeleteTodo(todo)}
                >
                  <Trash size={20} color="red" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div ref={ref} className="h-1" />

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {currentTodo ? "Edit Todo" : "Add Todo"}
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="key_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Key Name
                </label>
                <input
                  type="text"
                  id="key_name"
                  name="key_name"
                  disabled={!!formik.initialValues.key_name}
                  value={formik.values.key_name}
                  onChange={formik.handleChange}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 ${
                    formik.initialValues.key_name
                      ? "cursor-not-allowed bg-gray-200"
                      : ""
                  }`}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="key_value"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Key Value
                </label>
                <input
                  type="text"
                  id="key_value"
                  name="key_value"
                  value={formik.values.key_value}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
                {formik.touched.key_value && formik.errors.key_value ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.key_value}
                  </div>
                ) : null}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {currentTodo ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EncyptedList;
