import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../firebase";
import { useUiStore } from "../../store/uiStore";
import css from "./Register.module.css";

interface RegisterProps {
  onClose: () => void;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object({
  name: yup.string().required("Name required"),
  email: yup.string().required("Email required").email("Invalid email"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password required"),
});

export default function Register({ onClose }: RegisterProps) {
  const closeAll = useUiStore((state) => state.closeAll);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredentials.user, {
        displayName: data.name,
      });

      closeAll();
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      } else {
        alert("Unexpected error");
      }
    }
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button className={css.closeModalBtn} type="button" onClick={onClose}>
          <svg className={css.closeModalIcon} width="32" height="32">
            <use href="/sprite.svg#icon-x"></use>
          </svg>
        </button>
        <form className={css.modalForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.titleWrapper}>
            <h2 className={css.formTitle}>Registration</h2>
            <p className={css.formText}>
              Thank you for your interest in our platform! In order to register,
              we need some information. Please provide us with the following
              information.
            </p>
          </div>
          <div className={css.inputWrapper}>
            <input
              className={css.formInput}
              type="text"
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
            <input
              className={css.formInput}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
            <input
              className={css.formInput}
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}
          </div>
          <button disabled={isSubmitting} className={css.modalSubmitBtn}>
            {isSubmitting ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
