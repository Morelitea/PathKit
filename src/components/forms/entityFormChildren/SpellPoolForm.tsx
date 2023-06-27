import { FieldArray } from "formik";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import FormField from "../../formFields/FormField";
import FormButton from "../../formFields/FormButton";
import styles from "../Form.module.scss";
import {
  abilityOptions,
  defaultTrait,
  profLevelOptions,
  traitOptions,
  magicTraditions,
  spellcastingTypes,
  magicTraditionOptions,
} from "../../../consts";
import { MagicTradition } from "src/api/model";

const SpellPoolForm: React.FC<IEntityFormChildrenProps> = ({
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
          <FormField label="Name" name={`build.spellCasters.${index}.name`} />
        </div>
        <div className={styles.formRow}>
          <FormField label="Magic Tradition" name={`build.spellCasters.${index}.magicTradition`} as="select">
          {magicTraditionOptions.map((o) => (
                          <option key={o.tag} value={o.tag}>
                            {o.tag}
                          </option>
                        ))}
            </FormField>
        </div>
      </CollapsibleHeader>
    </>
  );
};

export default SpellPoolForm;
