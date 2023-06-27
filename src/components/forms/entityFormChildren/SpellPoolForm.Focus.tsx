import { FieldArray } from "formik";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import FormField from "../../formFields/FormField";
import FormButton from "../../formFields/FormButton";
import styles from "../Form.module.scss";
import { defaultTrait, traitOptions } from "../../../consts";

const FocusPoolForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
  index = 0,
  onRemove,
}) => {
  const { values } = formProps;
  return (
    <>
      <CollapsibleHeader
        title={`Spell Pool ${index + 1}`}
        toggle
        onRemove={onRemove}
        as="h4"
        nested
      >
        <div className={styles.formRow}>
          <FormField label="Name" name={`build.focus.${index}.name`} />
        </div>
      </CollapsibleHeader>
    </>
  );
};

export default FocusPoolForm;
