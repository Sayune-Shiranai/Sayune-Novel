import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuthor } from "../../../services/AuthorService";
import './CreateAuthorPage.css'

const initialState = {
  success: false,
  errors: {},
  formData: {
    name: "",
  },
};

const CreateAuthorPage = () => {
    const navigate = useNavigate();

    async function authorAction(prevState, formData) {
        const name = formData.get("name");

        const errors = {};
        if (!name || name.trim() === "") {
            errors.name = "Tên tác giả không được để trống!";
        }

        if (Object.keys(errors).length > 0) {
            return {
                success: false,
                errors,
                formData: { name },
            };
        }

        try {
            await createAuthor({ name });

            navigate("/dashboard/author");

            return {
                success: true,
                errors: {},
                formData: {},
            };
        } catch (err) {
        return {
            success: false,
            errors: {
                general:
                    err?.response?.data?.message ||
                    err.message ||
                    "Không kết nối được server",
            },
            formData: { name },
        };
        }
    }

    const [state, submit] = useActionState(
        authorAction,
        initialState
    );


    return (
        <div className="page-header-box container mt-4">
            <div className="page-title">
                <div className="row">
                    <div className="col-6">
                        <h4>Thêm tác giả</h4>
                    </div>
                </div>
            </div>
        <div className="card p-2">
            <div className="card-body p-2"></div>
                <form action={submit}>
                    <div className="mb-3">
                        <label className="form-label">Tên tác giả</label>
                        <input
                            className={`form-control ${state.errors?.name ? "is-invalid" : ""}`}
                            name="name"
                            placeholder="Tên tác giả"
                            defaultValue={state.formData?.name || ""}
                        />
                        {state.errors?.name && (
                            <div className="invalid-feedback">{state.errors.name}</div>
                        )}
                    </div>

                    <button className="btn btn-primary">
                    Thêm mới
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAuthorPage;
