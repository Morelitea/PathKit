import { Field, FieldArray } from "formik";
import { PartialEntity } from "../../../api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { useState } from "react";
import { Button } from "../../buttons";
import FormButton from "../../formFields/FormButton";
import { defaultSpellPool } from "../../../consts";
import SpellPoolForm from "./SpellPoolForm";

const EntitySpellsForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
}) => {
  const { values } = formProps;

  return (
    <>
      <CollapsibleHeader title="Spell Pools" toggle nested>
        <FieldArray name="build.spellCasters">
          {({ remove, push }) => (
            <>
              <div className={styles.formRow}>
                {values.build.spellCasters.map((_, i) => (
                  <SpellPoolForm
                    formProps={formProps}
                    index={i}
                    onRemove={() => remove(i)}
                  />
                ))}
              </div>
              <div className={styles.formRow}>
                <FormButton
                  variant="subtle"
                  icon="circle-plus"
                  onClick={() => push(defaultSpellPool)}
                >
                  Add a spell pool
                </FormButton>
              </div>
            </>
          )}
        </FieldArray>
      </CollapsibleHeader>
    </>
  );
};

export default EntitySpellsForm;
