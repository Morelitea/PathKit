import { Field, FieldArray } from "formik";
import { PartialEntity, SpellcastingType } from "../../../api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { useState } from "react";
import { Button } from "../../buttons";
import FormButton from "../../formFields/FormButton";
import {
  defaultPreparedSpellPool,
  defaultSpontaneousSpellPool,
  defaultFocusSpellPool,
} from "../../../consts";
import SpellPoolForm from "./SpellPoolForm";
import FocusPoolForm from "./SpellPoolForm.Focus";

const EntitySpellsForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
}) => {
  const { values } = formProps;

  const preparedSpellcasters = values.build.spellCasters.filter(
    (spellcaster) => spellcaster.spellcastingType === SpellcastingType.prepared
  );

  const spontaneousSpellcasters = values.build.spellCasters.filter(
    (spellcaster) =>
      spellcaster.spellcastingType === SpellcastingType.spontaneous
  );

  return (
    <>
      <CollapsibleHeader title="Focus Spell Pools" toggle nested>
        {/* <FieldArray name="build.focus">
          {({ remove, push }) => (
            <>
              <div className={styles.formRow}>
                {values.build.focus.map((_, i) => (
                  <FocusPoolForm
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
                  onClick={() => push(defaultFocusSpellPool)}
                >
                  Add a focus spell pool
                </FormButton>
              </div>
            </>
          )}
        </FieldArray> */}
      </CollapsibleHeader>
      <CollapsibleHeader title="Prepared Spell Pools" toggle nested>
        <FieldArray name="build.spellCasters">
          {({ remove, push }) => (
            <>
              <div className={styles.formRow}>
                {preparedSpellcasters.map((_, i) => (
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
                  onClick={() => push(defaultPreparedSpellPool)}
                >
                  Add a prepared spell pool
                </FormButton>
              </div>
            </>
          )}
        </FieldArray>
      </CollapsibleHeader>
      <CollapsibleHeader title="Spontaneous Spell Pools" toggle nested>
        <FieldArray name="build.spellCasters">
          {({ remove, push }) => (
            <>
              <div className={styles.formRow}>
                {spontaneousSpellcasters.map((_, i) => (
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
                  onClick={() => push(defaultSpontaneousSpellPool)}
                >
                  Add a spontaneous spell pool
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
