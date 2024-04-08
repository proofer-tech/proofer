import { isArray } from "lodash";
import { UseFormReturnType } from "@mantine/form";

export function generateNextFormAction(
  form: UseFormReturnType<any>,
  handleSubmit: (formData: FormData) => Promise<void>,
) {
  return async (formData: FormData) => {
    if (form.isValid()) {
      for (const [k, v] of Object.entries(form.values)) {
        if (isArray(v)) v.forEach((vv) => formData.append(k, vv));
        else {
          // @ts-ignore
          formData.append(k, v);
        }
      }
      return handleSubmit(formData);
    }
    return null;
  };
}
