import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../services/CategoryService";
import './CreateCategoryPage.css'

const initialState = {
  success: false,
  errors: {},
  formData: {
    name: "",
  },
};

const CreateCategoryPage = () => {
    const navigate = useNavigate();

    async function categoryAction(prevState, formData) {
        const category = formData.get("category");

        const errors = {};
        if (!category || category.trim() === "") {
            errors.category = "Tên thể loại không được để trống!";
        }

        if (Object.keys(errors).length > 0) {
            return {
                success: false,
                errors,
                formData: { category },
            };
        }

        try {
            await createCategory({ category });

            navigate("/dashboard/category");

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
            formData: { category },
        };
        }
    }

    const [state, submit] = useActionState(
        categoryAction,
        initialState
    );


    return (
        <div className="page-header-box container mt-4">
            <div className="page-title">
                <div className="row">
                    <div className="col-6">
                        <h4>Thêm thể loại</h4>
                    </div>
                </div>
            </div>
        <div className="card p-2">
            <div className="card-body p-2"></div>
                <form action={submit}>
                    {state.errors?.general && (
                    <div className="alert alert-danger">
                        {state.errors.general}
                    </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Tên thể loại</label>
                        <input
                            className={`form-control ${state.errors?.category ? "is-invalid" : ""}`}
                            name="category"
                            placeholder="Tên thể loại"
                            defaultValue={state.formData?.category || ""}
                        />
                        {state.errors?.category && (
                            <div className="invalid-feedback">{state.errors.category}</div>
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

export default CreateCategoryPage;
