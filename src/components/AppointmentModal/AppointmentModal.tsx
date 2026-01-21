import { useEffect } from "react";
import type { Nanny } from "../../types/nanny";
import css from "./AppointmentModal.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface Props {
  nanny: Nanny;
  onClose: () => void;
}

interface FormValues {
  address: string;
  phone: string;
  childAge: string;
  date: string;
  email: string;
  parentName: string;
  comment: string;
}

// YUP VALIDATION SCHEMA
const schema = Yup.object({
  address: Yup.string().required("Address is required"),
  phone: Yup.string()
    .matches(/^\+?\d{9,15}$/, "Invalid phone number")
    .required("Phone is required"),
  childAge: Yup.string().required("Child age is required"),
  date: Yup.string().required("Date is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  parentName: Yup.string().required("Name is required"),
  comment: Yup.string().required("Comment is required"),
});

export default function AppointmentModal({ nanny, onClose }: Props) {
  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data: FormValues) => {
    console.log("APPOINTMENT DATA:", data);
    alert("Request sent successfully!");
    reset();
    onClose();
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

        <h2 className={css.title}>Make an appointment with a babysitter</h2>
        <p className={css.text}>
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>

        <div className={css.nannyShortInfo}>
          <img
            src={nanny.avatar_url}
            alt={nanny.name}
            className={css.nannyAvatar}
          />
          <div>
            <p className={css.nannyPosition}>Your nanny</p>
            <h3 className={css.nannyName}>{nanny.name}</h3>
          </div>
        </div>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.inputWrapper}>
            <div className={css.inputField}>
              <input
                className={css.input}
                type="text"
                placeholder="Address"
                {...register("address")}
              />
              {errors.address && (
                <p className={css.error}>{errors.address.message}</p>
              )}
            </div>
            <div className={css.inputField}>
              <input
                className={css.input}
                type="tel"
                placeholder="+380"
                {...register("phone")}
              />
              {errors.phone && (
                <p className={css.error}>{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div className={css.inputWrapper}>
            <div className={css.inputField}>
              <input
                className={css.input}
                type="text"
                placeholder="Child's age"
                {...register("childAge")}
              />
              {errors.childAge && (
                <p className={css.error}>{errors.childAge.message}</p>
              )}
            </div>
            <div className={css.inputField}>
              <input
                className={css.input}
                type="date"
                {...register("date")}
                placeholder="00:00"
              />
              {errors.date && (
                <p className={css.error}>{errors.date.message}</p>
              )}
            </div>
          </div>{" "}
          <div className={css.inputField}>
            <input
              className={css.input}
              type="email"
              {...register("email")}
              placeholder="Email"
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={css.inputField}>
            <input
              className={css.input}
              type="text"
              {...register("parentName")}
              placeholder="Father's or mother's name"
            />
            {errors.parentName && (
              <p className={css.error}>{errors.parentName.message}</p>
            )}
          </div>
          <div className={css.inputField}>
            <textarea
              className={css.textarea}
              {...register("comment")}
              placeholder="Comment"
            ></textarea>
            {errors.comment && (
              <p className={css.error}>{errors.comment.message}</p>
            )}
          </div>
          <button type="submit" className={css.submitBtn}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
