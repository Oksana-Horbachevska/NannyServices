import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useUiStore } from "../../store/uiStore";
import css from "./Login.module.css";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface LoginProps {
  onClose: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("Email required").email("Invalid email"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password required"),
});

export default function Login({ onClose }: LoginProps) {
  const closeAll = useUiStore((state) => state.closeAll);

  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      closeAll();
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message, {
          duration: 5000,
          style: {
            borderRadius: "12px",
            border: "1px solid #8a8a89",
            background: "#f3f3f3",
            color: "#f03f3b",
            padding: "16px",
          },
        });
      } else {
        toast.error("Unexpected error");
      }
    }
  };
  return (
    <div
      className={css.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={css.modal}>
        <button className={css.closeModalBtn} type="button" onClick={onClose}>
          <svg className={css.closeModalIcon} width="32" height="32">
            <use href="/sprite.svg#icon-x"></use>
          </svg>
        </button>
        <form className={css.modalForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.titleWrapper}>
            <h2 className={css.formTitle}>Log In</h2>
            <p className={css.formText}>
              Welcome back! Please enter your credentials to access your account
              and continue your babysitter search.
            </p>
          </div>
          <div className={css.inputWrapper}>
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
            {isSubmitting ? "Loading..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
