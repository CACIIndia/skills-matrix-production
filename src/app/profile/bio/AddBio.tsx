import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import React from "react";
import * as Yup from "yup";
type AddBioModalProps = {
  handleClose: () => void;
  isEdit: boolean;
};

const AddBio: React.FC<AddBioModalProps> = ({ handleClose, isEdit }) => {
  const formik = useFormik({
    initialValues: {
      userId: "",
      bioData: "",
    },
    validationSchema: Yup.object({
      userId: Yup.string(),
      bioData: Yup.string().required("Skill is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className='max-h-[500px] overflow-y-auto'
      >
        <div className='mt-4 grid grid-cols-1'>
          <div>
            <label className='mb-1 block text-sm font-medium'>
              About Me<span className='text-red-500'>*</span>
            </label>
            <textarea
              name='bioData'
              value={formik.values.bioData}
              onChange={formik.handleChange}
              className='w-full rounded-md border border-gray-300 p-2'
              rows={3}
            />
            {formik.touched.bioData && formik.errors.bioData ? (
              <div className='text-sm text-red-500'>
                {formik.errors.bioData}
              </div>
            ) : null}
          </div>
        </div>

        <div className='flex justify-end gap-4 bg-white p-4'>
          <button
            onClick={() => handleClose()}
            type='button'
            className='btn btn-secondary'
          >
            Close
          </button>
          <button type='submit' className='btn btn-primary'>
            {isEdit ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBio;
