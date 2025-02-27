import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface UserFormProps {
  mode: "create" | "edit";
}

const UserForm: React.FC<UserFormProps> = ({ mode }) => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (mode === "edit" && userId) {
      // Aquí luego cargarás datos reales del usuario
      // Por ahora, podemos simular que "editamos" un usuario con ID = userId
      console.log("Modo edición para el usuario con ID:", userId);
    }
  }, [mode, userId]);

  // Maneja el cambio en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para validar campos
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    return newErrors;
  };

  // Maneja el submit del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Aquí luego haremos la creación o edición en la base de datos.
    // Si mode === "create", crear un usuario nuevo
    // Si mode === "edit", actualizar el usuario con ID = userId

    console.log("Formulario enviado:", formData);

    // Redirecciona a la lista de usuarios
    navigate("/users");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {mode === "create" ? "Create User" : "Edit User"}
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block font-semibold">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {mode === "create" ? "Create" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
